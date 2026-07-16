import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Domain-warped fractal-noise "ooze": slow writhing acid-green sludge with
// scanlines + grain for that doomed / Cruelty Squad grime. Reacts to pointer.
const VERT = /* glsl */ `
  void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform vec2 uRes; uniform float uTime; uniform vec2 uPointer;

  float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i+vec2(1,0)), c = hash(i+vec2(0,1)), d = hash(i+vec2(1,1));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, amp = 0.5;
    for(int i=0;i<5;i++){ v += amp*noise(p); p *= 2.02; amp *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
    float t = uTime * 0.06;
    vec2 warp = uv*1.6 + uPointer*0.25;
    // two-stage domain warp -> oily tendrils
    vec2 q = vec2(fbm(warp + vec2(0.0, t)), fbm(warp + vec2(5.2, -t)));
    vec2 r = vec2(fbm(warp + 3.5*q + vec2(1.7, 9.2) + t*0.5), fbm(warp + 3.5*q + vec2(8.3, 2.8) - t*0.5));
    float f = fbm(warp + 2.4*r);

    vec3 dark  = vec3(0.012, 0.023, 0.016);
    vec3 mid   = vec3(0.043, 0.278, 0.145);
    vec3 acid  = vec3(0.165, 1.000, 0.498);
    vec3 col = mix(dark, mid, smoothstep(0.08, 0.62, f));
    col = mix(col, acid, smoothstep(0.55, 0.9, f) * (0.45 + 0.55*r.x));
    // filaments: thin bright veins where the warp folds
    float vein = smoothstep(0.035, 0.0, abs(q.x - q.y) - 0.02);
    col += acid * vein * 0.45;

    // grime: scanlines + grain + vignette
    col *= 0.88 + 0.12*sin(gl_FragCoord.y*1.4);
    col += (hash(gl_FragCoord.xy + t) - 0.5) * 0.05;
    col *= 1.0 - 0.32*dot(uv,uv);

    gl_FragColor = vec4(max(col, 0.0), 1.0);
  }
`;

export default function TubeVortex({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // A renderer can exist even when the browser subsequently blocks WebGL.
    // Keep the CSS fallback visible until a valid frame is produced.
    el.dataset.failed = 'true';
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' }); } catch { el.dataset.failed = 'true'; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = { uRes: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 }, uPointer: { value: new THREE.Vector2(0, 0) } };
    const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, depthTest: false, depthWrite: false });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    let running = !document.hidden, raf = 0, px = 0, py = 0, start = performance.now();
    const resize = () => { const r = el.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); uniforms.uRes.value.set(r.width * renderer.getPixelRatio(), r.height * renderer.getPixelRatio()); };
    const observer = new ResizeObserver(resize); observer.observe(el); resize();
    const onContextLost = (event: Event) => {
      event.preventDefault();
      el.dataset.failed = 'true';
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    let firstFrame = true;
    const render = () => {
      if (!running) return;
      px += (pointer.current.x - px) * 0.04; py += (pointer.current.y - py) * 0.04;
      uniforms.uPointer.value.set(px, -py);
      uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        const gl = renderer.getContext();
        if (gl.getError() === gl.NO_ERROR) delete el.dataset.failed;
      }
      raf = requestAnimationFrame(render);
    };
    const visibility = () => { running = !document.hidden; cancelAnimationFrame(raf); if (running) { start = performance.now() - uniforms.uTime.value * 1000; raf = requestAnimationFrame(render); } };
    document.addEventListener('visibilitychange', visibility); raf = requestAnimationFrame(render);
    return () => { running = false; cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', visibility); observer.disconnect(); renderer.domElement.removeEventListener('webglcontextlost', onContextLost); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, [pointer]);
  return <div className="vortex" ref={host} aria-hidden="true" />;
}
