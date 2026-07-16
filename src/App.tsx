import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import { PANELS, clampCamera, fitPanel, fittedScale, resetCamera, zoomAtPointer, type CameraState, type PanelId } from './board';
import TubeVortex from './components/TubeVortex';
import YoutubeEmbed from './components/YoutubeEmbed';
import MagneticButton from './components/MagneticButton';
import { certifications, contact, education, experience, faltaUno, heroContent, projects, skills, ui, type LanguageKey } from './data/profile';
import { useGithubProjects } from './hooks/useGithubProjects';
import { iconFor } from './data/techIcons';

const GITHUB = 'Riloox';
const panelById = Object.fromEntries(PANELS.map(p => [p.id, p]));
const interactive = (target: EventTarget | null) => target instanceof Element && !!target.closest('a,button,iframe,input,textarea,select,[data-no-camera]');

const FocusGlyph = () => <svg className="focus-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>;

function PortfolioPanel({ id, title, children, className = '' }: { id: PanelId; title: string; children: React.ReactNode; className?: string }) {
  const p = panelById[id];
  return <section id={id} data-panel={id} tabIndex={0} aria-label={title} className={`panel panel-${id} ${className}`} style={{ left: p.x, top: p.y, width: p.width, height: p.height }}>
    <header className="panel-chrome"><span className="coord">{p.coordinate}</span><b className="ptitle">{title}</b><span className="focus-btn" aria-hidden="true"><FocusGlyph /></span></header>{children}
  </section>;
}

function SkillIcon({ label }: { label: string }) {
  const cls = iconFor(label);
  return <li className="skill-chip">{cls ? <i className={cls} aria-hidden="true" /> : <span className="skill-dot" aria-hidden="true" />}<span>{label}</span></li>;
}

function ScrambleText({ children }: { children: string }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(children);
  useEffect(() => {
    if (reduced) { setValue(children); return; }
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let frame = 0;
    const timer = window.setInterval(() => {
      frame++;
      setValue(children.split('').map((letter, i) => letter === ' ' || i < frame / 2 ? letter : glyphs[Math.floor(Math.random() * glyphs.length)]).join(''));
      if (frame >= children.length * 2) window.clearInterval(timer);
    }, 28);
    return () => window.clearInterval(timer);
  }, [children, reduced]);
  return <>{value}</>;
}

export default function App() {
  const language: LanguageKey = 'en';
  const [camera, setCamera] = useState<CameraState>(resetCamera);
  const [copied, setCopied] = useState(false);
  const [dockOpen, setDockOpen] = useState(true);
  const [legendOpen, setLegendOpen] = useState(true);
  const [viewport, setViewport] = useState({ width: innerWidth, height: innerHeight });
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; camera: CameraState; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const reduced = useReducedMotion();
  const repos = useGithubProjects(GITHUB, { limit: 6, excludeNames: ['picadito', 'freecam', 'personalWebpage'] });
  const h = heroContent[language], fu = faltaUno[language], exp = experience[language][0], [cleta, freecam] = projects[language], cert = certifications[language], copy = ui[language], me = contact[language];

  useEffect(() => { document.documentElement.lang = 'en'; }, []);
  useEffect(() => { const resize = () => { const v = { width: innerWidth, height: innerHeight }; setViewport(v); setCamera(c => clampCamera(c, v)); }; addEventListener('resize', resize); return () => removeEventListener('resize', resize); }, []);
  const moveCamera = useCallback((next: CameraState) => {
    if (reduced) { setCamera(next); return; }
    const from = camera; animate(0, 1, { duration: .55, ease: [.22, 1, .36, 1], onUpdate: v => setCamera({ x: from.x + (next.x - from.x) * v, y: from.y + (next.y - from.y) * v, scale: from.scale + (next.scale - from.scale) * v, focusedPanel: next.focusedPanel }) });
  }, [camera, reduced]);
  const focusPanel = useCallback((id: PanelId) => moveCamera({ ...fitPanel(panelById[id], viewport), focusedPanel: id }), [moveCamera, viewport]);
  const reset = useCallback(() => moveCamera(resetCamera()), [moveCamera]);

  useEffect(() => { const key = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Home' || e.key === '0') { e.preventDefault(); reset(); } else if (e.key === '+' || e.key === '=') setCamera(c => zoomAtPointer(c, c.scale * 1.18, { x: viewport.width / 2, y: viewport.height / 2 }, viewport)); else if (e.key === '-' || e.key === '_') setCamera(c => zoomAtPointer(c, c.scale / 1.18, { x: viewport.width / 2, y: viewport.height / 2 }, viewport)); } ; addEventListener('keydown', key); return () => removeEventListener('keydown', key); }, [reset, viewport]);
  const fit = fittedScale(viewport);
  const transform = `translate(calc(-50% + ${camera.x}px), calc(-50% + ${camera.y}px)) scale(${fit * camera.scale})`;

  const copyEmail = async () => { try { await navigator.clipboard.writeText(me.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { location.href = `mailto:${me.email}`; } };
  return <main className="world"
    onClick={e => { if (suppressClick.current) { suppressClick.current = false; return; } if (interactive(e.target)) return; const panel = (e.target as Element).closest<HTMLElement>('[data-panel]'); const id = panel?.dataset.panel as PanelId | undefined; if (id) { if (camera.focusedPanel === id) reset(); else focusPanel(id); } }}
    onFocusCapture={e => { const panel = (e.target as Element).matches('[data-panel]') ? e.target as HTMLElement : null; const id = panel?.dataset.panel as PanelId | undefined; if (id && viewport.width >= 1024) focusPanel(id); }}
    onPointerMove={e => { pointer.current = { x: e.clientX / innerWidth * 2 - 1, y: e.clientY / innerHeight * 2 - 1 }; if (drag.current) { const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y; if (!drag.current.moved && Math.hypot(dx, dy) >= 5) drag.current.moved = true; if (drag.current.moved) setCamera(clampCamera({ ...drag.current.camera, x: drag.current.camera.x + dx, y: drag.current.camera.y + dy, focusedPanel: null }, viewport)); } }}
    onPointerDown={e => { if (!interactive(e.target)) { e.preventDefault(); suppressClick.current = false; drag.current = { x: e.clientX, y: e.clientY, camera, moved: false }; } }}
    onPointerUp={() => { suppressClick.current = !!drag.current?.moved; drag.current = null; }}
    onWheel={e => { if (e.ctrlKey || e.metaKey || interactive(e.target)) return; e.preventDefault(); setCamera(c => zoomAtPointer(c, c.scale * Math.exp(-e.deltaY * .001), { x: e.clientX, y: e.clientY }, viewport)); }}>
    <a className="skip" href="#identity">Skip to content</a>
    <TubeVortex pointer={pointer} />
    <div className="board" style={{ transform }}>
      <PortfolioPanel id="identity" title="IDENTITY"><div className="panel-content hero"><p className="eyebrow">{h.kicker}</p><h1><span><ScrambleText>{h.firstName}</ScrambleText></span><ScrambleText>{h.lastName}</ScrambleText></h1><p>{h.summary}</p><div className="ticker">{h.marquee.join(' · ')}</div></div></PortfolioPanel>
      <PortfolioPanel id="falta-uno" title={copy.featured.toUpperCase()} className="featured"><div className="panel-content"><p className="eyebrow">01 / LIVE SYSTEM</p><h2>{fu.name}</h2><h3>{fu.tagline}</h3><p>{fu.description}</p><div className="stats">{fu.stats.map(s => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div><ul>{fu.features.map(x => <li key={x}>{x}</li>)}</ul><div className="tags">{fu.stack.map(x => <span key={x}>{x}</span>)}</div><MagneticButton className="action" href={fu.links.demo} target="_blank" rel="noreferrer">{copy.liveDemo} ↗</MagneticButton></div></PortfolioPanel>
      <PortfolioPanel id="experience" title={copy.sections.experience.toUpperCase()}><div className="panel-content"><h2>{exp.company}</h2><h3>{exp.role}</h3><p className="meta">{exp.duration}</p><ul>{exp.highlights.map(x => <li key={x}>{x}</li>)}</ul></div></PortfolioPanel>
      <PortfolioPanel id="freecam" title="FREECAM"><div className="panel-content project"><p className="eyebrow">02 / JAVA MOD</p><h2>{freecam.name}</h2><h3>{freecam.tagline}</h3><p>{freecam.description}</p><div className="tags">{freecam.stack.map(x => <span key={x}>{x}</span>)}</div><div className="links"><a href={freecam.links?.download} target="_blank" rel="noreferrer">{copy.downloadPage} ↗</a><a href={freecam.links?.repo} target="_blank" rel="noreferrer">GitHub ↗</a></div></div></PortfolioPanel>
      <PortfolioPanel id="cleta" title="CLETA"><div className="panel-content project cleta-grid"><div><p className="eyebrow">03 / UTEC CAPSTONE</p><h2>{cleta.name}</h2><h3>{cleta.tagline}</h3><p>{cleta.description}</p><ul>{cleta.highlights.map(x => <li key={x}>{x}</li>)}</ul><div className="tags">{cleta.stack.map(x => <span key={x}>{x}</span>)}</div></div>{cleta.links?.video && <YoutubeEmbed url={cleta.links.video} title="Cleta demo" />}</div></PortfolioPanel>
      <PortfolioPanel id="skills" title={copy.sections.skills.toUpperCase()}><div className="panel-content skill-grid">{skills[language].groups.map(g => <div className="skill-group" key={g.group}><h3>{g.group}</h3><ul className="skill-items">{g.items.map(it => <SkillIcon key={it} label={it} />)}</ul></div>)}</div></PortfolioPanel>
      <PortfolioPanel id="education" title={copy.sections.education.toUpperCase()}><div className="panel-content education">{education[language].map(x => <article key={x.school}><h3>{x.school}</h3><p>{x.degree}</p><small>{x.duration}</small></article>)}<h3>{cert.certLabel}</h3>{cert.certs.map(x => <p className="cert" key={x}>↳ {x}</p>)}<h3>{cert.langLabel}</h3>{cert.languages.map(x => <p key={x.name}>{x.name} <b>{x.level}</b></p>)}</div></PortfolioPanel>
      <PortfolioPanel id="github" title="GITHUB / 06"><div className="panel-content repo-list">{repos.loading && Array.from({ length: 6 }, (_, i) => <div className="repo skeleton" key={i} />)}{repos.error && <a className="action" href={`https://github.com/${GITHUB}`}>Open GitHub ↗</a>}{repos.repos.map(r => <a className="repo" href={r.html_url} target="_blank" rel="noreferrer" key={r.id}><b>{r.name}</b><span>{r.description || 'No description'}</span><small>{r.language || 'Code'} · ★{r.stargazers_count}</small></a>)}</div></PortfolioPanel>
      <PortfolioPanel id="contact" title={copy.sections.contact.toUpperCase()}><div className="panel-content contact"><p>{me.blurb}</p><button className="email" onClick={copyEmail}>{copied ? copy.copied : me.email}</button><div className="social">{me.social.map(x => <a key={x.label} href={x.url} target="_blank" rel="noreferrer">{x.label} ↗</a>)}</div><small>{me.responseTime}</small></div></PortfolioPanel>
    </div>
    <div className={`zoom-dock${dockOpen ? '' : ' collapsed'}`} role="group" aria-label="Camera controls">
      <div className="zd-panel">
        <button className="zd-btn" aria-label="Zoom out" onClick={() => setCamera(c => zoomAtPointer(c, c.scale / 1.2, { x: viewport.width / 2, y: viewport.height / 2 }, viewport))}>−</button>
        <button className="zd-home" aria-label="Reset view" onClick={reset}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 11.5 12 4l8.5 7.5" /><path d="M6 10.5V20h12v-9.5" /></svg></button>
        <button className="zd-btn" aria-label="Zoom in" onClick={() => setCamera(c => zoomAtPointer(c, c.scale * 1.2, { x: viewport.width / 2, y: viewport.height / 2 }, viewport))}>+</button>
      </div>
      <button className="zd-toggle" aria-label={dockOpen ? 'Hide camera controls' : 'Show camera controls'} aria-expanded={dockOpen} onClick={() => setDockOpen(o => !o)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg></button>
    </div>
    <div className={`hud-legend${legendOpen ? '' : ' collapsed'}`}>
      <svg className="mouse" viewBox="0 0 26 42" aria-hidden="true"><rect x="1.5" y="1.5" width="23" height="39" rx="11.5" /><circle className="wheel" cx="13" cy="11" r="2.4" /></svg>
      <ul aria-hidden="true">
        <li><b>scroll</b><span>zoom</span></li>
        <li><b>click</b><span>zoom to panel</span></li>
        <li><b>drag</b><span>pan</span></li>
      </ul>
      <button className="hl-toggle" aria-label={legendOpen ? 'Hide controls legend' : 'Show controls legend'} aria-expanded={legendOpen} onClick={() => setLegendOpen(o => !o)}>
        {legendOpen
          ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 8h8M9 12h8M9 16h5" /></svg>}
      </button>
    </div>
  </main>;
}
