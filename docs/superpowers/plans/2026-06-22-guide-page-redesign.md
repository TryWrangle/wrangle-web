# Guide Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign GuidePage and AppDownloadCTA to feel premium and editorial — full-bleed hero, title/author overlaid on image, 2-column photo grid, polished sticky CTA.

**Architecture:** Pure inline-style changes to two existing React components. No new files, no new dependencies. Visual layout driven by CSS-in-JS (React style props) only.

**Tech Stack:** React 19, TypeScript, Vite, inline styles

## Global Constraints

- No new npm dependencies
- Inline styles only (no CSS files or CSS modules — matches existing codebase convention)
- Dark theme (#0d1b2a base) preserved
- Wrangle coral brand color: #E8765C
- maxWidth 480px container preserved

---

### Task 1: Redesign GuidePage hero + photo grid

**Files:**
- Modify: `src/GuidePage.tsx`

**Goal:** Replace flat layout with full-bleed hero (cover image + gradient overlay + title/author overlaid), then 2-column photo grid below.

- [ ] **Step 1: Replace the GuidePage `found` render block**

Replace the entire return block for the `found` state with:

```tsx
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
          <span style={{ fontSize: 20, fontWeight: 800, color: '#E8765C', letterSpacing: '-0.02em' }}>Wrangle</span>
        </div>
        {/* Title + author overlaid at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 20px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {guide.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {guide.author.avatarUrl && (
              <img
                src={guide.author.avatarUrl}
                alt={guide.author.name ?? ''}
                style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)' }}
              />
            )}
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500 }}>
              {guide.author.name ?? guide.author.handle ?? 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    ) : (
      /* Fallback header when no cover image */
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
          {guide.author.avatarUrl && (
            <img src={guide.author.avatarUrl} alt={guide.author.name ?? ''}
              style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
          )}
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

    {/* Spacer so content doesn't hide under sticky CTA */}
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
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /Users/bhimesh/work/wrangle-web && npx tsc --noEmit`
Expected: no errors

---

### Task 2: Redesign AppDownloadCTA

**Files:**
- Modify: `src/AppDownloadCTA.tsx`

**Goal:** Polish the sticky CTA — gradient button with shadow, subtler store badges, better spacing and typography.

- [ ] **Step 1: Replace AppDownloadCTA render**

Replace the entire return block with:

```tsx
return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', padding: '16px 16px 28px' }}>
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
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, color: '#fff', textDecoration: 'none',
          fontSize: 14, fontWeight: 500,
        }}
      >
        App Store
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noreferrer"
        style={{
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, color: '#fff', textDecoration: 'none',
          fontSize: 14, fontWeight: 500,
        }}
      >
        Google Play
      </a>
    </div>
  </div>
);
```

- [ ] **Step 2: Verify compiles and start dev server**

Run: `cd /Users/bhimesh/work/wrangle-web && npx tsc --noEmit && npm run dev`
Expected: dev server starts on localhost:5173 with no TypeScript errors
