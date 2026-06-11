import Reveal from './Reveal';

interface SectionHeadProps {
  index: string;
  title: string;
  sub?: string;
}

const SectionHead = ({ index, title, sub }: SectionHeadProps) => (
  <Reveal>
    <div className="fl-section-head">
      <span className="fl-section-index">{index} /</span>
      <h2 className="fl-section-title">{title}</h2>
      {sub ? <p className="fl-section-sub">{sub}</p> : null}
    </div>
  </Reveal>
);

export default SectionHead;
