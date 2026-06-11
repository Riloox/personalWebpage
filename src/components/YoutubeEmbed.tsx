import { useState } from 'react';

interface YoutubeEmbedProps {
  url: string;
  title: string;
}

const extractVideoId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null;
    if (u.hostname.endsWith('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      const parts = u.pathname.split('/').filter(Boolean);
      if (parts[0] === 'embed' || parts[0] === 'shorts') return parts[1] ?? null;
    }
    return null;
  } catch {
    return null;
  }
};

const YoutubeEmbed = ({ url, title }: YoutubeEmbedProps) => {
  const [loaded, setLoaded] = useState(false);
  const id = extractVideoId(url);

  if (!id) return null;

  if (loaded) {
    return (
      <div className="yt-embed yt-embed-loaded">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="yt-embed yt-embed-placeholder"
      onClick={() => setLoaded(true)}
      aria-label={`Play video: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className="yt-play" aria-hidden="true">
        {'\u25B6'}
      </span>
    </button>
  );
};

export default YoutubeEmbed;
