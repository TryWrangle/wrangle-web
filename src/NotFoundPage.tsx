import AppDownloadCTA from './AppDownloadCTA';

export default function NotFoundPage() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Guide not found</h2>
      <p style={{ color: '#8899aa', fontSize: 15, lineHeight: 1.5, marginBottom: 32 }}>
        This guide may have been removed or made private.
      </p>
      <AppDownloadCTA />
    </div>
  );
}
