import { contact } from '../data/profile';

const ContactSection = () => (
  <section className="dos-section" id="contact">
    <p className="dos-line">fprunell@portfolio:~/contact$ ./connect.sh</p>
    <p className="dos-highlight">Let's talk about how I can help ship your next release.</p>
    <p>EMAIL: <a className="dos-link" href={`mailto:${contact.email}`}>{contact.email}</a></p>
    <ul className="dos-list">
      {contact.social.map((social) => (
        <li key={social.label}>
          {social.label.toUpperCase()}: <a className="dos-link" href={social.url} target="_blank" rel="noreferrer">{social.url}</a>
        </li>
      ))}
    </ul>
  </section>
);

export default ContactSection;
