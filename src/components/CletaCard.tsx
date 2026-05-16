import GlassCard from './GlassCard';
import YoutubeEmbed from './YoutubeEmbed';
import type { ProjectLink } from '../data/profile';

interface CletaCardProps {
  name: string;
  stack: string;
  links?: ProjectLink;
  delay?: number;
}

const CletaCard = ({ name, stack, links, delay = 0 }: CletaCardProps) => {
  const shortTitle = name.split('—')[0].trim();
  return (
    <GlassCard span="xl" delay={delay} className="cleta-card" hoverLift={false}>
      {links?.video && <YoutubeEmbed url={links.video} title={name} />}
      <div className="cleta-meta">
        <div className="cleta-title">{shortTitle}</div>
        <div className="cleta-sub">{stack}</div>
      </div>
    </GlassCard>
  );
};

export default CletaCard;
