import { useState } from 'react';
import { useToast } from '../services/ToastContext';
import { useLanguage } from '../services/LanguageContext';

function Contact() {
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', address: '', message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = t.contact_error_required;
    if (!form.lastName.trim())  errs.lastName  = t.contact_error_required;
    if (!form.email) {
      errs.email = t.contact_error_required;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = t.contact_error_email;
    }
    if (!form.phone)   errs.phone   = t.contact_error_required;
    if (!form.message) errs.message = t.contact_error_required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    showToast(t.contact_success, 'success');
    setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', message: '' });
    setErrors({});
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '14px 18px',
    background: 'var(--input-bg)',
    border: `1px solid ${hasError ? 'rgba(239,68,68,0.5)' : 'var(--border)'}`,
    borderRadius: '12px',
    color: 'var(--text)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    boxSizing: 'border-box',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: '60px 20px 80px',
      fontFamily: "'DM Sans', 'Sora', sans-serif",
      color: 'var(--text)',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .contact-input:focus { border-color: var(--border-focus) !important; background: var(--input-bg-focus) !important; }
        .contact-input::placeholder { color: var(--text-muted); }
        .contact-input textarea { resize: vertical; }
        .contact-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,255,255,0.18) !important; }
      `}</style>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div style={{
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px',
          }}>
            CONTACT
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            fontWeight: 700, color: 'var(--text)',
            letterSpacing: '-0.02em', margin: '0 0 10px',
          }}>
            {t.contact_title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 300 }}>
            {t.contact_subtitle}
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '36px 32px',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* First + Last name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <input
                  className="contact-input"
                  type="text" name="firstName"
                  placeholder={t.contact_firstname_placeholder}
                  value={form.firstName} onChange={handleChange}
                  style={inputStyle(errors.firstName)}
                />
                {errors.firstName && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.firstName}</span>}
              </div>
              <div>
                <input
                  className="contact-input"
                  type="text" name="lastName"
                  placeholder={t.contact_lastname_placeholder}
                  value={form.lastName} onChange={handleChange}
                  style={inputStyle(errors.lastName)}
                />
                {errors.lastName && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.lastName}</span>}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                className="contact-input"
                type="email" name="email"
                placeholder={t.contact_email_placeholder}
                value={form.email} onChange={handleChange}
                style={inputStyle(errors.email)}
              />
              {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
            </div>

            {/* Phone */}
            <div>
              <input
                className="contact-input"
                type="tel" name="phone"
                placeholder={t.contact_phone_placeholder}
                value={form.phone} onChange={handleChange}
                style={inputStyle(errors.phone)}
              />
              {errors.phone && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
            </div>

            {/* Address (optional) */}
            <div>
              <input
                className="contact-input"
                type="text" name="address"
                placeholder={t.contact_address_placeholder}
                value={form.address} onChange={handleChange}
                style={inputStyle(false)}
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                className="contact-input"
                name="message"
                placeholder={t.contact_message_placeholder}
                value={form.message} onChange={handleChange}
                rows={5}
                style={{ ...inputStyle(errors.message), resize: 'vertical' }}
              />
              {errors.message && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
            </div>

            {/* Submit */}
            <button
              className="contact-submit"
              type="submit"
              style={{
                width: '100%', padding: '15px',
                background: 'var(--btn-solid-bg)', color: 'var(--btn-solid-text)',
                border: 'none', borderRadius: '50px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.9rem', fontWeight: 700,
                cursor: 'pointer', marginTop: '4px',
                boxShadow: 'var(--btn-solid-shadow)',
                transition: 'transform 0.15s, box-shadow 0.2s',
              }}
            >
              {t.contact_submit_button}
            </button>
          </form>
        </div>

        {/* Quick contact info */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '32px',
          marginTop: '32px', flexWrap: 'wrap',
        }}>
          {[
            { icon: '📧', text: 'nguyentiendat19042006@gmail.com' },
            { icon: '📞', text: '0383 834 006' },
            { icon: '📍', text: 'TP. Hồ Chí Minh, VN' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '0.82rem', color: 'var(--text-muted)',
            }}>
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;