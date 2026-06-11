interface MarqueeProps {
  items: string[];
}

/**
 * Infinite stack ticker. Each track holds the items twice so a single track
 * is wider than any viewport; the animation shifts one full track width,
 * keeping the loop seamless on wide screens and under browser zoom.
 *
 * Both animated tracks are aria-hidden (the doubled content would be read
 * twice); screen readers get a visually-hidden list of the originals.
 * Under prefers-reduced-motion the CSS turns the first track into a static
 * wrapping row and hides the duplicate.
 */
const Marquee = ({ items }: MarqueeProps) => {
  const track = () => (
    <div className="fl-marquee-track" aria-hidden="true">
      {items.map((item) => (
        <span key={item} className="fl-marquee-item">
          {item}
        </span>
      ))}
      {items.map((item) => (
        <span key={`${item}-dupe`} className="fl-marquee-item is-dupe">
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="fl-marquee">
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {track()}
      {track()}
    </div>
  );
};

export default Marquee;
