import { contact, type LanguageKey } from '../data/profile';

interface ContactSectionProps {
  language: LanguageKey;
}

const ContactSection = ({ language }: ContactSectionProps) => {
  const contactInfo = contact[language];

  return (
    <section className="dos-section" id="contact">
      <p className="dos-line">fprunell@portfolio:~/contact$ ./connect.sh</p>
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
