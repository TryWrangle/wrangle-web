import GuidePage from './GuidePage';
import NotFoundPage from './NotFoundPage';

export default function App() {
  const match = window.location.pathname.match(/\/g\/([^/?#]+)/);
  const slug = match?.[1] ?? null;

  if (!slug) return <NotFoundPage />;
  return <GuidePage slug={slug} />;
}
