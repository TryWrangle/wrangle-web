import AppDownloadCTA from './AppDownloadCTA';
import type { GuideSharePreview } from './api';

type Author = GuideSharePreview['author'];
type Props = { author: Author };

export default function PrivateGuidePage({ author }: Props) {
  const displayName = author.name ?? author.handle ?? 'This user';

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      {author.avatarUrl && (
        <img src={author.avatarUrl} alt={displayName}
          style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
      )}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{displayName}'s guide is private</h2>
      <p style={{ color: '#8899aa', fontSize: 15, lineHeight: 1.5, marginBottom: 32 }}>
        Add {displayName} as a friend on Wrangle to see their guides.
      </p>
      <AppDownloadCTA />
    </div>
  );
}
