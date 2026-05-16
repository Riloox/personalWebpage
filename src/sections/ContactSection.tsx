import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { contact, type LanguageKey } from '../data/profile';

interface ContactSectionProps {
  language: LanguageKey;
}

const TITLE: Record<LanguageKey, string> = {
  en: 'Get in touch',
  es: 'Conversemos',
};

const COPY_LABELS: Record<LanguageKey, { idle: string; copied: string }> = {
  en: { idle: 'Copy email', copied: 'Copied ✓' },
  es: { idle: 'Copiar correo', copied: 'Copiado ✓' },
};

const ContactSection = ({ language }: ContactSectionProps) => {
  const c = contact[language];
  const t = TITLE[language];
  const copy = COPY_LABELS[language];
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
    <GlassCard span="xl" id="contact" className="section-block contact-block" hoverLift={false}>
      <h2 className="section-title">{t}</h2>
      <p className="display contact-email">{c.email}</p>
      <p className="contact-blurb">{c.blurb}</p>
      <div className="contact-actions">
        <button type="button" className="btn btn-primary" onClick={handleCopy}>
          {copied ? copy.copied : copy.idle}
        </button>
        <a className="btn btn-secondary" href={`mailto:${c.email}`}>
          {c.emailLabel}
        </a>
      </div>
      <div className="contact-social">
        {c.social.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <p className="contact-response">{c.responseTime}</p>
    </GlassCard>
  );
};

export default ContactSection;
