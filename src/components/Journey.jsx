import { motion } from 'motion/react';

const TIMELINE = [
  {
    year: '2024',
    title: 'Started the Journey',
    items: [
      'Learned HTML, CSS, JavaScript',
      'Built first static websites',
      'Discovered programming fundamentals',
    ],
    accent: '#e8a020',
  },
  {
    year: '2025',
    title: 'Full Stack Growth',
    items: [
      'Mastered React.js and Node.js',
      'Built full-stack applications',
      'Learned MongoDB and REST APIs',
      'Started with Docker basics',
    ],
    accent: '#0ea5e9',
  },
  {
    year: '2026',
    title: 'Cloud and AI Focus',
    items: [
      'Deep dive into Docker and Kubernetes',
      'Building AI apps with LangChain',
      'Exploring cloud-native architecture',
      'Building this portfolio',
    ],
    accent: '#8b5cf6',
  },
  {
    year: '2027',
    title: 'Goals Ahead',
    items: [
      'Open source contributions',
      'Advanced system design patterns',
      'AWS certifications',
      'Building SaaS products',
    ],
    accent: '#f59e0b',
  },
];

const WHAT_I_BUILD = [
  'AI Applications',
  'Developer Tools',
  'SaaS Products',
  'REST APIs',
  'Dashboards',
  'Automation Tools',
  'Full Stack Apps',
  'Cloud-Native Services',
];

function TimelineCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '1.25rem 1.25rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${item.accent}, transparent)`,
      }} />

      {/* Large watermark year */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '4rem',
        fontWeight: 900,
        color: item.accent,
        opacity: 0.06,
        position: 'absolute',
        bottom: '0.5rem',
        right: '0.75rem',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        {item.year}
      </div>

      {/* Year pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.18rem 0.6rem',
        borderRadius: '9999px',
        background: `${item.accent}12`,
        border: `1px solid ${item.accent}25`,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        color: item.accent,
        fontWeight: 700,
        width: 'fit-content',
        letterSpacing: '0.04em',
      }}>
        {item.year}
      </div>

      <h3 style={{
        fontWeight: 700,
        fontSize: '0.95rem',
        color: 'var(--text-primary)',
        lineHeight: 1.3,
      }}>
        {item.title}
      </h3>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
        {item.items.map(point => (
          <li
            key={point}
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              paddingLeft: '0.85rem',
              position: 'relative',
              lineHeight: 1.45,
            }}
          >
            <span style={{
              position: 'absolute', left: 0, top: '0.45em',
              width: '4px', height: '4px',
              borderRadius: '50%',
              background: item.accent,
            }} />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="section-pad">
      <div className="container-max">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <h2 className="section-heading" style={{ marginBottom: '0.75rem' }}>My Journey</h2>
          <p className="section-sub">A timeline of learning, building, and growing as a developer.</p>
        </motion.div>

        {/* Timeline grid — 4 col on desktop, 2 on tablet, 1 on mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
            marginBottom: '4rem',
          }}
          className="journey-grid"
        >
          {TIMELINE.map((item, i) => (
            <TimelineCard key={item.year} item={item} index={i} />
          ))}
        </div>

        {/* "What I love building" section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            textAlign: 'center',
            letterSpacing: '-0.015em',
          }}>
            What I love building
          </h3>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.65rem',
            justifyContent: 'center',
          }}>
            {WHAT_I_BUILD.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: '0.5rem 1.15rem',
                  borderRadius: '9999px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  cursor: 'default',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(232,160,32,0.35)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Responsive overrides */}
      <style>{`
        /* Tablet: 2 columns */
        @media (max-width: 1024px) {
          .journey-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        /* Mobile: single column */
        @media (max-width: 540px) {
          .journey-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
