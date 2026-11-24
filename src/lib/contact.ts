import { z } from 'zod';
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  organization: z.string().trim().max(150).optional().default(''),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(0).optional().default(''),
});
