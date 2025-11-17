import React from 'react';
import { portfolioItems } from '../data/portfolio';
import SeoHead from '../components/SeoHead';

function PortfolioCarousel({ images, title, isActive, onImageClick }) {
  const [index, setIndex] = React.useState(0);

  if (!images || images.length === 0) return null;

  const total = images.length;

  const goPrev = () => setIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setIndex((prev) => (prev + 1) % total);

  return (
    <div
      className={[
        'relative mb-4 overflow-hidden rounded-2xl border bg-raven-card/80 transition transform',
        isActive ? 'scale-105 border-raven-accent/80 shadow-soft-glow' : 'border-raven-border/70',
      ].join(' ')}
    >
      <img
        src={images[index]}
        alt={`${title} screenshot ${index + 1}`}
        className="h-56 w-full cursor-pointer object-cover sm:h-64"
        onClick={(e) => {
          e.stopPropagation();
          if (onImageClick) onImageClick(index);
        }}
      />
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-transparent bg-black/50 px-2 py-1 text-xs text-white shadow-md transition transform hover:scale-110 hover:border-raven-accent/80 hover:bg-black/70 hover:shadow-soft-glow"
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-transparent bg-black/50 px-2 py-1 text-xs text-white shadow-md transition transform hover:scale-110 hover:border-raven-accent/80 hover:bg-black/70 hover:shadow-soft-glow"
          >
            {'>'}
          </button>
        </>
      )}
      {total > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
          {images.map((image, i) => (
            <span
              key={image || i}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-raven-accent' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [hoveredSlug, setHoveredSlug] = React.useState(null);
  const [lightbox, setLightbox] = React.useState(null);
  const [query, setQuery] = React.useState('');

  const handleCardClick = (github) => {
    if (!github) return;
    if (typeof window === 'undefined') return;
    const proceed = window.confirm(
      'You are about to open the project repository on GitHub in a new tab. Continue?',
    );
    if (proceed) {
      window.open(github, '_blank', 'noopener,noreferrer');
    }
  };

  const openLightbox = (item, startIndex) => {
    if (!item || !item.screenshots || item.screenshots.length === 0) return;
    const safeIndex =
      Number.isInteger(startIndex) && startIndex >= 0 && startIndex < item.screenshots.length
        ? startIndex
        : 0;
    setLightbox({
      title: item.title,
      images: item.screenshots,
      index: safeIndex,
    });
  };

  const closeLightbox = () => setLightbox(null);

  const goLightboxPrev = () => {
    setLightbox((current) => {
      if (!current || !current.images || current.images.length === 0) return current;
      const total = current.images.length;
      return {
        ...current,
        index: (current.index - 1 + total) % total,
      };
    });
  };

  const goLightboxNext = () => {
    setLightbox((current) => {
      if (!current || !current.images || current.images.length === 0) return current;
      const total = current.images.length;
      return {
        ...current,
        index: (current.index + 1) % total,
      };
    });
  };

  const normalizedQuery = query.trim().toLowerCase();
  const visibleItems = React.useMemo(() => {
    if (!normalizedQuery) return portfolioItems;
    return portfolioItems.filter((item) => {
      const fields = [
        item.title,
        item.description,
        ...(item.tech || []),
        ...(item.outcomes || []),
      ];
      return fields.some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(normalizedQuery),
      );
    });
  }, [normalizedQuery]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:px-6">
      <SeoHead
        title="Portfolio | DevOps case studies | Raven Development Operations"
        description="Examples of CI/CD pipelines, containerization, and cloud deployments delivered for product teams."
        path="/portfolio"
      />
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">Portfolio</p>
        <h1 className="text-4xl font-bold text-white">Case studies from shipped systems</h1>
        <p className="text-lg text-slate-300">
          Engineering work focused on automation, infrastructure, and reliability - not just the UI.
        </p>
      </header>
      <div className="flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search portfolio by tag, tech, or keyword..."
          className="w-full max-w-md rounded-full border border-raven-border/70 bg-raven-surface/70 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-raven-accent focus:outline-none"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visibleItems.map((item) => {
          const isActive = hoveredSlug === item.slug;

          return (
            <article
              key={item.slug}
              id={item.slug}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(item.github)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item.github);
                }
              }}
              onMouseEnter={() => setHoveredSlug(item.slug)}
              onMouseLeave={() => {
                setHoveredSlug(null);
              }}
              className={[
                'flex h-full cursor-pointer flex-col gap-4 rounded-2xl border p-6 transition transform',
                isActive
                  ? 'scale-105 border-raven-accent/80 bg-raven-card shadow-soft-glow'
                  : 'border-raven-border/70 bg-raven-card/70',
              ].join(' ')}
            >
              <PortfolioCarousel
                images={item.screenshots}
                title={item.title}
                isActive={isActive}
                onImageClick={(startIndex) => openLightbox(item, startIndex)}
              />
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="text-sm text-slate-300">{item.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-raven-accent/60 bg-raven-accent/10 px-3 py-1 font-medium text-raven-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">DevOps outcomes</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-300">
                  {item.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-raven-accent" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      {lightbox && lightbox.images && lightbox.images.length > 0 && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white hover:bg-black/80"
            >
              ✕
            </button>
            <div className="relative overflow-hidden rounded-2xl border border-raven-border/70 bg-black/80">
              <img
                src={lightbox.images[lightbox.index]}
                alt={`${lightbox.title} screenshot ${lightbox.index + 1}`}
                className="max-h-[80vh] w-full object-contain"
              />
              {lightbox.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goLightboxPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goLightboxNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            <div className="mt-3 text-center text-xs text-slate-200">
              {lightbox.title} · {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
