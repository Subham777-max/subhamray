import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { List, X, GithubLogo } from '@phosphor-icons/react';

const NAV_LINKS = [
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#projects',   label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#blog',       label: 'Blog' },
  { href: '#contact',    label: 'Contact' },
];

const AUTO_COLLAPSE_MS = 3500;

// Smooth spring — low stiffness, higher damping = no jerk
const SPRING = { type: 'spring', stiffness: 140, damping: 26, mass: 1 };

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [pastHero,      setPastHero]      = useState(false);
  const [navExpanded,   setNavExpanded]   = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActive]        = useState('');
  const [isMobile,      setIsMobile]      = useState(false);
  const collapseTimer = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const hero = document.getElementById('home');
      if (hero) setPastHero(hero.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!pastHero) { setNavExpanded(false); clearTimeout(collapseTimer.current); }
  }, [pastHero]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const io = new IntersectionObserver(
      entries => { const v = entries.filter(e => e.isIntersecting); if (v.length) setActive(v[0].target.id); },
      { threshold: 0.3 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const handleCompactClick = () => {
    clearTimeout(collapseTimer.current);
    setNavExpanded(true);
    collapseTimer.current = setTimeout(() => setNavExpanded(false), AUTO_COLLAPSE_MS);
  };

  const resetTimer = () => {
    if (!navExpanded || !pastHero) return;
    clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setNavExpanded(false), AUTO_COLLAPSE_MS);
  };

  const closeMobile = () => setMobileOpen(false);
  const showFull = !pastHero || navExpanded || isMobile;

  return (
    <>
      {/* ── Fixed header: right-aligned on desktop ── */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 100,
          paddingTop: '0.9rem',
          paddingInline: '1.5rem',
          display: 'flex',
          justifyContent: 'flex-end',   // ← collapse to RIGHT
          pointerEvents: 'none',
        }}
        className="nav-header"
      >
        {/* ── Pill container ── */}
        <motion.div
          layout
          onMouseEnter={resetTimer}
          transition={{ layout: SPRING }}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            background: scrolled || pastHero
              ? 'rgba(11,11,15,0.94)'
              : 'rgba(11,11,15,0.78)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '9999px',
            boxShadow: scrolled || pastHero
              ? '0 8px 40px rgba(0,0,0,0.55)'
              : '0 4px 24px rgba(0,0,0,0.28)',
            overflow: 'hidden',
            /* wider pill — padding grows with content */
            padding: showFull ? '0.45rem 0.5rem 0.45rem 1.1rem' : '0.45rem 0.9rem',
            gap: '0.5rem',
          }}
        >
          {/* Full content — fades as unit (no sequential wait) */}
          <AnimatePresence initial={false}>
            {showFull && (
              <motion.div
                key="full-bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}
              >
                {/* Logo */}
                <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    overflow: 'hidden', flexShrink: 0,
                    border: '1.5px solid rgba(232,160,32,0.40)',
                    background: '#1a1a20',
                  }}>
                    <img
                      src="/logoo.jpg" alt="Subham Ray"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => {
                        e.target.parentNode.innerHTML =
                          '<span style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:800;font-size:0.6rem;color:#e8a020">SR</span>';
                      }}
                    />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                    subham.dev
                  </span>
                </a>

                {/* Nav links island */}
                <nav
                  aria-label="Primary navigation"
                  className="desktop-nav"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.05rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '9999px',
                    padding: '0.28rem 0.45rem',
                    marginInline:'2rem'
                  }}
                >
                  {NAV_LINKS.map(link => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        style={{
                          padding: '0.32rem 0.9rem',    // wider than before
                          borderRadius: '9999px',
                          fontSize: '0.8rem',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          textDecoration: 'none',
                          background: isActive ? 'rgba(232,160,32,0.12)' : 'transparent',
                          border: isActive ? '1px solid rgba(232,160,32,0.22)' : '1px solid transparent',
                          transition: 'all 0.18s ease',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            e.currentTarget.style.color = 'var(--text-primary)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>

                {/* GitHub + Hire Me */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
                  <a
                    href="https://github.com/Subham777-max"
                    target="_blank" rel="noreferrer"
                    aria-label="GitHub"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '32px', height: '32px', borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.04)',
                      color: 'var(--text-secondary)', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,160,32,0.4)'; e.currentTarget.style.color = 'var(--accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <GithubLogo size={15} />
                  </a>
                  <a
                    href="#contact"
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '0.42rem 1.15rem',
                      background: 'var(--accent)', color: '#000',
                      fontWeight: 700, fontSize: '0.8rem',
                      borderRadius: '9999px', textDecoration: 'none',
                      transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(232,160,32,0.35)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    Hire Me
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compact "Menu" button — shown when collapsed */}
          <AnimatePresence initial={false}>
            {!showFull && (
              <motion.button
                key="compact-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                onClick={handleCompactClick}
                className="desktop-nav"
                aria-label="Expand navigation"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.45rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600,
                  padding: '0.1rem 0.2rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <List size={16} />
                Menu
              </motion.button>
            )}
          </AnimatePresence>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="mobile-toggle"
            style={{
              display: 'none',
              alignItems: 'center', justifyContent: 'center',
              width: '34px', height: '34px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--text-primary)', cursor: 'pointer', flexShrink: 0,
            }}
            aria-label="Open navigation"
          >
            <List size={17} />
          </button>
        </motion.div>

        {/* Auto-collapse progress bar */}
        <AnimatePresence>
          {pastHero && navExpanded && (
            <motion.div
              key="prog"
              initial={{ scaleX: 1, opacity: 0.6 }}
              animate={{ scaleX: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: AUTO_COLLAPSE_MS / 1000, ease: 'linear' }}
              style={{
                position: 'absolute', bottom: '-5px', right: '1.5rem',
                width: '100px', height: '2px',
                background: 'var(--accent)', borderRadius: '9999px',
                transformOrigin: 'right',     // shrinks from right
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeMobile}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(9,9,11,0.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '2rem',
            }}
          >
            <button
              onClick={e => { e.stopPropagation(); closeMobile(); }}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 201,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '42px', height: '42px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.10)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--text-primary)', cursor: 'pointer',
              }}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => { e.stopPropagation(); closeMobile(); }}
                style={{
                  fontWeight: 700, fontSize: '2rem',
                  color: activeSection === link.href.slice(1) ? 'var(--accent)' : 'var(--text-primary)',
                  textDecoration: 'none', transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = activeSection === link.href.slice(1) ? 'var(--accent)' : 'var(--text-primary)';
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.055 }}
              onClick={e => { e.stopPropagation(); closeMobile(); }}
              style={{
                marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center',
                padding: '0.7rem 2.25rem',
                background: 'var(--accent)', color: '#000',
                fontWeight: 700, fontSize: '0.95rem',
                borderRadius: '9999px', textDecoration: 'none',
              }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          /* On mobile the pill spans left→right like a topbar */
          .nav-header {
            justify-content: space-between !important;
            padding-inline: 1rem !important;
          }
          .nav-header > div {
            width: 100% !important;
            justify-content: space-between !important;
            padding: 0.4rem 0.4rem 0.4rem 0.9rem !important;
          }
        }
      `}</style>
    </>
  );
}
