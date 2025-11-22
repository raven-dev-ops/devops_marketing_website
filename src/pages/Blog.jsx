import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SeoHead from '../components/SeoHead';
import service1Banner from '../assets/service1_banner.png';
import { SearchContext } from '../hooks/SearchContext';

export default function Blog() {
  const { query } = useContext(SearchContext);
  const tagStyleMap = {
    'CI/CD': 'border-emerald-400/70 bg-emerald-500/15 text-emerald-200',
    Cloud: 'border-sky-400/70 bg-sky-500/15 text-sky-200',
    SRE: 'border-amber-400/70 bg-amber-500/15 text-amber-100',
    Tooling: 'border-indigo-300/80 bg-indigo-500/15 text-indigo-100',
    Frontend: 'border-pink-400/70 bg-pink-500/15 text-pink-100',
    DX: 'border-cyan-300/80 bg-cyan-500/15 text-cyan-100',
    Backend: 'border-orange-300/80 bg-orange-500/15 text-orange-100',
    Reliability: 'border-lime-300/80 bg-lime-500/15 text-lime-100',
    Auth: 'border-rose-300/80 bg-rose-500/15 text-rose-100',
    Bots: 'border-amber-300/70 bg-amber-500/15 text-amber-50',
    OCR: 'border-fuchsia-300/80 bg-fuchsia-500/15 text-fuchsia-100',
    UI: 'border-sky-300/70 bg-sky-500/15 text-sky-100',
    Marketing: 'border-green-300/70 bg-green-500/15 text-green-100',
    APIs: 'border-teal-300/80 bg-teal-500/15 text-teal-100',
    Telemetry: 'border-purple-300/80 bg-purple-500/15 text-purple-100',
    Data: 'border-blue-300/70 bg-blue-500/15 text-blue-100',
    'Local SEO': 'border-yellow-300/80 bg-yellow-500/15 text-yellow-100',
  };

  const filtered = useMemo(() => {
    const posts = blogPosts;
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return posts;

    return posts.filter((post) => {
      const haystack = [
        post.title,
        post.excerpt,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(trimmed);
    });
  }, [query]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:px-6">
      <SeoHead
        title="Blog | CI/CD, cloud, SRE insights | Raven Development Operations"
        description="Articles on DevOps delivery, GitHub Actions pipelines, observability, and developer tooling."
        path="/blog"
      />
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-raven-cyan">Blog</p>
        <h1 className="text-4xl font-bold text-white">Shipping notes from the DevOps desk</h1>
        <p className="text-lg text-slate-300">CI/CD, cloud, SRE, and tooling practices you can apply right away.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => {
          const baseCardClass =
            'flex h-full flex-col gap-4 rounded-2xl border border-raven-border/70 bg-raven-card/70 p-6 transition transform hover:scale-105 hover:border-raven-accent/80 hover:bg-raven-card hover:shadow-soft-glow';

          return (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <article className={baseCardClass}>
                {post.image ? (
                  <div className="overflow-hidden rounded-xl border border-raven-border/60 bg-raven-card/80">
                    <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-raven-border/60 bg-gradient-to-br from-raven-card/80 via-raven-card to-black/40 text-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-raven-cyan">Preview coming soon</p>
                      <p className="mt-2 text-sm font-semibold text-white">{post.title}</p>
                    </div>
                  </div>
                )}
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <span className="text-xs uppercase tracking-[0.2em] text-raven-cyan">
                  {post.date}{post.readMinutes ? ` · ${post.readMinutes} min read` : ''}
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {post.tags.map((tag) => {
                    const tagClasses = `rounded-full border px-2 py-1 shadow-inner shadow-black/10 ${
                      tagStyleMap[tag] || 'border-raven-border/60 bg-raven-surface/60 text-slate-200'
                    }`;

                    return (
                      <span key={tag} className={tagClasses}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
                {Array.isArray(post.bullets) && post.bullets.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-slate-300 list-disc list-inside">
                    {post.bullets.slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            </Link>
          );
        })}
      </div>

      <section className="rounded-2xl border border-raven-border/70 bg-raven-card/60 p-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:gap-8">
          <div className="flex items-center gap-3 md:items-start">
            <div className="flex-shrink-0 rounded-xl border border-raven-border/60 bg-raven-surface/50 p-2 shadow-inner shadow-black/30">
              <img
                src={service1Banner}
                alt="Raven Development Operations"
                className="h-14 w-16 object-contain sm:h-20 sm:w-24"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white">Join my newsletter</h3>
              <p className="mt-2 text-sm text-slate-300">
                Get updates on CI/CD, cloud automation, and DevOps maturity guides.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <input
              type="email"
              placeholder="Email address (coming soon)"
              disabled
              className="w-full cursor-not-allowed rounded-full border border-raven-border/40 bg-raven-surface/40 px-4 py-3 text-sm text-slate-400 placeholder:text-slate-500 md:w-64"
            />
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-slate-600/40 px-6 py-3 text-sm font-semibold text-slate-300 shadow-inner shadow-black/30"
            >
              Get updates
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
