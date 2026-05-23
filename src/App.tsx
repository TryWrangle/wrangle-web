export default function App() {
  const match = window.location.pathname.match(/\/g\/([^/?#]+)/);
  const slug = match?.[1] ?? null;

  if (!slug) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p style={{ color: '#8899aa' }}>Guide not found.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p style={{ color: '#8899aa' }}>Loading guide: {slug}</p>
    </div>
  );
}
