import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Code, Cloud, Brain, Wrench, X, DownloadSimple } from '@phosphor-icons/react';

const INTERESTS = [
  'Full Stack Development',
  'Cloud Computing',
  'Artificial Intelligence',
  'DevOps & Containers',
  'Backend Architecture',
  'System Design',
];

function RevealItem({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ResumeModal({ onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(9, 9, 11, 0.9)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-strong)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '900px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)',
          background: 'var(--bg-card)'
        }}>
          <h3 style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Resume Preview</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a 
              href="/resume.pdf" 
              download 
              className="btn-primary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
            >
              <DownloadSimple size={16} weight="bold" /> Download PDF
            </a>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-strong)',
                borderRadius: '50%',
                padding: '0.4rem',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.borderColor = 'var(--border-strong)';
              }}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div style={{ flex: 1, background: '#e5e5e5' }}>
          <iframe 
            src="/resume.pdf#toolbar=0&view=FitH" 
            title="Resume Preview"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const [showResume, setShowResume] = useState(false);

  return (
    <section id="about" className="section-pad">
      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div>
            <RevealItem>
              <span className="accent-line" />
              <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>About Me</h2>
              <p className="section-sub" style={{ marginBottom: '1.25rem' }}>
                Computer Science undergraduate passionate about building modern web applications
                that solve real-world problems with clean architecture and modern technologies.
              </p>
              <p className="section-sub">
                I'm actively exploring the intersection of AI and web development, building tools
                that leverage LLMs, cloud infrastructure, and scalable backend patterns.
              </p>
            </RevealItem>

            <RevealItem delay={0.1}>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="#projects" className="btn-primary">
                  My Projects
                </a>
                <button
                  onClick={() => setShowResume(true)}
                  className="btn-ghost"
                >
                  Download Resume
                </button>
              </div>
            </RevealItem>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Interests */}
            <RevealItem delay={0.1}>
              <div className="card" style={{ padding: '1.5rem' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  marginBottom: '1rem',
                  fontWeight: 600,
                }}>
                  INTERESTS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {INTERESTS.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <div style={{
                        width: '5px', height: '5px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        flexShrink: 0,
                      }} />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealItem>

            {/* Mini bento */}
            <RevealItem delay={0.2}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { icon: <Code size={22} />, title: 'Frontend', desc: 'React, TypeScript, Tailwind' },
                  { icon: <Cloud size={22} />, title: 'Backend', desc: 'Node.js, Express, REST APIs' },
                  { icon: <Brain size={22} />, title: 'AI / LLMs', desc: 'LangChain, Prompt Eng.' },
                  { icon: <Wrench size={22} />, title: 'DevOps', desc: 'Docker, Kubernetes, Git' },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="card"
                    style={{ padding: '1rem', cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(232,160,32,0.4)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>{icon}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </RevealItem>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          #about .container-max > div {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
