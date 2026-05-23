/// <reference types="vite/client" />

const API_URL = import.meta.env.VITE_API_URL as string;

export type GuideSharePreview = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  photos: { url: string }[];
  author: { id: string; name: string | null; handle: string | null; avatarUrl: string | null };
};

export type PrivateGuidePreview = {
  type: 'private_guide';
  author: { id: string; name: string | null; handle: string | null; avatarUrl: string | null };
};

export type GuideBySlugResult =
  | { kind: 'found'; guide: GuideSharePreview }
  | { kind: 'private'; author: PrivateGuidePreview['author'] }
  | { kind: 'not_found' };

export async function fetchGuideBySlug(slug: string): Promise<GuideBySlugResult> {
  try {
    const res = await fetch(`${API_URL}/v1/guides/by-slug/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const guide = (await res.json()) as GuideSharePreview;
      return { kind: 'found', guide };
    }
    if (res.status === 403) {
      const data = (await res.json()) as PrivateGuidePreview;
      return { kind: 'private', author: data.author };
    }
    return { kind: 'not_found' };
  } catch {
    return { kind: 'not_found' };
  }
}
