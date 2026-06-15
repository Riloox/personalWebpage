import { useEffect, useRef, useState } from 'react';

import Reveal from '../components/Reveal';
import { contact, cvFiles, ui, type LanguageKey } from '../data/profile';

interface ContactSectionProps {
  language: LanguageKey;
}

const ContactSection = ({ language }: ContactSectionProps) => {
  const t = ui[language];
  const data = contact[language];
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${data.email}`;
    }
  };

  return (
    <footer className="fl-contact" id="contact" aria-label={t.sections.contact}>
      <div className="fl-shell fl-contact-inner">
        <Reveal>
          <p className="fl-contact-kicker">{t.sections.contact}</p>
          <a
            className="fl-talk"
            href={`mailto:${data.email}`}
            aria-label={`${t.letsTalk} — ${t.emailMe}: ${data.email}`}
          >
            {t.letsTalk}
          </a>
          <p className="fl-contact-blurb">{data.blurb}</p>
          <div className="fl-contact-row">
            <a
              className="fl-btn fl-btn-primary"
              href={`mailto:${data.email}`}
              aria-label={`${t.emailMe}: ${data.email}`}
            >
              {data.email}
            </a>
            <button className="fl-btn fl-btn-ghost" type="button" onClick={copyEmail}>
              {copied ? t.copied : t.copyEmail}
            </button>
            <a className="fl-btn fl-btn-ghost" href={cvFiles[language]} target="_blank" rel="noreferrer">
              {t.downloadCv}
            </a>
          </div>
          <div className="fl-socials">
            {data.social.map((social) => (
              <a key={social.label} className="fl-social" href={social.url} target="_blank" rel="noreferrer">
                {social.label}
                <span className="arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Reveal>
        <div className="fl-footer">
          <span>© {new Date().getFullYear()} Federico Prunell — Montevideo, UY</span>
          <span>{t.footerNote}</span>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
