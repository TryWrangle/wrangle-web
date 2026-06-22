import { useEffect, useState } from 'react';
import { fetchGuideBySlug, type GuideSharePreview } from './api';
import AppDownloadCTA from './AppDownloadCTA';
import PrivateGuidePage from './PrivateGuidePage';
import NotFoundPage from './NotFoundPage';

type Author = GuideSharePreview['author'];

function AuthorAvatar({ author, size = 28 }: { author: Author; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initials = (author.name ?? author.handle ?? '?').charAt(0).toUpperCase();
  if (author.avatarUrl && !failed) {
    return (
      <img
        src={author.avatarUrl}
        alt={author.name ?? ''}
        onError={() => setFailed(true)}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)', flexShrink: 0 }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: '#E8765C', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.45, fontWeight: 700, color: '#fff', border: '2px solid rgba(255,255,255,0.4)',
    }}>
      {initials}
    </div>
  );
}

type State =
  | { status: 'loading' }
  | { status: 'found'; guide: GuideSharePreview }
  | { status: 'private'; author: Author }
  | { status: 'not_found' }
  | { status: 'error' };

export default function GuidePage({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    fetchGuideBySlug(slug).then((result) => {
      if (result.kind === 'found') setState({ status: 'found', guide: result.guide });
      else if (result.kind === 'private') setState({ status: 'private', author: result.author });
      else if (result.kind === 'not_found') setState({ status: 'not_found' });
      else setState({ status: 'error' });
    });
  }, [slug]);

  if (state.status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p style={{ color: '#8899aa' }}>Loading…</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 8 }}>
        <p style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Something went wrong</p>
        <p style={{ color: '#8899aa', fontSize: 14 }}>Unable to load this guide. Try again later.</p>
      </div>
    );
  }
  if (state.status === 'private') return <PrivateGuidePage author={state.author} />;
  if (state.status === 'not_found') return <NotFoundPage />;

  const { guide } = state;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0d1b2a' }}>
      {/* Full-bleed hero */}
      {guide.coverImageUrl ? (
        <div style={{ position: 'relative', width: '100%', height: '55vh', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={guide.coverImageUrl}
            alt={guide.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.92) 100%)',
          }} />
          {/* Wrangle badge */}
          <div style={{ position: 'absolute', top: 16, left: 16 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>Wrangle</span>
          </div>
          {/* Title + author overlaid at bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 20px' }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {guide.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AuthorAvatar author={guide.author} size={28} />
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500 }}>
                {guide.author.name ?? guide.author.handle ?? 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#E8765C', letterSpacing: '-0.02em' }}>Wrangle</span>
        </div>
      )}

      {/* Description */}
      {guide.description && (
        <div style={{ padding: '16px 16px 0' }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            {guide.description}
          </p>
        </div>
      )}

      {/* No-cover-image title block */}
      {!guide.coverImageUrl && (
        <div style={{ padding: '12px 16px 0' }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            {guide.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AuthorAvatar author={guide.author} size={28} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
              {guide.author.name ?? guide.author.handle ?? 'Unknown'}
            </span>
          </div>
        </div>
      )}

      {/* 2-column photo grid */}
      {guide.photos.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 3,
          padding: '12px 0 0',
        }}>
          {guide.photos.map((photo, i) => (
            <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
              <img
                src={photo.url}
                alt={`Photo ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 120 }} />

      {/* Sticky CTA */}
      <div style={{
        position: 'sticky', bottom: 0,
        background: 'linear-gradient(to top, #0a1520 0%, #0d1b2a 100%)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <AppDownloadCTA guideId={guide.id} />
      </div>
    </div>
  );
}
