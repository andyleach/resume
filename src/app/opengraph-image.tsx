import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Andrew Leach — Lead Software Engineer';

export default async function OG() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px',
        background: '#0a0a0a',
        color: '#f5f5f0',
        fontFamily: 'serif',
      }}
    >
      <div style={{ fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: '#8a8a88' }}>
        leachcreative.com
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 140, lineHeight: 1, letterSpacing: '-0.03em' }}>Andrew Leach.</div>
        <div style={{ marginTop: 24, fontSize: 28, color: '#8a8a88' }}>
          Lead Software Engineer · Charlotte, NC
        </div>
      </div>
    </div>,
    { ...size },
  );
}
