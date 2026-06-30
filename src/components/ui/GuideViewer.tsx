import { useEffect, useState } from 'react';

const API_URL = import.meta.env.PUBLIC_API_URL as string | undefined;

type Author = { id: string; name: string | null; handle: string | null; avatarUrl: string | null };

type Guide = {
  id: string; slug: string; title: string; description: string | null;
  coverImageUrl: string | null; photos: { url: string }[];
  author: Author;
};

type Result =
  | { kind: 'loading' }
  | { kind: 'found'; guide: Guide }
  | { kind: 'private'; author: Author }
  | { kind: 'not_found' }
  | { kind: 'error' };

function Avatar({ author, size = 28 }: { author: Author; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initials = (author.name ?? author.handle ?? '?').charAt(0).toUpperCase();
  if (author.avatarUrl && !failed) {
    return (
      <img src={author.avatarUrl} alt={author.name ?? ''} onError={() => setFailed(true)}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)', flexShrink: 0 }} />
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, background: '#E8765C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.45, fontWeight: 700, color: '#fff', border: '2px solid rgba(255,255,255,0.4)' }}>
      {initials}
    </div>
  );
}

function AppBadges() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', marginTop: 24 }}>
      <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: 'rgba(176,196,222,0.7)', margin: 0 }}>Get Wrangle to see this guide</p>
      <div style={{ display: 'flex', gap: 10 }}>
        {[{ icon: '', label: 'App Store' }, { icon: '▶', label: 'Google Play' }].map(b => (
          <button key={b.label} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', borderRadius: 10, padding: '10px 18px', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>{b.icon}</span>{b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GuideViewer({ slug }: { slug: string }) {
  const [result, setResult] = useState<Result>({ kind: 'loading' });

  useEffect(() => {
    if (!API_URL) { setResult({ kind: 'error' }); return; }
    fetch(`${API_URL}/v1/guides/by-slug/${encodeURIComponent(slug)}`)
      .then(async res => {
        if (res.ok) {
          const guide = await res.json() as Guide;
          setResult({ kind: 'found', guide });
        } else if (res.status === 403) {
          const data = await res.json();
          setResult({ kind: 'private', author: data.author });
        } else if (res.status === 404) {
          setResult({ kind: 'not_found' });
        } else {
          setResult({ kind: 'error' });
        }
      })
      .catch(() => setResult({ kind: 'error' }));
  }, [slug]);

  const base: React.CSSProperties = {
    minHeight: '100vh', background: '#0E1B42',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', padding: '40px 24px', textAlign: 'center',
    fontFamily: 'Manrope, sans-serif',
  };

  if (result.kind === 'loading') {
    return (
      <div style={base}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#FF7A59', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (result.kind === 'not_found' || result.kind === 'error') {
    return (
      <div style={base}>
        <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 20, color: 'white', margin: '0 0 8px' }}>Guide not found</p>
        <p style={{ fontSize: 14, color: 'rgba(176,196,222,0.7)', margin: '0 0 24px' }}>This guide may have been removed or made private.</p>
        <AppBadges />
      </div>
    );
  }

  if (result.kind === 'private') {
    return (
      <div style={base}>
        <Avatar author={result.author} size={60} />
        <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 18, color: 'white', margin: '16px 0 8px' }}>
          {result.author.name ?? result.author.handle ?? 'This traveler'}'s guide is private
        </p>
        <p style={{ fontSize: 14, color: 'rgba(176,196,222,0.7)', margin: '0 0 24px' }}>Ask them to share it with you directly.</p>
        <AppBadges />
      </div>
    );
  }

  const { guide } = result;
  return (
    <div style={{ minHeight: '100vh', background: '#0E1B42', color: 'white' }}>
      {/* Cover */}
      {guide.coverImageUrl && (
        <div style={{ height: 320, overflow: 'hidden', position: 'relative' }}>
          <img src={guide.coverImageUrl} alt={guide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,27,66,0.9) 0%, transparent 60%)' }} />
        </div>
      )}

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <Avatar author={guide.author} size={32} />
          <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: 'rgba(176,196,222,0.8)' }}>
            by {guide.author.name ?? guide.author.handle ?? 'Wrangle Traveler'}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 'clamp(28px,5vw,40px)', color: 'white', lineHeight: 1.2, letterSpacing: '-0.03em', margin: '0 0 12px' }}>
          {guide.title}
        </h1>
        {guide.description && (
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, color: 'rgba(176,196,222,0.8)', lineHeight: 1.7, margin: '0 0 32px' }}>
            {guide.description}
          </p>
        )}

        {/* Photo grid */}
        {guide.photos.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 40 }}>
            {guide.photos.slice(0, 8).map((p, i) => (
              <img key={i} src={p.url} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 10, background: 'rgba(45,74,140,0.4)' }} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ background: 'rgba(255,122,89,0.1)', border: '1px solid rgba(255,122,89,0.2)', borderRadius: 16, padding: 24, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>
            Make your own travel guides with Wrangle
          </p>
          <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: 'rgba(176,196,222,0.7)', margin: '0 0 20px' }}>
            Turn your camera roll into shareable guides in minutes.
          </p>
          <a href="/" style={{ display: 'inline-block', background: '#FF7A59', color: 'white', fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 14, padding: '12px 24px', borderRadius: 10, textDecoration: 'none' }}>
            Join the waitlist →
          </a>
        </div>
      </div>
    </div>
  );
}
