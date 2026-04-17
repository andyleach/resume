import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        fontSize: 22,
        fontWeight: 900,
        fontStyle: 'italic',
        letterSpacing: '-0.07em',
      }}
    >
      <span style={{ color: '#f5f5f0' }}>A</span>
      <span style={{ color: '#10B981' }}>L</span>
    </div>,
    { ...size },
  );
}
