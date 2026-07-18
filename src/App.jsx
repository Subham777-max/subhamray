import { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from '@phosphor-icons/react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';

const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Journey = lazy(() => import('./components/Journey'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));

// Loading screen
function LoadingScreen({ onDone }) {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState(0); // 0: typing, 1: running, 2: done

  useEffect(() => {
    const cmd = "npm run dev";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= cmd.length) {
        setTyped(cmd.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
        setPhase(1);
        setTimeout(() => {
          setPhase(2);
          setTimeout(onDone, 800); // Wait a bit before fading out
        }, 850);
      }
    }, 90);

    return () => clearInterval(typeInterval);
  }, [onDone]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        background: 'var(--bg-base)',
      }}
    >
      <div style={{ 
        background: 'var(--bg-card)', border: '1px solid var(--border-strong)', 
        borderRadius: '12px', padding: '1.5rem', width: '340px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        fontFamily: 'var(--font-mono)'
      }}>
        {/* Terminal Header */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
        </div>
        
        {/* Terminal Content */}
        <div style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
          <div style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: '#28c840' }}>subham@portfolio</span>
            <span style={{ color: 'var(--text-muted)' }}>:</span>
            <span style={{ color: '#7dd3fc' }}>~/website</span>
            <span style={{ color: 'var(--text-muted)' }}>$ </span>
            <span style={{ color: 'var(--text-primary)' }}>{typed}</span>
            {phase === 0 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ width: '8px', height: '15px', background: 'var(--text-primary)', display: 'inline-block', verticalAlign: 'middle', marginLeft: '6px' }}
              />
            )}
          </div>
          
          {phase >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '0.75rem', color: 'var(--text-muted)' }}>
              <div>{'>'} portfolio@1.0.0 dev</div>
              <div>{'>'} vite</div>
              <div style={{ marginTop: '0.75rem', color: '#28c840', fontWeight: 600 }}>
                VITE v5.0.0 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>ready in 245 ms</span>
              </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '0.75rem' }}>
              <div style={{ color: '#7dd3fc' }}>  ➜  Local:   <span style={{ color: 'var(--text-primary)' }}>http://localhost:5173/</span></div>
              <div style={{ color: 'var(--accent)', marginTop: '0.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%', animation: 'pulse-green 1.5s infinite' }} />
                Launching...
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Scroll progress bar
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}

// Back to top
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Initialize premium smooth scrolling (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Request animation frame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Event delegation for anchor links to ensure dynamically added links work
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement, { offset: -80 }); // offset for navbar
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <div className="mesh-bg" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <ScrollProgressBar />

      {/* Render immediately to allow browser preload scanner to fetch assets in parallel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Suspense fallback={null}>
            <Projects />
            <Experience />
            <Journey />
            <Blog />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </motion.div>

      <BackToTop />
    </>
  );
}
