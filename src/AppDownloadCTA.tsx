// TODO: replace with real Apple ID from App Store Connect → App Information → Apple ID
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 16px 28px' }}>
      {guideId && (
        <button
          onClick={handleOpenInApp}
          style={{
            width: '100%', maxWidth: 360, padding: '15px 24px',
            background: 'linear-gradient(135deg, #E8765C 0%, #d45f47 100%)',
            color: '#fff', border: 'none', borderRadius: 14,
            fontSize: 16, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(232,118,92,0.45)',
            letterSpacing: '-0.01em',
          }}
        >
          Open in Wrangle
        </button>
      )}
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: '12px 0 10px', textAlign: 'center' }}>
        {guideId ? "Don't have the app?" : 'Get Wrangle to see this guide'}
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, color: '#fff', textDecoration: 'none',
            fontSize: 14, fontWeight: 500,
          }}
        >
          <svg width="13" height="16" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.2-61.5-155.2-127.6C46.7 790.6 0 663.1 0 541.8c0-207.8 134.9-317.6 267.1-317.6 70.7 0 129.5 46.4 173.9 46.4 42.8 0 109.7-50.7 192.6-50.7 30.9 0 108.2 2.6 158.3 101.6zm-180.2-109.7c17.9-12.9 47.5-56.9 47.5-97.6 0-5.1-.6-10.3-1.3-14.8-44.3 1.9-96.8 29.8-128.6 57.8-16.6 14.2-48.5 58.5-48.5 99.9 0 5.8.6 11.6 1.3 13.5 2.6.6 6.4 1.3 10.3 1.3 39.5 0 88.6-26.5 119.3-60.1z" />
          </svg>
          App Store
        </a>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, color: '#fff', textDecoration: 'none',
            fontSize: 14, fontWeight: 500,
          }}
        >
          <svg width="13" height="14" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
            <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l2.7 1.5 247.2-247v-5.8L47 0zm425.7 230.6l-72.1-41.6-75.8 75.8 75.8 75.8 72.1-41.6c20.6-11.8 20.6-31 0-42.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
          </svg>
          Google Play
        </a>
      </div>
    </div>
  );
}
