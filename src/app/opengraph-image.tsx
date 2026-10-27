import { ImageResponse } from 'next/og';

export const alt = 'credVert. — The right credit card for every swipe';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#09090C',
          backgroundImage: 'radial-gradient(circle at 75% 35%, rgba(212,168,83,0.3), rgba(9,9,12,0) 60%)',
          color: '#F7F5F0',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 36, fontWeight: 700 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(180deg, #FDE38A, #D4A853)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#09090C',
              fontSize: 34,
            }}
          >
            c
          </div>
          credVert.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02 }}>The right card.</div>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, color: '#F2D594' }}>
            Every single swipe.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: '#A1A4B0', maxWidth: 900 }}>
            Credit card rewards advisor for India — dining, travel, fuel, UPI and forex. Private, on-device.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 22, color: '#D4A853' }}>
          {['Free on Android & iOS', 'DPDP Act 2023', 'credvert.tech'].map((t) => (
            <div key={t} style={{ padding: '10px 20px', borderRadius: 999, border: '1px solid rgba(212,168,83,0.4)' }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
