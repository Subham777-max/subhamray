import { useState } from 'react';
import { motion } from 'motion/react';

const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'TypeScript', level: 70 },
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'ReduxToolkit', level: 78 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 78 },
      { name: 'Express.js', level: 78 },
      { name: 'REST APIs', level: 80 },
      { name: 'JWT Auth', level: 72 },
      { name: 'MongoDB', level: 74 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    skills: [
      { name: 'Docker', level: 65 },
      { name: 'Kubernetes', level: 55 },
      { name: 'Git / GitHub', level: 85 },
      { name: 'Linux', level: 68 },
    ],
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    skills: [
      { name: 'LangChain', level: 60 },
      { name: 'Prompt Engineering', level: 68 },
      { name: 'LLM APIs', level: 65 },
      { name: 'AI Automation', level: 58 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { name: 'VS Code', level: 92 },
      { name: 'Postman', level: 80 },
      { name: 'Figma', level: 40 },
      { name: 'Vite / npm', level: 82 },
    ],
  },
];

// slug = exact simple-icons identifier (visit simpleicons.org to verify)
const ALL_TECH_ICONS = [
  { name: 'React',       slug: 'react',         color: '#61DAFB' },
  { name: 'Node.js',     slug: 'nodedotjs',     color: '#68A063' },
  { name: 'TypeScript',  slug: 'typescript',    color: '#3178C6' },
  { name: 'Docker',      slug: 'docker',        color: '#2496ED' },
  { name: 'MongoDB',     slug: 'mongodb',       color: '#47A248' },
  { name: 'Kubernetes',  slug: 'kubernetes',    color: '#326CE5' },
  { name: 'LangChain',   slug: 'langchain',     color: '#00b09b' },
  { name: 'Tailwind',    slug: 'tailwindcss',   color: '#06B6D4' },
  { name: 'Express',     slug: 'express',       color: '#aaa' },
  { name: 'Git',         slug: 'git',           color: '#F05032' },
  { name: 'Vercel',      slug: 'vercel',        color: '#fff' },
  { name: 'Redux',       slug: 'redux',         color: '#764ABC' },
];

function SkillBar({ name, level, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: '1rem' }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: '0.4rem',
      }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{name}</span>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState('frontend');
  const category = SKILL_CATEGORIES.find(c => c.id === active);

  return (
    <section id="skills" className="section-pad" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <h2 className="section-heading" style={{ marginBottom: '0.75rem' }}>Skills</h2>
          <p className="section-sub">Technologies I use to bring ideas to life.</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Left: Category tabs + bars */}
          <div>
            {/* Tabs */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem',
            }}>
              {SKILL_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-pill)',
                    border: `1px solid ${active === cat.id ? 'var(--accent)' : 'var(--border)'}`,
                    background: active === cat.id ? 'var(--accent-dim)' : 'transparent',
                    color: active === cat.id ? 'var(--accent)' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Skill bars */}
            <div>
              {category.skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
              ))}
            </div>
          </div>

          {/* Right: Tech icon grid */}
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.75rem',
            }}>
              {ALL_TECH_ICONS.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(232,160,32,0.4)' }}
                  className="card"
                  style={{
                    padding: '1rem 0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'default',
                  }}
                >
                  {/* Icon from simple-icons CDN */}
                  <img
                    src={`https://cdn.simpleicons.org/${tech.slug}`}
                    alt={tech.name}
                    width="24"
                    height="24"
                    style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div style={{ display: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700 }}>
                    {tech.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills .container-max > div:last-child > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          #skills .container-max > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
