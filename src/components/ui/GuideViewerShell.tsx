import GuideViewer from './GuideViewer';

// Reads the slug from the actual URL at runtime — works for any /g/* path
// even when GitHub Pages serves a single static shell file.
export default function GuideViewerShell() {
  const match = typeof window !== 'undefined'
    ? window.location.pathname.match(/\/g\/([^/?#]+)/)
    : null;
  const slug = match ? decodeURIComponent(match[1]) : '';

  if (!slug) {
    return (
      <div style={{ minHeight: '100vh', background: '#0E1B42', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, fontFamily: 'Manrope, sans-serif', color: 'white' }}>
        <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 20, margin: 0 }}>Guide not found</p>
        <a href="/" style={{ color: '#FF7A59', fontSize: 14 }}>← Back to Wrangle</a>
      </div>
    );
  }

  return <GuideViewer slug={slug} />;
}
