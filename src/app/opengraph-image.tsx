import { ImageResponse } from 'next/og';
export const alt = 'Irigenera Alliance — Data, Research & Engineering';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#0b1220',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '80px',
        color: '#f0f4f8',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 35, color: '#37d4bd' }}>
        IA · IRIGENERA ALLIANCE
      </div>
      <div
        style={{
          fontSize: 75,
          marginTop: 70,
          lineHeight: 1.1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span>Turning complexity</span>
        <span>into meaningful impact.</span>
      </div>
      <div style={{ fontSize: 25, color: '#a1adbd', marginTop: 45 }}>
        Data science · Research · Software engineering
      </div>
    </div>,
    size,
  );
}
