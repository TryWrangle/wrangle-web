const APP_STORE_URL = 'https://apps.apple.com/app/wrangle/id000000000';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.wrangle.mobile';

type Props = { guideId?: string };

export default function AppDownloadCTA({ guideId }: Props) {
  function handleOpenInApp() {
    if (guideId) {
      window.location.href = `wrangle://guide/${guideId}`;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', padding: '24px 16px' }}>
      {guideId && (
        <button
          onClick={handleOpenInApp}
          style={{
            width: '100%', maxWidth: 360, padding: '14px 24px',
            background: '#E8765C', color: '#fff', border: 'none',
            borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Open in Wrangle
        </button>
      )}
      <p style={{ color: '#8899aa', fontSize: 14, marginBottom: 4 }}>
        {guideId ? "Don't have the app?" : 'Get Wrangle to see this guide'}
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <a href={APP_STORE_URL} target="_blank" rel="noreferrer"
          style={{ padding: '10px 20px', background: '#1a2a3a', borderRadius: 10, color: '#fff', textDecoration: 'none', fontSize: 14 }}>
          App Store
        </a>
        <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer"
          style={{ padding: '10px 20px', background: '#1a2a3a', borderRadius: 10, color: '#fff', textDecoration: 'none', fontSize: 14 }}>
          Google Play
        </a>
      </div>
    </div>
  );
}
