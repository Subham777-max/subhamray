import { motion } from 'motion/react';
import { MapPin, Calendar, ArrowUpRight } from '@phosphor-icons/react';

const EXPERIENCE = [
  {
    role: 'Frontend Developer Intern',
    company: 'Askmeidentity',
    location: 'Remote',
    period: '2025',
    duration: '3 months',
    responsibilities: [
      'Developed responsive UI components with React and Tailwind CSS',
      'Collaborated with backend developers to integrate REST APIs',
      'Fixed UI bugs and improved component performance',
      'Participated in code reviews and daily standups',
      'Improved page load time by 30% through lazy loading and code splitting',
    ],
    tags: ['React', 'Tailwind CSS', 'REST APIs', 'Git'],
  },
];

const EDUCATION = [
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    institution: 'Academy of Technology',
    period: '2024 - 2028',
    grade: 'Expected 2028',
    highlights: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Database Management',
      'Computer Networks',
    ],
  },
];

function RevealCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container-max">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
        }}>
          {/* Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '2rem' }}
            >
              <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>Experience</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Professional work history
              </p>
            </motion.div>

            {EXPERIENCE.map((exp, i) => (
              <RevealCard key={i} delay={0.1}>
                <div
                  className="card"
                  style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: 'linear-gradient(90deg, var(--accent), transparent)',
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {exp.role}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>
                          {exp.company}
                        </span>
                        <span style={{
                          display: 'flex', alignItems: 'center', gap: '0.25rem',
                          fontSize: '0.75rem', color: 'var(--text-muted)',
                        }}>
                          <MapPin size={11} /> {exp.location}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        <Calendar size={11} /> {exp.period}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{exp.duration}</div>
                    </div>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} style={{
                        fontSize: '0.82rem', color: 'var(--text-secondary)',
                        paddingLeft: '1rem',
                        position: 'relative',
                      }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>+</span>
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* Education + Achievements */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Education */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '2rem' }}
              >
                <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>Education</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Academic background
                </p>
              </motion.div>

              {EDUCATION.map((edu, i) => (
                <RevealCard key={i} delay={0.1}>
                  <div className="card" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                      background: 'linear-gradient(90deg, #0082ff, transparent)',
                    }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                          {edu.degree}
                        </h3>
                        <div style={{ fontSize: '0.85rem', color: '#0082ff', fontWeight: 600 }}>{edu.field}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                          {edu.institution}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {edu.period}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{edu.grade}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {edu.highlights.map(h => (
                        <span key={h} style={{
                          padding: '0.15rem 0.6rem',
                          borderRadius: 'var(--radius-pill)',
                          border: '1px solid var(--border)',
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealCard>
              ))}
            </div>

            {/* Achievements */}
            <RevealCard delay={0.2}>
              <div className="card" style={{ padding: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '1rem', fontWeight: 600 }}>
                  ACHIEVEMENTS
                </div>
                {[
                  'Built multiple full-stack production-ready projects',
                  'Strong foundation in Data Structures and Algorithms',
                  'Consistent learner with self-paced project-driven growth',
                  'Exploring open source contributions',
                ].map((a, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                    padding: '0.5rem 0',
                    borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                  }}>
                    <ArrowUpRight size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: '1px' }} />
                    {a}
                  </div>
                ))}
              </div>
            </RevealCard>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience .container-max > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
