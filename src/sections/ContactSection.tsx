import { contact, type LanguageKey } from '../data/profile';
import Prompt from '../components/Prompt';

interface ContactSectionProps {
  language: LanguageKey;
}

const ContactSection = ({ language }: ContactSectionProps) => {
  const contactInfo = contact[language];

  return (
    <section className="dos-section" id="contact">
      <Prompt path="~/contact" cmd="./connect.sh" />
      <p className="dos-highlight">{contactInfo.blurb}</p>
      <p>
        {contactInfo.emailLabel.toUpperCase()}:{' '}
        <a className="dos-link" href={`mailto:${contactInfo.email}`}>
          {contactInfo.email}
        </a>
      </p>
      <ul className="dos-list">
        {contactInfo.social.map((social) => (
          <li key={social.label}>
            {social.label.toUpperCase()}:{' '}
            <a className="dos-link" href={social.url} target="_blank" rel="noreferrer">
              {social.url}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ContactSection;
