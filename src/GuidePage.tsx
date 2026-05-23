import { useEffect, useState } from 'react';
import { fetchGuideBySlug, type GuideSharePreview } from './api';
import AppDownloadCTA from './AppDownloadCTA';
import PrivateGuidePage from './PrivateGuidePage';
import NotFoundPage from './NotFoundPage';

type Author = GuideSharePreview['author'];

type State =
  | { status: 'loading' }
  | { status: 'found'; guide: GuideSharePreview }
  | { status: 'private'; author: Author }
  | { status: 'not_found' };

export default function GuidePage({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    fetchGuideBySlug(slug).then((result) => {
      if (result.kind === 'found') setState({ status: 'found', guide: result.guide });
      else if (result.kind === 'private') setState({ status: 'private', author: result.author });
      else setState({ status: 'not_found' });
    });
  }, [slug]);

  if (state.status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p style={{ color: '#8899aa' }}>Loading…</p>
      </div>
    );
  }

  if (state.status === 'private') return <PrivateGuidePage author={state.author} />;
  if (state.status === 'not_found') return <NotFoundPage />;

  const { guide } = state;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#E8765C' }}>Wrangle</span>
      </div>

      {guide.coverImageUrl && (
        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <img src={guide.coverImageUrl} alt={guide.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div style={{ padding: '16px 16px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{guide.title}</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          {guide.author.avatarUrl && (
            <img src={guide.author.avatarUrl} alt={guide.author.name ?? ''}
              style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
          )}
          <span style={{ color: '#8899aa', fontSize: 14 }}>
            {guide.author.name ?? guide.author.handle ?? 'Unknown'}
          </span>
        </div>

        {guide.description && (
          <p style={{ color: '#ccd6e0', fontSize: 15, lineHeight: 1.5, marginBottom: 16 }}>
            {guide.description}
          </p>
        )}
      </div>

      {guide.photos.length > 0 && (
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {guide.photos.map((photo, i) => (
            <div key={i} style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 12 }}>
              <img src={photo.url} alt={`Photo ${i + 2}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}

      <div style={{
        position: 'sticky', bottom: 0, background: '#0d1b2a',
        borderTop: '1px solid #1e2f3f', marginTop: 'auto',
      }}>
        <AppDownloadCTA guideId={guide.id} />
      </div>
    </div>
  );
}
