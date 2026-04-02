import { useState } from 'react';
import { useToast } from '../services/ToastContext';
import { useLanguage } from '../services/LanguageContext';

function Contact() {
  const { showToast } = useToast();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  // handle change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // validate
  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.lastName.trim()) newErrors.lastName = 'Required';

    if (!form.email) {
      newErrors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!form.phone) newErrors.phone = 'Required';

    if (!form.message) newErrors.message = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log('Form:', form);

    showToast('Message sent successfully!', 'success');

    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      message: '',
    });
  };

  return (
    <div className="contact">

      <div className="contact-container">
        <h1>{t.contact_title || 'Contact Us'}</h1>

        <form onSubmit={handleSubmit} className="contact-form">

          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span>{errors.firstName}</span>}
          </div>

          <div className="form-row">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>

          <div className="form-row">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <span>{errors.phone}</span>}
          </div>

          <div className="form-row">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <textarea
              name="message"
              placeholder="Message..."
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <span>{errors.message}</span>}
          </div>

          <button type="submit" className="btn-submit">
            Send Message
          </button>

        </form>
      </div>

    </div>
  );
}

export default Contact;