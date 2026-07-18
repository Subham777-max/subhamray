import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, GithubLogo, X, Lightning, Robot, Newspaper, Chats } from '@phosphor-icons/react';

const PROJECTS = [
  {
    id: 1,
    title: 'SupportDesk',
    tagline: 'Multi-tenant AI customer support platform.',
    description:
      'A multi-tenant, AI-powered platform where companies can embed chat widgets and let Mistral LLM + Pinecone vector search automatically resolve customer queries from their knowledge base.',
    longDesc: `SupportDesk acts as a complete AI-first support pipeline. When a customer types in the widget, Mistral detects intent. It either calls the tenant's external APIs to perform actions (like tracking an order) or queries Pinecone for knowledge base answers. If the AI cannot confidently resolve the issue, it intelligently escalates to a human agent based on current workloads. Features full data isolation per tenant.`,
    image: '/supportdesk.png',
    icon: <Robot size={24} weight="fill" />,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Pinecone', 'Mistral AI'],
    features: [
      'Multi-tenant workspace data isolation',
      'RAG pipeline with Pinecone and Mistral AI',
      'Automated tenant API tool execution',
      'Smart load-balanced agent ticket routing',
      'Cross-origin embeddable chat widget',
    ],
    challenges: [
      'Strict multi-tenant data isolation and security',
      'Building robust AI keyword guards and intent detection',
      'Managing complex cross-origin widget authentication',
    ],
    liveUrl: 'https://support-desk-one-lilac.vercel.app/',
    githubUrl: 'https://github.com/Support-Desk-S/Support_Desk',
    status: 'live',
  },
  {
    id: 2,
    title: 'IntelliImport',
    tagline: 'Upload unstructured CSVs. AI structures them.',
    description:
      'A full-stack AI-powered CRM lead import platform. Users upload raw unstructured CSVs, which are automatically normalized and mapped to a strict CRM schema using Mistral AI and LangChain.',
    longDesc: `IntelliImport completely removes manual CSV column mapping. When a file is uploaded, the Node.js backend chunks it and sends batches to Mistral AI via LangChain with a strict Zod schema. The LLM understands semantic intent and rejects invalid rows with human-readable explanations. It features dual paginated data tables, cascading project deletions, and secure HTTP-only cookie authentication.`,
    image: '/aicrm.png',
    icon: <Lightning size={24} weight="fill" />,
    tags: ['React 19', 'Express', 'MongoDB', 'Mistral AI', 'LangChain', 'Zod'],
    features: [
      'AI semantic column mapping via Mistral AI',
      'Zod schema validation for strict LLM outputs',
      'Server-side batch processing of large CSVs',
      'Cascading deletions across multiple collections',
      'Secure HTTP-only JWT session management',
    ],
    challenges: [
      'Enforcing strict JSON schema structures from the LLM',
      'Server-side pagination for independent dual data tables',
      'Orchestrating multi-collection cascading deletions',
    ],
    liveUrl: 'https://intelli-import.vercel.app',
    githubUrl: 'https://github.com/Subham777-max/IntelliImport',
    status: 'live',
  },
  {
    id: 3,
    title: 'News24',
    tagline: 'News you actually want to read.',
    description:
      'A fast, categorized news reader with real-time search, dark mode, and a bookmarking system. Built with React Query for efficient data fetching and caching.',
    longDesc: `A clean, responsive news aggregator that fetches from GNews API. React Query handles stale-while-revalidate caching, so returning users see instant content. Bookmarks persist to localStorage. Dark mode follows system preference.`,
    image: '/news24.png',
    icon: <Newspaper size={24} weight="fill" />,
    tags: ['React', 'Tailwind CSS', 'TanStack Query', 'GNews API'],
    features: [
      'Category navigation and full-text search',
      'localStorage bookmark system',
      'Infinite pagination',
      'System-aware dark mode',
    ],
    challenges: [
      'API rate limiting with stale-while-revalidate',
      'Optimistic UI for bookmark toggling',
    ],
    liveUrl: 'https://news-fix.vercel.app/',
    githubUrl: 'https://github.com/Subham777-max/News24',
    status: 'live',
  },
  {
    id: 4,
    title: 'Perplexity',
    tagline: 'AI-Powered Chat Application',
    description:
      'A full-stack intelligent chat interface with real-time communication, internet search capabilities, and multi-model AI support.',
    longDesc: `Perplexity combines real-time messaging using WebSocket technology with multiple AI models (Google Gemini, Mistral AI) and internet search capabilities (Tavily API) to provide context-aware responses. It features user authentication, JWT session management, chat history persistence, and a highly responsive React 19 frontend.`,
    image: '/perplexity.png',
    icon: <Chats size={24} weight="fill" />,
    tags: ['React 19', 'Node.js', 'Socket.IO', 'LangChain', 'MongoDB'],
    features: [
      'Real-time messaging via Socket.IO',
      'Multi-model AI support (Gemini & Mistral)',
      'Internet search integration with Tavily API',
      'Chat history persistence',
      'JWT authentication and secure sessions',
    ],
    challenges: [
      'Streaming AI responses over WebSockets',
      'Integrating external search with LLM generation',
      'Managing complex real-time application state',
    ],
    liveUrl: null,
    githubUrl: 'https://github.com/Subham777-max/Perplexity',
    status: 'completed',
  },
];

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(9, 9, 11, 0.9)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
        onClick={e => e.stopPropagation()}
        data-lenis-prevent="true"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-strong)',
          borderRadius: '24px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-pill)',
            padding: '0.5rem',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            display: 'flex',
            zIndex: 10,
            transition: 'color 0.2s, border-color 0.2s',
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
          <X size={18} />
        </button>

        <div style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ color: 'var(--accent)' }}>
              {project.icon}
            </div>
            <h3 style={{ fontWeight: 800, fontSize: '2rem', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              {project.title}
            </h3>
          </div>

          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem', border: '1px solid var(--border)' }}>
            <img src={project.image} alt={project.title} loading="lazy" decoding="async" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '400px' }} />
          </div>

          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Overview</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {project.longDesc}
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Stack</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '2.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>Key Capabilities</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {project.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <div style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%', marginTop: '0.5rem', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>Engineering Challenges</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {project.challenges.map(c => (
                  <li key={c} style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <div style={{ width: '4px', height: '4px', background: 'var(--text-muted)', borderRadius: '50%', marginTop: '0.5rem', flexShrink: 0 }} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                View Live Site <ArrowUpRight size={16} weight="bold" />
              </a>
            )}
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              <GithubLogo size={18} /> Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectRow({ project, index, onOpen }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: '6rem' }}
    >
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '4rem',
        alignItems: 'center'
      }}>
        {/* Image side */}
        <div style={{ order: isEven ? 1 : 2 }} className="project-image-col">
          <div 
            className="spotlight-card"
            style={{ 
              borderRadius: 'var(--radius-card)', 
              overflow: 'hidden', 
              border: '1px solid var(--border)',
              cursor: 'pointer',
              aspectRatio: '16/9',
              background: 'var(--bg-elevated)'
            }}
            onClick={() => onOpen(project)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onOpen(project)}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
              <img 
                src={project.image} 
                alt={project.title} 
                loading="lazy"
                decoding="async"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  objectPosition: 'top',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }} 
              />
            </div>
          </div>
        </div>

        {/* Content side */}
        <div style={{ order: isEven ? 2 : 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="project-text-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: 'var(--accent)' }}>{project.icon}</div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              {project.title}
            </h3>
          </div>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '500px' }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button 
              onClick={() => onOpen(project)}
              style={{ 
                background: 'none', border: 'none', padding: 0, 
                color: 'var(--accent)', fontWeight: 600, fontSize: '0.95rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'var(--font-sans)'
              }}
            >
              Read case study <ArrowUpRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .project-text-col { order: 2 !important; }
          .project-image-col { order: 1 !important; margin-bottom: 2rem; }
        }
      `}</style>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="section-pad">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '6rem', maxWidth: '600px' }}
        >
          <div className="accent-line" />
          <h2 className="section-heading" style={{ marginBottom: '1rem' }}>Selected Work</h2>
          <p className="section-sub" style={{ fontSize: '1.1rem' }}>
            Real-world software built to solve practical problems. Focused on modern architecture, clean interfaces, and robust systems.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} onOpen={setSelected} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: '2rem', textAlign: 'center' }}
        >
          <a
            href="https://github.com/Subham777-max"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <GithubLogo size={18} />
            View GitHub Archive
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
