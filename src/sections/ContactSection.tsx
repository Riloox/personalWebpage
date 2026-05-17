import { useState } from 'react';
import { contact, type LanguageKey } from '../data/profile';

interface ContactSectionProps {
  language: LanguageKey;
}

const COPY: Record<
  LanguageKey,
  { label: string; title: string; idle: string; copied: string }
> = {
  en: { label: 'Contact', title: 'Get in touch', idle: 'Copy email', copied: 'Copied ✓' },
  es: { label: 'Contacto', title: 'Conversemos', idle: 'Copiar correo', copied: 'Copiado ✓' },
};

const ContactSection = ({ language }: ContactSectionProps) => {
  const c = contact[language];
  const t = COPY[language];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(c.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${c.email}`;
    }
  };

  return (
    <section id="contact" className="ed-section">
      <p className="ed-eyebrow">{t.label}</p>
      <h2 className="ed-section-title">{t.title}</h2>

      <p className="ed-contact-email">
        <a href={`mailto:${c.email}`}>{c.email}</a>
      </p>

      <p className="ed-summary">{c.blurb}</p>

      <div className="ed-ctas">
        <button type="button" className="ed-btn ed-btn-primary" onClick={handleCopy}>
          {copied ? t.copied : t.idle}
        </button>
        <a className="ed-btn ed-btn-ghost" href={`mailto:${c.email}`}>
          {c.emailLabel}
        </a>
      </div>

      <p className="ed-contact-social">
        {c.social.map((s, i) => (
          <span key={s.label}>
            {i > 0 && <span className="ed-contact-sep">·</span>}
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          </span>
        ))}
      </p>

      <p className="ed-contact-response">{c.responseTime}</p>
    </section>
  );
};

export default ContactSection;
