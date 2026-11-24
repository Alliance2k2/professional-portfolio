import { contactSchema } from '@/lib/contact';
import { profile } from '@/lib/content';
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const url = new URL(request.url);
  const expectedOrigin =
    process.env.SITE_URL ||
    `${url.protocol}//${request.headers.get('host') || url.host}`;
  if (origin !== expectedOrigin)
    return Response.json(
      { message: 'This request origin is not allowed.' },
      { status: 403 },
    );
  if (!request.headers.get('content-type')?.includes('application/json'))
    return Response.json(
      { message: 'JSON content is required.' },
      { status: 415 },
    );
  const maxBodyBytes = 16000;
  if (Number(request.headers.get('content-length')) > maxBodyBytes)
    return Response.json({ message: 'Message is too large.' }, { status: 413 });
  const reader = request.body?.getReader();
  if (!reader)
    return Response.json(
      { message: 'A message body is required.' },
      { status: 400 },
    );
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > maxBodyBytes) {
      await reader.cancel();
      return Response.json(
        { message: 'Message is too large.' },
        { status: 413 },
      );
    }
    chunks.push(value);
  }
  const bodyBytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bodyBytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const raw = new TextDecoder().decode(bodyBytes);
  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return Response.json(
      { message: 'Invalid message format.' },
      { status: 400 },
    );
  }
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success)
    return Response.json(
      {
        message:
          'Please check the fields. Messages must contain at least 20 characters.',
      },
      { status: 400 },
    );
  const apiKey = process.env.RESEND_API_KEY,
    from = process.env.CONTACT_FROM;
  // Delivery stays off unless deployment-wide rate limiting has been explicitly enabled.
  if (!apiKey || !from || process.env.CONTACT_RATE_LIMIT_ENABLED !== 'true')
    return Response.json(
      {
        message: `Message delivery is not configured. Please email ${profile.email} directly. Your message was not sent.`,
      },
      { status: 503 },
    );
  const data = parsed.data;
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [profile.email],
        reply_to: data.email,
        subject: `Portfolio: ${data.subject}`,
        text: `From: ${data.name}\nEmail: ${data.email}\nOrganization: ${data.organization}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Delivery rejected');
    const result = await response.json();
    if (typeof result.id !== 'string')
      throw new Error('No delivery acknowledgement');
    return Response.json({
      message:
        'Your message was accepted by the email provider. Thank you for reaching out.',
    });
  } catch {
    return Response.json(
      {
        message: `Message delivery failed. Please email ${profile.email} directly.`,
      },
      { status: 502 },
    );
  }
}
