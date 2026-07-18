import { useState } from 'react';
import { motion } from 'motion/react';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, EnvelopeSimple, CheckCircle, MapPin } from '@phosphor-icons/react';

const SOCIALS = [
  {
    Icon: GithubLogo,
    href: 'https://github.com/Subham777-max',
    label: 'GitHub',
    handle: 'Subham777-max',
    color: '#f5f5f0',
  },
  {
    Icon: LinkedinLogo,
    href: 'https://www.linkedin.com/in/subham-ray-174bb9328/',
    label: 'LinkedIn',
    handle: 'subham-ray-174bb9328',
    color: '#0ea5e9',
  },
  {
    Icon: EnvelopeSimple,
    href: 'mailto:subhamray865@gmail.com',
    label: 'Email',
    handle: 'subhamray865@gmail.com',
    color: '#e8a020',
  },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 20) e.message = 'Minimum 20 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    
    try {
      const payload = {
        name: form.name,
        email: form.email,
        _subject: form.subject,
        message: form.message
      };

      const response = await fetch('https://formspree.io/f/xzdnrzja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = field => e => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(err => ({ ...err, [field]: undefined }));
  };

  return (
    <section id="contact" className="section-pad">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <h2 className="section-heading" style={{ marginBottom: '0.75rem' }}>Get In Touch</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Open to internships, junior developer roles, and interesting collaborations.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '2.5rem',
          alignItems: 'start',
        }} className="contact-grid">

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {/* Availability card */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '14px',
              padding: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, rgba(34,197,94,0.6), transparent)',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                  animation: 'pulse-g 2s ease-in-out infinite',
                }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  Open to opportunities
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Looking for internships, junior developer roles, and freelance projects.
                Typically respond within 24 hours.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <MapPin size={12} /> West Bengal, India
              </div>
            </div>

            {/* Social links */}
            {SOCIALS.map(({ Icon, href, label, handle, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'border-color 0.25s ease, background 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${color}40`;
                  e.currentTarget.style.background = 'var(--bg-card-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'var(--bg-card)';
                }}
              >
                <div style={{
                  width: '36px', height: '36px',
                  borderRadius: '9px',
                  background: `${color}12`,
                  border: `1px solid ${color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.1rem' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {handle}
                  </div>
                </div>
              </a>
            ))}
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: '16px',
                  padding: '3rem 2rem',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '1rem', textAlign: 'center', minHeight: '420px',
                }}
              >
                <CheckCircle size={52} color="var(--accent)" weight="fill" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Message sent!</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '28ch' }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-ghost"
                  style={{ marginTop: '0.5rem' }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex', flexDirection: 'column', gap: '1.25rem',
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                    <div>
                      <label htmlFor="cnt-name" className="form-label">Name</label>
                      <input id="cnt-name" type="text" className="form-input" placeholder="Your name" value={form.name} onChange={handleChange('name')} autoComplete="name" />
                      {errors.name && <p style={{ fontSize: '0.72rem', color: '#f87171', marginTop: '0.3rem' }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="cnt-email" className="form-label">Email</label>
                      <input id="cnt-email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange('email')} autoComplete="email" />
                      {errors.email && <p style={{ fontSize: '0.72rem', color: '#f87171', marginTop: '0.3rem' }}>{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cnt-subject" className="form-label">Subject</label>
                    <input id="cnt-subject" type="text" className="form-input" placeholder="Internship inquiry, collaboration..." value={form.subject} onChange={handleChange('subject')} />
                    {errors.subject && <p style={{ fontSize: '0.72rem', color: '#f87171', marginTop: '0.3rem' }}>{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="cnt-message" className="form-label">Message</label>
                    <textarea
                      id="cnt-message"
                      className="form-input"
                      placeholder="Tell me about the role, project, or what you have in mind..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange('message')}
                      style={{ resize: 'vertical', minHeight: '120px' }}
                    />
                    {errors.message && <p style={{ fontSize: '0.72rem', color: '#f87171', marginTop: '0.3rem' }}>{errors.message}</p>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={status === 'sending'}
                      style={{ opacity: status === 'sending' ? 0.75 : 1 }}
                    >
                      {status === 'sending' ? 'Sending...' : (
                        <>Send Message <PaperPlaneTilt size={15} weight="fill" /></>
                      )}
                    </button>
                    {status === 'error' && (
                      <span style={{ fontSize: '0.8rem', color: '#f87171' }}>
                        Failed to send. Please try again.
                      </span>
                    )}
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-g {
          0%, 100% { box-shadow: 0 0 6px rgba(34,197,94,0.7); }
          50%       { box-shadow: 0 0 14px rgba(34,197,94,1); }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
