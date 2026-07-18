import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, GithubLogo, LinkedinLogo, EnvelopeSimple, ArrowRight, Sparkle } from '@phosphor-icons/react';

const ROLES = [
  'Full Stack Developer',
  'React & Node.js Engineer',
  'AI Application Builder',
  'Cloud-Native Developer',
];

function useTyping(words, speed = 75, pause = 2200) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    if (!deleting) {
      if (charIdx < word.length) {
        timeout.current = setTimeout(() => {
          setDisplay(word.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, speed);
      } else {
        timeout.current = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (charIdx > 0) {
        timeout.current = setTimeout(() => {
          setDisplay(word.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, speed / 2.5);
      } else {
        setDeleting(false);
        setWordIdx(i => i + 1);
      }
    }
    return () => clearTimeout(timeout.current);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const STACK = ['React', 'Node.js', 'Docker', 'MongoDB', 'LangChain', 'Kubernetes'];

export default function Hero() {
  const typed = useTyping(ROLES);

  return (
    <section
      id="home"
      style={{
        minHeight: '100dvh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '96px',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div
        className="hero-orb"
        style={{
          width: '600px', height: '600px',
          background: 'rgba(232,160,32,0.07)',
          top: '-200px', left: '-200px',
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: '400px', height: '400px',
          background: 'rgba(180,120,255,0.05)',
          bottom: '-100px', right: '-100px',
        }}
      />

      <div className="container-max" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: '3rem',
            alignItems: 'center',
            paddingBlock: '3rem',
          }}
          className="hero-grid"
        >
          {/* ── Left: Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                border: '1px solid rgba(232,160,32,0.25)',
                background: 'rgba(232,160,32,0.07)',
                width: 'fit-content',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: '#c8880e',
                fontWeight: 600,
              }}
            >
              <div style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                animation: 'pulse-green 2s ease-in-out infinite',
              }} />
              Open to opportunities
            </motion.div>

            {/* Main headline */}
            <div>
              <h1
                style={{
                  fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.03,
                  color: 'var(--text-primary)',
                  marginBottom: '0.1em',
                }}
              >
                Hi, I'm{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #e8a020 0%, #f0c060 50%, #e8a020 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer-text 4s linear infinite',
                  }}
                >
                  Subham Ray.
                </span>
              </h1>
              <h1
                style={{
                  fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.03,
                  color: 'var(--text-primary)',
                }}
              >
                I build{' '}
                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontWeight: 700 }}>
                  scalable
                </span>{' '}
                software.
              </h1>
            </div>

            {/* Typed role */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                minHeight: '1.5rem',
                borderLeft: '2px solid var(--accent)',
                paddingLeft: '0.75rem',
              }}
            >
              <span className="typing-cursor">{typed}</span>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '50ch',
            }}>
              Passionate CS undergraduate building AI-powered web apps, scalable
              backends, and cloud-native solutions. Focused on clean architecture
              and practical software engineering.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={14} weight="bold" />
              </a>
              <a href="#contact" className="btn-ghost">
                Get In Touch
              </a>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                FIND ME ON
              </span>
              {[
                { Icon: GithubLogo, href: 'https://github.com/Subham777-max', label: 'GitHub' },
                { Icon: LinkedinLogo, href: 'https://www.linkedin.com/in/subham-ray-174bb9328/', label: 'LinkedIn' },
                {
                  Icon: EnvelopeSimple,
                  href: 'mailto:subhamray865@gmail.com',
                  label: 'Email',
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    color: 'var(--text-muted)',
                    transition: 'color 0.2s ease, transform 0.2s ease',
                    display: 'flex',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Visual Terminal Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <HeroCard stack={STACK} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} color="var(--text-muted)" />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes shimmer-text {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 6px rgba(34,197,94,0.7); }
          50%       { box-shadow: 0 0 12px rgba(34,197,94,1); }
        }
        .hero-grid {
          grid-template-columns: 55% 45%;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .hero-grid > div:last-child {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}

function HeroCard({ stack }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: '100%', maxWidth: '420px', position: 'relative' }}
    >
      {/* Main card with terminal aesthetic */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-strong)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,160,32,0.08)',
          position: 'relative',
        }}
      >
        {/* Terminal header bar */}
        <div style={{
          background: 'var(--bg-elevated)',
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
          </div>
          <span style={{
            flex: 1, textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
          }}>
            subham@portfolio: ~
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </span>
        </div>

        {/* Profile section */}
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border)' }}>
          {/* Dino avatar */}
          <div style={{
            width: '64px', height: '64px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(232,160,32,0.4)',
            flexShrink: 0,
            background: 'var(--bg-elevated)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img
              src="/logoo.jpg"
              alt="Subham Ray"
              fetchpriority="high"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              display: 'none',
              width: '100%', height: '100%',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '1.25rem',
              background: 'linear-gradient(135deg, var(--accent), #f0c060)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              SR
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              Subham Ray
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Full Stack Developer
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Sparkle size={11} color="var(--accent)" weight="fill" />
              <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                3rd year CS undergraduate
              </span>
            </div>
          </div>
        </div>

        {/* Code block */}
        <div style={{ padding: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 1.7 }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>$ cat about.json</div>
          <div>
            <span style={{ color: '#888' }}>{'{'}</span>
          </div>
          {[
            { key: '"role"', value: '"Full Stack Developer"', vc: '#e8a020' },
            { key: '"focus"', value: '"AI + Web + Cloud"', vc: '#7dd3fc' },
            { key: '"learning"', value: '"Docker, K8s, LangChain"', vc: '#86efac' },
            { key: '"available"', value: 'true', vc: '#4ade80' },
          ].map(({ key, value, vc }) => (
            <div key={key} style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#7dd3fc' }}>{key}</span>
              <span style={{ color: '#888' }}>: </span>
              <span style={{ color: vc }}>{value}</span>
              <span style={{ color: '#888' }}>,</span>
            </div>
          ))}
          <div>
            <span style={{ color: '#888' }}>{'}'}</span>
          </div>
        </div>

        {/* Stack strip */}
        <div style={{
          padding: '0.875rem 1.25rem',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-elevated)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
        }}>
          {stack.map(s => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>
      </div>

      {/* Floating accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          top: '-12px', right: '-12px',
          background: 'var(--bg-card)',
          border: '1px solid rgba(232,160,32,0.3)',
          borderRadius: '10px',
          padding: '0.5rem 0.8rem',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          color: 'var(--text-secondary)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.8)' }} />
        Building in public
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: '-12px', left: '-12px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-strong)',
          borderRadius: '10px',
          padding: '0.5rem 0.8rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          color: 'var(--accent)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        Academy of Technology, CSE 2028
      </motion.div>
    </motion.div>
  );
}
