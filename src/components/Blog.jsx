import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Clock, X, ArrowLeft } from '@phosphor-icons/react';

import { POSTS } from '../data/posts';


function BlogModal({ post, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(16px)',
        overflowY: 'auto',
        padding: '2rem 1rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-strong)',
          borderRadius: '18px',
          maxWidth: '720px',
          width: '100%',
          padding: '2.25rem',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        }}
      >
        {/* Back / close */}
        <button
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-secondary)', fontSize: '0.82rem',
            fontFamily: 'var(--font-sans)', marginBottom: '1.75rem',
            padding: 0,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={15} /> Back to blog
        </button>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            background: `${post.tagColor}15`,
            color: post.tagColor,
            border: `1px solid ${post.tagColor}30`,
          }}>
            {post.tag}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {post.date}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Clock size={10} /> {post.readTime} read
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          {post.title}
        </h1>

        {/* Rendered content */}
        <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{
            __html: (() => {
              let inCodeBlock = false;
              return post.content
                .trim()
                .split('\n')
                .map(line => {
                  const trimmed = line.trim();
                  
                  if (inCodeBlock && trimmed === '```') {
                    inCodeBlock = false;
                    return '</code></pre></div>';
                  }

                  if (!inCodeBlock && trimmed.startsWith('```')) {
                    inCodeBlock = true;
                    const lang = trimmed.slice(3).trim();
                    return `
                      <div style="margin: 1.5rem 0; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: #0d0d12; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
                        <div style="display: flex; align-items: center; padding: 0.6rem 1rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05);">
                          <div style="display: flex; gap: 6px; margin-right: 1rem;">
                            <div style="width: 10px; height: 10px; border-radius: 50%; background: #ff5f56;"></div>
                            <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffbd2e;"></div>
                            <div style="width: 10px; height: 10px; border-radius: 50%; background: #27c93f;"></div>
                          </div>
                          ${lang ? `<div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">${lang}</div>` : ''}
                        </div>
                        <pre style="padding: 1.25rem; overflow-x: auto; font-family: var(--font-mono); font-size: 0.85rem; color: #e2e8f0; line-height: 1.5; margin: 0;"><code>`;
                  }
                  
                  if (inCodeBlock) {
                    return line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n';
                  }

                  if (line.startsWith('## ')) {
                    return `<h2 style="font-size:1.35rem;font-weight:700;color:var(--text-primary);margin-top:2.5rem;margin-bottom:1rem;letter-spacing:-0.02em;font-family:var(--font-sans)">${line.slice(3)}</h2>`;
                  }
                  
                  if (trimmed === '') return '<div style="height: 0.75rem"></div>';
                  
                  let parsedLine = line
                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary);font-weight:600">$1</strong>')
                    .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.08);padding:0.15rem 0.35rem;border-radius:4px;font-family:var(--font-mono);font-size:0.85em;color:var(--accent)">$1</code>');

                  if (line.startsWith('- ') || /^[0-9]+\.\s/.test(line)) {
                    return `<div style="margin-bottom:0.5rem; padding-left: 1rem; position: relative; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.75;">
                              <span style="position: absolute; left: 0; color: var(--accent); font-weight: 700;">·</span>
                              ${parsedLine.replace(/^(- |^[0-9]+\.\s)/, '')}
                            </div>`;
                  }

                  return `<p style="margin-bottom:0.5rem; font-size: 0.95rem; line-height: 1.75; color: var(--text-secondary)">${parsedLine}</p>`;
                })
                .join('');
            })()
          }}
        />
      </motion.article>
    </motion.div>
  );
}

export default function Blog() {
  const [openPost, setOpenPost] = useState(null);

  return (
    <section id="blog" className="section-pad" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>Writing</h2>
            <p className="section-sub">Technical deep dives from building real projects.</p>
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }} className="blog-grid">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpenPost(post)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setOpenPost(post)}
              style={{ cursor: 'pointer' }}
            >
              <motion.div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{
                  borderColor: `${post.tagColor}35`,
                  y: -3,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px ${post.tagColor}12`,
                }}
              >
                {/* Tag accent top line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${post.tagColor}60, transparent)`,
                }} />

                {/* Tag + date */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
                  <span style={{
                    padding: '0.18rem 0.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    background: `${post.tagColor}12`,
                    color: post.tagColor,
                    border: `1px solid ${post.tagColor}25`,
                  }}>
                    {post.tag}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.015em',
                }}>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1 }}>
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid var(--border)',
                }}>
                  <span style={{
                    fontSize: '0.7rem', color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                  }}>
                    <Clock size={10} /> {post.readTime} read
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: post.tagColor,
                    fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '0.2rem',
                  }}>
                    Read <ArrowUpRight size={11} weight="bold" />
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openPost && <BlogModal post={openPost} onClose={() => setOpenPost(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
