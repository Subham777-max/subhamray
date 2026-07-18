import { GithubLogo, LinkedinLogo, EnvelopeSimple, Heart } from '@phosphor-icons/react';

const NAV_ITEMS = [
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#projects',   label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#journey',    label: 'Journey' },
  { href: '#blog',       label: 'Blog' },
  { href: '#contact',    label: 'Contact' },
];

const TECH = ['React.js', 'Node.js', 'MongoDB', 'Docker', 'LangChain', 'Tailwind CSS'];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-elevated)',
      paddingBlock: '3rem',
    }}>
      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', marginBottom: '0.875rem' }}>
              <div style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(232,160,32,0.3)',
                background: 'var(--bg-card)',
                flexShrink: 0,
              }}>
                <img
                  src="/logoo.jpg"
                  alt="Subham Ray"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => {
                    e.target.parentNode.innerHTML = '<span style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:800;font-size:0.65rem;color:#e8a020">SR</span>';
                  }}
                />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                subham.dev
              </span>
            </a>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: '28ch', marginBottom: '1.25rem' }}>
              Full Stack Developer building scalable web apps and AI-powered tools.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem' }}>
              {[
                { Icon: GithubLogo,     href: 'https://github.com/Subham777-max',                     label: 'GitHub' },
                { Icon: LinkedinLogo,   href: 'https://www.linkedin.com/in/subham-ray-174bb9328/',    label: 'LinkedIn' },
                { Icon: EnvelopeSimple, href: 'mailto:subhamray865@gmail.com',                         label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease', display: 'flex' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}>
              NAVIGATION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {NAV_ITEMS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 700, letterSpacing: '0.1em' }}>
              BUILT WITH
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {TECH.map(t => (
                <span key={t} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {year} Subham Ray. All rights reserved.
          </span>
          <span style={{
            fontSize: '0.75rem', color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            fontFamily: 'var(--font-mono)',
          }}>
            Built with <Heart size={11} weight="fill" color="var(--accent)" /> using React + Tailwind CSS
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
  );
}
