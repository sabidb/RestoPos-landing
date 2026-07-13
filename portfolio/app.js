'use strict';

/* ============================================================
   db.dev — DB Labs portfolio
   Redesigned main page: React 18 + Framer Motion + htm,
   fully self-contained (no build step, libraries vendored).
   ============================================================ */

/* ---------- constants / data ---------- */
const OWNER_EMAIL = 'hello@dbdev.io';
const WHATSAPP_NUMBERS = { sa: '966538360053', in: '918848095603' };
const RESTOPOS_URL = 'https://resto-pos-landing.vercel.app/';

const WORK_ITEMS = [
  { id: 'restopos', n: '01', name: 'Restopos', initials: 'RP', accent: '#C1663D', link: RESTOPOS_URL, external: true,
    tagline: 'POS & VAT compliance for Saudi retail',
    blurb: 'Billing and point-of-sale for Saudi stores — checkout, automatic VAT, ZATCA e-invoices and government-ready tax reports.',
    tags: ['POS', 'ZATCA', 'VAT'],
    detail: 'Restopos is billing and point-of-sale software built for local Saudi stores. It handles day-to-day checkout and invoicing, then automatically calculates VAT on every sale, generates ZATCA-compliant e-invoices, and compiles the periodic tax reports a business submits to the government — so owners stay compliant without manual bookkeeping.',
    bullets: ['Fast in-store checkout and invoice generation', 'Automatic VAT on every transaction (ZATCA rules)', 'Government-ready tax reports on a schedule', 'Sales, inventory and daily revenue dashboards'],
    results: ['ZATCA Phase-2 compliant', '2 live restaurants', '<10 min to first invoice'] },
  { id: 'agent', n: '02', name: 'DB Agent', initials: 'DB', accent: '#6A93C7', link: './projects/db-agent/',
    tagline: 'Backend automation for repetitive work',
    blurb: 'A personal automation agent that syncs data, processes orders and forms, and fires notifications — running unattended.',
    tags: ['Automation', 'Node', 'Integrations'],
    detail: 'A backend automation agent that takes over repetitive operational work — syncing data between tools, processing incoming orders or forms, and triggering the right notifications — so teams stop doing it by hand.',
    bullets: ['Connects and syncs data across existing tools', 'Processes orders/forms on a schedule or trigger', 'Automatic notifications to staff and customers', 'Runs unattended with error alerts'],
    results: ['Runs 24/7', 'Zero manual syncing', 'Fully hosted'] },
  { id: 'baloot', n: '03', name: 'Baloot', initials: 'BL', accent: '#C89B3C', link: './projects/baloot/',
    tagline: 'Real-time multiplayer card game',
    blurb: 'A mobile multiplayer take on the Gulf classic — live matchmaking, a full rules engine, private tables and invites.',
    tags: ['Realtime', 'Multiplayer', 'Game'],
    detail: 'Baloot is a mobile multiplayer card game built around the traditional Gulf card game, with real-time matchmaking so friends and strangers can play together instantly.',
    bullets: ['Real-time multiplayer with live matchmaking', 'Full Baloot rules engine with scoring and bidding', 'Mobile-first interface for quick sessions', 'Friend invites and private table codes'],
    results: ['Real-time rooms', 'Full rules engine', 'PWA-installable'] },
  { id: 'mathbro', n: '04', name: 'Mathbro', initials: 'MB', accent: '#6FA88A', link: './projects/mathbro/',
    tagline: 'Gamified math practice for kids',
    blurb: 'Math practice that plays like a game — levels, rewards and a parent progress view, working even offline.',
    tags: ['EdTech', 'Gamified', 'Kids'],
    detail: 'Mathbro turns math practice into a game — kids solve problems to progress through levels and earn rewards, while parents get a simple view of progress over time.',
    bullets: ['Level-based challenges tuned to grade levels', 'Reward and progress system to keep kids motivated', 'Parent-facing progress view', 'Works offline for practice anywhere'],
    results: ['Offline-ready', 'Parent dashboard', 'Level system'] },
  { id: 'site', n: '05', name: 'Web Studio', initials: 'WS', accent: '#8E7CC3', link: './projects/web-studio/',
    tagline: 'Fast custom sites for founders',
    blurb: 'Custom personal and business sites, coded from scratch to match the brand — fast, SEO-clean and easy to hand off.',
    tags: ['Web', 'SEO', 'Design'],
    detail: 'A fast, custom-built personal or business website — designed and coded from scratch to match the brand, optimized for speed and search, and easy to hand off or update after launch.',
    bullets: ['Custom design matched to the brand', 'Built for speed and clean SEO', 'Contact/booking forms wired up', 'Simple handoff for future updates'],
    results: ['48-hour quote', 'SEO-clean', 'Easy handoff'] },
  { id: 'social', n: '06', name: 'DB Social', initials: 'SM', accent: '#E2604A', link: './projects/social/',
    tagline: 'Content systems for client accounts',
    blurb: 'Ongoing content systems — planning, automated publishing and reporting, so accounts stay consistent without daily effort.',
    tags: ['Content', 'Scheduling', 'Analytics'],
    detail: "Ongoing content systems and scheduling tools for client social accounts — planning posts, automating publishing, and reporting on what's working, so clients get consistent output without doing it manually every day.",
    bullets: ['Content calendar and cross-platform scheduling', 'Automated publishing pipeline', 'Reach and engagement reporting', 'Reusable templates for recurring posts'],
    results: ['Consistent output', 'Automated publishing', 'Performance reports'] },
];

// NOTE (DB): testimonials + social links below are editable placeholders — swap in your real quotes/handles.
const TESTIMONIALS = [
  { quote: 'DB set up our POS and VAT invoicing in days, not weeks. Every bill is compliant now and closing the day takes minutes.', name: 'Owner', role: 'Broast Al-Bahr', initials: 'BB', accent: '#C1663D' },
  { quote: 'The site and booking flow he built for us just works — fast, clean, and exactly on brand. Handoff was painless.', name: 'Founder', role: 'Sweet Cinnamon', initials: 'SC', accent: '#8E7CC3' },
  { quote: 'From a rough idea to a live product with real-time multiplayer — DB shipped the whole thing end to end.', name: 'Product Lead', role: 'Baloot Al-Mamlaka', initials: 'BM', accent: '#C89B3C' },
];
const TRUST_LOGOS = ['Broast Al-Bahr', 'Sweet Cinnamon', 'Baloot Al-Mamlaka', 'RestoPOS'];
const PROCESS = [
  { n: '01', title: 'Discovery', body: 'We talk through the problem, your users and constraints — then scope a fixed quote within 48 hours.', icon: '🧭' },
  { n: '02', title: 'Design', body: 'Wireframes and a clickable direction so we agree on the look and flow before a line of code.', icon: '✏️' },
  { n: '03', title: 'Build', body: 'I build it end to end — frontend, backend and integrations — with progress you can watch.', icon: '⚙️' },
  { n: '04', title: 'Launch', body: 'We ship, test on real devices, and I hand off clean docs so your team can run it.', icon: '🚀' },
];
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/sabidb', abbr: 'GH' },
  { label: 'LinkedIn', href: '#', abbr: 'in' },
  { label: 'X', href: '#', abbr: 'X' },
];

const SKILLS = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Framer Motion', 'Stripe', 'Git', 'Figma'];
const MARQUEE = ['POS Systems', 'Automation Agents', 'Multiplayer Games', 'Custom Websites', 'Social Systems', 'ZATCA E-Invoicing'];
const STATS = [
  { to: 6, suffix: '', label: 'Projects shipped' },
  { to: 5, suffix: '', label: 'Live microsites' },
  { to: 2, suffix: '', label: 'Countries served' },
  { to: 100, suffix: '%', label: 'Custom-built' },
];

/* ---------- palette ---------- */
const C = {
  cream: '#F8F4EF', navy: '#131F35', navy2: '#17233A', ink: '#0E1A2E',
  terra: '#C1663D', terra2: '#E2A184', blue: '#6A93C7', slate: '#9FB3CE',
  green: '#6FA88A',
};

/* ---------- loader data (the React Loader component is defined lower) ---------- */
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const LOADER_MS = reduceMotion ? 1200 : 10000;

// Boot-log steps — each flips to "done" as the progress bar passes its threshold.
const BOOT_STEPS = [
  { at: 7, label: 'Booting DB Labs runtime', detail: 'core.init()' },
  { at: 19, label: 'Loading React 18 + Framer Motion', detail: 'engine.mount()' },
  { at: 32, label: 'Mounting client projects', detail: '6 loaded' },
  { at: 46, label: 'Linking live microsites', detail: 'restopos · baloot · agent · +3' },
  { at: 60, label: 'Wiring contact channels', detail: 'whatsapp · email' },
  { at: 73, label: 'Compiling scroll animations', detail: 'framer-motion' },
  { at: 85, label: 'Optimizing assets & fonts', detail: 'jetbrains-mono' },
  { at: 95, label: 'Finalizing interface', detail: 'ready' },
];
const BOOT_TECH = ['React', 'Framer Motion', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'];

/* ============================================================
   React app
   ============================================================ */
const { useState, useRef, useEffect } = React;
const {
  motion, AnimatePresence, useScroll, useTransform, useSpring,
  useMotionValue, useMotionValueEvent, useInView,
} = window.Motion;
const html = window.htm.bind(React.createElement);
const M = motion;

const EASE = [0.22, 1, 0.36, 1];
const mono = "'JetBrains Mono', monospace";

/* --- Reveal-on-scroll wrapper --- */
function Reveal({ children, y = 42, delay = 0, style, className }) {
  return html`<${M.div}
    className=${className}
    initial=${{ opacity: 0, y }}
    whileInView=${{ opacity: 1, y: 0 }}
    viewport=${{ once: true, margin: '-70px' }}
    transition=${{ duration: 0.7, delay, ease: EASE }}
    style=${style}>${children}<//>`;
}

/* --- count-up number that fires when scrolled into view --- */
function CountUp({ to, suffix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setN(to); return; }
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / (duration * 1000));
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return html`<span ref=${ref}>${n}${suffix}</span>`;
}

/* ---------------- signature motion: cursor, grain, magnetic, split text, back-to-top ---------------- */
function CursorFX() {
  const dotRef = useRef(null), ringRef = useRef(null);
  useEffect(() => {
    if (reduceMotion || !window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    document.body.classList.add('has-cursor');
    const dot = dotRef.current, ring = ringRef.current;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf;
    const move = (e) => { mx = e.clientX; my = e.clientY; if (dot) dot.style.transform = `translate(${mx}px,${my}px)`; };
    const hit = (t) => t && t.closest && t.closest('a,button,[data-cursor]');
    const over = (e) => { if (hit(e.target) && ring) ring.classList.add('cursor-hover'); };
    const out = (e) => { if (hit(e.target) && ring) ring.classList.remove('cursor-hover'); };
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; if (ring) ring.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
    loop();
    window.addEventListener('pointermove', move);
    document.addEventListener('mouseover', over); document.addEventListener('mouseout', out);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move); document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out); document.body.classList.remove('has-cursor'); };
  }, []);
  return html`<${React.Fragment}><div ref=${dotRef} className="cursor-dot"></div><div ref=${ringRef} className="cursor-ring"></div><//>`;
}

const NOISE_URL = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
function Grain() {
  return html`<div aria-hidden="true" style=${{ position: 'fixed', inset: 0, zIndex: 350, pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay', backgroundImage: NOISE_URL, backgroundSize: '160px 160px' }} />`;
}

function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 720));
  return html`<${AnimatePresence}>${show && html`<${M.button} key="btt"
    onClick=${() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" data-cursor="1"
    initial=${{ opacity: 0, y: 18 }} animate=${{ opacity: 1, y: 0 }} exit=${{ opacity: 0, y: 18 }} whileHover=${{ y: -3 }} whileTap=${{ scale: 0.92 }}
    style=${{ position: 'fixed', right: 24, bottom: 24, zIndex: 80, width: 46, height: 46, borderRadius: 12, border: '1px solid rgba(248,244,239,0.2)', background: 'rgba(19,31,53,0.82)', backdropFilter: 'blur(8px)', color: C.terra2, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↑<//>`}<//>`;
}

function Magnetic({ children, strength = 0.4 }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  if (reduceMotion) return children;
  const move = (e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - (r.left + r.width / 2)) * strength); y.set((e.clientY - (r.top + r.height / 2)) * strength); };
  const leave = () => { x.set(0); y.set(0); };
  return html`<${M.div} ref=${ref} onMouseMove=${move} onMouseLeave=${leave} style=${{ x, y, display: 'inline-flex' }}>${children}<//>`;
}

// Per-character reveal for the hero headline; segments carry their own colors.
// Letters animate individually but words never break across lines.
function SplitReveal({ segments, style }) {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.022, delayChildren: 0.15 } } };
  const ch = { hidden: { opacity: 0, y: '0.55em' }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };
  let k = 0;
  const letter = (c, color) => html`<${M.span} key=${k++} variants=${ch} style=${{ display: 'inline-block', color }}>${c}<//>`;
  const renderText = (t, color) => (t.match(/\s+|\S+/g) || []).map((tok) =>
    /^\s+$/.test(tok)
      ? html`<${M.span} key=${k++} variants=${ch} style=${{ display: 'inline-block', whiteSpace: 'pre', color }}>${tok}<//>`
      : html`<span key=${k++} style=${{ display: 'inline-block', whiteSpace: 'nowrap' }}>${Array.from(tok).map((c) => letter(c, color))}</span>`);
  return html`<${M.h1} variants=${container} initial="hidden" animate="show" style=${style}>
    ${segments.map((seg, si) => seg.br ? html`<br key=${'br' + si} />` : renderText(seg.t, seg.c || 'inherit'))}
  <//>`;
}
const HEADLINE = [
  { t: 'const ', c: C.blue }, { t: 'services = ', c: C.cream }, { t: 'DB Labs', c: C.terra },
  { br: true },
  { t: '.', c: C.cream }, { t: 'buildEverything', c: C.terra2 }, { t: '();', c: C.cream },
];

/* ---------------- NAV ---------------- */
function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 40));
  const links = [['work', '01'], ['about', '02'], ['skills', '03'], ['contact', '04']];
  const linkStyle = { color: C.cream, textDecoration: 'none', fontSize: 14, fontWeight: 500, opacity: 0.85, padding: '8px 14px', fontFamily: mono };

  return html`
    <${M.nav}
      initial=${{ y: -80 }} animate=${{ y: 0 }} transition=${{ duration: 0.6, ease: EASE, delay: 0.1 }}
      style=${{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px clamp(20px,5vw,48px)',
        background: solid ? 'rgba(19,31,53,0.82)' : 'transparent',
        backdropFilter: solid ? 'blur(12px)' : 'none',
        borderBottom: '1px solid ' + (solid ? 'rgba(248,244,239,0.10)' : 'rgba(248,244,239,0)'),
        transition: 'background .3s ease, border-color .3s ease' }}>
      <a href="#top" style=${{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: mono, fontWeight: 700, fontSize: 19, color: C.cream, textDecoration: 'none' }}>
        <span style=${{ width: 34, height: 34, borderRadius: 7, background: C.terra, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.cream, fontSize: 13, fontWeight: 800 }}>${'</>'}</span>
        <span>db<span style=${{ color: C.terra }}>.</span>dev</span>
      </a>
      <div className="nav-links">
        ${links.map(([id, num]) => html`<a key=${id} href=${'#' + id} style=${linkStyle} onMouseOver=${(e) => e.currentTarget.style.opacity = 1} onMouseOut=${(e) => e.currentTarget.style.opacity = 0.85}><span style=${{ color: C.terra }}>${num}.</span> ${id}</a>`)}
        <${Magnetic} strength=${0.5}><a href="#contact" data-cursor="1" style=${{ background: 'transparent', border: '1px solid ' + C.terra, color: C.terra, textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 5, marginLeft: 8, fontFamily: mono, display: 'inline-block' }}>contact()</a><//>
      </div>
      <button aria-label="Menu" onClick=${() => setOpen(true)} style=${{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} className="menu-btn">
        <span style=${{ width: 24, height: 2, background: C.cream }}></span><span style=${{ width: 24, height: 2, background: C.cream }}></span><span style=${{ width: 16, height: 2, background: C.cream }}></span>
      </button>
      <style>${'.menu-btn{display:none!important}@media(max-width:900px){.menu-btn{display:flex!important}}'}</style>
      <${AnimatePresence}>
        ${open && html`<${M.div} key="mm"
          initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} exit=${{ opacity: 0 }}
          style=${{ position: 'fixed', inset: 0, zIndex: 70, background: C.navy2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          ${[['work', 'Work'], ['about', 'About'], ['skills', 'Skills'], ['contact', 'Contact']].map(([id, label]) =>
            html`<a key=${id} href=${'#' + id} onClick=${() => setOpen(false)} style=${{ color: C.cream, textDecoration: 'none', fontSize: 28, fontWeight: 600 }}>${label}</a>`)}
          <button onClick=${() => setOpen(false)} style=${{ position: 'absolute', top: 26, right: 34, background: 'none', border: 'none', color: C.cream, fontSize: 32, cursor: 'pointer' }}>×</button>
        <//>`}
      <//>
    <//>`;
}

/* ---------------- HERO ---------------- */
/* ---------------- live backgrounds: aurora mesh + hero 3D wireframe ---------------- */
const HERO_AURORA = [
  { style: { top: '-12%', left: '-6%', width: '48vw', height: '48vw', maxWidth: 660, maxHeight: 660, background: 'radial-gradient(circle, rgba(193,102,61,0.30), transparent 60%)' }, anim: { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }, dur: 18 },
  { style: { bottom: '-16%', right: '-8%', width: '46vw', height: '46vw', maxWidth: 620, maxHeight: 620, background: 'radial-gradient(circle, rgba(106,147,199,0.22), transparent 60%)' }, anim: { x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }, dur: 22 },
  { style: { top: '28%', left: '42%', width: '30vw', height: '30vw', maxWidth: 440, maxHeight: 440, background: 'radial-gradient(circle, rgba(111,168,138,0.14), transparent 60%)' }, anim: { x: [0, 30, 0], y: [0, -24, 0] }, dur: 26 },
];
const SOFT_AURORA_DARK = [
  { style: { top: '-18%', right: '-8%', width: '40vw', height: '40vw', maxWidth: 560, maxHeight: 560, background: 'radial-gradient(circle, rgba(193,102,61,0.16), transparent 62%)' }, anim: { x: [0, 40, 0], y: [0, 28, 0], scale: [1, 1.12, 1] }, dur: 20 },
  { style: { bottom: '-20%', left: '-10%', width: '38vw', height: '38vw', maxWidth: 520, maxHeight: 520, background: 'radial-gradient(circle, rgba(106,147,199,0.14), transparent 62%)' }, anim: { x: [0, -36, 0], y: [0, -22, 0], scale: [1, 1.14, 1] }, dur: 24 },
];
const SOFT_AURORA_LIGHT = [
  { style: { top: '-22%', left: '-8%', width: '42vw', height: '42vw', maxWidth: 540, maxHeight: 540, background: 'radial-gradient(circle, rgba(193,102,61,0.12), transparent 60%)' }, anim: { x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }, dur: 22 },
  { style: { bottom: '-24%', right: '-8%', width: '42vw', height: '42vw', maxWidth: 540, maxHeight: 540, background: 'radial-gradient(circle, rgba(106,147,199,0.12), transparent 60%)' }, anim: { x: [0, -40, 0], y: [0, -24, 0], scale: [1, 1.12, 1] }, dur: 26 },
];

function Aurora({ items, blur = 60 }) {
  return html`<div aria-hidden="true" style=${{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    ${items.map((b, i) => html`<${M.div} key=${i} animate=${reduceMotion ? {} : b.anim} transition=${{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
      style=${{ position: 'absolute', borderRadius: '50%', filter: 'blur(' + blur + 'px)', ...b.style }} />`)}
  </div>`;
}

// Slowly rotating wireframe geometry in the hero; tilts to cursor, rotates with scroll.
function HeroWire3D() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current, THREE = window.THREE;
    if (!mount || !THREE) return;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
    let W = mount.clientWidth || 600, H = mount.clientHeight || 600;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H); renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100); camera.position.set(0, 0, 7);
    const group = new THREE.Group(); group.position.x = 1.5; scene.add(group);

    // several wireframe shapes that cross-dissolve into one another (morph)
    const mkShape = (geo, color) => { const ls = new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0 })); group.add(ls); return ls; };
    const shapes = [
      mkShape(new THREE.IcosahedronGeometry(2.5, 1), 0xC1663D),
      mkShape(new THREE.TorusKnotGeometry(1.5, 0.42, 120, 12), 0xE2A184),
      mkShape(new THREE.OctahedronGeometry(2.8, 0), 0x6A93C7),
      mkShape(new THREE.DodecahedronGeometry(2.4, 0), 0x6FA88A),
    ];
    const SHAPE_PEAK = 0.34;
    const N = 130, arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(2.5 + Math.random() * 1.3); arr[i * 3] = v.x; arr[i * 3 + 1] = v.y; arr[i * 3 + 2] = v.z; }
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xE2A184, size: 0.045, transparent: true, opacity: 0.5, sizeAttenuation: true }));
    group.add(pts);

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => { mouse.x = (e.clientX / window.innerWidth - 0.5) * 2; mouse.y = (e.clientY / window.innerHeight - 0.5) * 2; };
    window.addEventListener('pointermove', onMove);

    const render = () => renderer.render(scene, camera);
    if (reduceMotion) { shapes[0].material.opacity = SHAPE_PEAK; render(); return () => { window.removeEventListener('pointermove', onMove); renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); }; }

    const PER = 4.4, n = shapes.length; // seconds each shape holds before the next
    let raf, last = performance.now();
    const tick = () => {
      const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now;
      const scroll = window.scrollY / (window.innerHeight || 800);
      // cross-dissolve: each shape peaks in its slot, adjacent shapes overlap
      const phase = (now / 1000) / PER;
      shapes.forEach((s, i) => {
        let x = phase - i; x = ((x % n) + n) % n; if (x > n / 2) x -= n;
        s.material.opacity = SHAPE_PEAK * Math.max(0, 1 - Math.abs(x));
        s.rotation.y += dt * 0.06 * (i % 2 ? -1 : 1);
      });
      group.rotation.y += dt * 0.18;
      group.rotation.x += ((mouse.y * 0.3 + scroll * 0.7) - group.rotation.x) * 0.05;
      group.position.x = 1.5 + mouse.x * 0.3;
      group.position.y = -scroll * 1.4;
      render(); raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => { W = mount.clientWidth; H = mount.clientHeight; if (!W || !H) return; camera.aspect = W / H; camera.updateProjectionMatrix(); renderer.setSize(W, H); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); window.removeEventListener('resize', onResize); renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); };
  }, []);
  return html`<div ref=${mountRef} aria-hidden="true" style=${{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />`;
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // pointer tilt on the code card
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
  const up = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
  const codeLine = (pad, ...spans) => html`<div style=${{ paddingLeft: pad }}>${spans}</div>`;

  return html`
    <section id="top" ref=${ref} className="snap-start" style=${{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden',
      paddingTop: 96, background: C.navy,
      backgroundImage: 'linear-gradient(rgba(248,244,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(248,244,239,0.05) 1px, transparent 1px)',
      backgroundSize: '40px 40px' }}>

      <${Aurora} items=${HERO_AURORA} blur=${70} />
      <${HeroWire3D} />

      <${M.div} className="wrap hero-grid" style=${{ position: 'relative', zIndex: 2, y: yContent, opacity: fade }}>
        <${M.div} variants=${container} initial="hidden" animate="show">
          <${M.div} variants=${up} style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(193,102,61,0.15)', border: '1px solid rgba(193,102,61,0.4)', color: C.terra2, fontFamily: mono, fontSize: 13, fontWeight: 500, padding: '7px 16px', borderRadius: 5, marginBottom: 26 }}>${'> whoami: full-stack developer'}</>
          <${SplitReveal} segments=${HEADLINE} style=${{ fontFamily: mono, fontSize: 'clamp(28px,4.4vw,40px)', lineHeight: 1.32, fontWeight: 700, letterSpacing: '-0.02em', color: C.cream, margin: '0 0 22px' }} />
          <${M.p} variants=${up} style=${{ fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.6, color: 'rgba(248,244,239,0.68)', maxWidth: 470, margin: '0 0 36px' }}>
            I design and build products for restaurants, communities and startups — from POS systems to social apps — end to end.
          </>
          <${M.div} variants=${up} style=${{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <${Magnetic}><${M.a} href="#contact" data-cursor="1" whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }} style=${{ background: C.terra, color: C.cream, textDecoration: 'none', fontFamily: mono, fontSize: 15, fontWeight: 600, padding: '15px 26px', borderRadius: 6, boxShadow: '0 12px 30px rgba(193,102,61,0.35)' }}>book_a_call()<//><//>
            <${Magnetic}><${M.a} href="#work" data-cursor="1" whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }} style=${{ background: 'transparent', color: C.cream, textDecoration: 'none', fontFamily: mono, fontSize: 15, fontWeight: 600, padding: '15px 26px', borderRadius: 6, border: '1px solid rgba(248,244,239,0.3)' }}>see_my_work()<//><//>
          </>
        <//>

        <div className="hero-card-col">
          <${M.div}
            initial=${{ opacity: 0, y: 40, rotateX: 8 }} animate=${{ opacity: 1, y: 0, rotateX: 0 }} transition=${{ duration: 0.9, ease: EASE, delay: 0.4 }}
            onMouseMove=${onMove} onMouseLeave=${onLeave}
            style=${{ perspective: 1000 }}>
            <${M.div} style=${{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', width: '100%', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(248,244,239,0.14)', background: C.ink, boxShadow: '0 34px 70px rgba(0,0,0,0.4)' }}>
              <div style=${{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: C.navy2, borderBottom: '1px solid rgba(248,244,239,0.08)' }}>
                <span style=${{ width: 11, height: 11, borderRadius: '50%', background: '#E2604A' }}></span>
                <span style=${{ width: 11, height: 11, borderRadius: '50%', background: C.terra2 }}></span>
                <span style=${{ width: 11, height: 11, borderRadius: '50%', background: C.green }}></span>
                <span style=${{ fontFamily: mono, fontSize: 12, color: 'rgba(248,244,239,0.4)', marginLeft: 8 }}>profile.js</span>
              </div>
              <div style=${{ padding: '24px 26px', fontFamily: mono, fontSize: 14, lineHeight: 1.85, color: C.cream }}>
                ${codeLine(0, html`<span style=${{ color: C.blue }}>const</span> `, html`<span style=${{ color: C.terra2 }}>developer</span>`, ' = {')}
                ${codeLine(20, html`<span style=${{ color: C.slate }}>name:</span> `, html`<span style=${{ color: C.terra }}>'DB Labs'</span>,`)}
                ${codeLine(20, html`<span style=${{ color: C.slate }}>role:</span> `, html`<span style=${{ color: C.terra }}>'Full-stack Developer'</span>,`)}
                ${codeLine(20, html`<span style=${{ color: C.slate }}>stack:</span> [`, html`<span style=${{ color: C.terra }}>'JS'</span>, <span style=${{ color: C.terra }}>'React'</span>, <span style=${{ color: C.terra }}>'Node'</span>],`)}
                ${codeLine(20, html`<span style=${{ color: C.slate }}>available:</span> `, html`<span style=${{ color: C.green }}>true</span>`)}
                ${codeLine(0, '};')}
                <div style=${{ marginTop: 12, color: 'rgba(248,244,239,0.35)' }}>// shipping products since day one<span className="terminal-cursor" style=${{ marginLeft: 4 }}>_</span></div>
              </div>
            <//>
          <//>
        </div>
      <//>

      <${M.div} initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} transition=${{ delay: 1.1 }}
        style=${{ position: 'absolute', bottom: 26, left: '50%', x: '-50%', color: 'rgba(248,244,239,0.5)', fontFamily: mono, fontSize: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        scroll
        <${M.span} animate=${{ y: [0, 8, 0] }} transition=${{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} style=${{ width: 1, height: 26, background: 'rgba(248,244,239,0.4)' }} />
      <//>
    </section>`;
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const row = MARQUEE;
  const item = (t, i) => html`<span key=${i} style=${{ display: 'inline-flex', alignItems: 'center', gap: 22, padding: '0 22px' }}>
    <span style=${{ fontFamily: mono, fontWeight: 700, fontSize: 'clamp(18px,3vw,28px)', color: C.cream, letterSpacing: '0.02em' }}>${t}</span>
    <span style=${{ color: C.terra, fontSize: 16 }}>◆</span></span>`;
  return html`<div style=${{ background: C.ink, padding: '22px 0', overflow: 'hidden', borderTop: '1px solid rgba(248,244,239,0.08)', borderBottom: '1px solid rgba(248,244,239,0.08)' }}>
    <${M.div} animate=${reduceMotion ? {} : { x: ['0%', '-50%'] }} transition=${{ duration: 24, repeat: Infinity, ease: 'linear' }} style=${{ display: 'flex', width: 'max-content' }}>
      ${row.map(item)}${row.map((t, i) => item(t, i + 100))}
    <//>
  </div>`;
}

/* ---------------- STATS ---------------- */
function Stats() {
  return html`<section style=${{ background: C.navy2, position: 'relative', overflow: 'hidden' }}>
    <${Aurora} items=${SOFT_AURORA_DARK} blur=${72} />
    <div className="wrap" style=${{ padding: '0 clamp(20px,5vw,48px)', position: 'relative', zIndex: 1 }}>
      <div className="stats-grid" style=${{ background: 'rgba(248,244,239,0.08)', borderRadius: 0 }}>
        ${STATS.map((s, i) => html`<${Reveal} key=${s.label} delay=${i * 0.08} style=${{ background: 'rgba(23,35,58,0.7)', backdropFilter: 'blur(2px)' }}>
          <div style=${{ padding: '38px 20px', textAlign: 'center' }}>
            <div style=${{ fontFamily: mono, fontSize: 'clamp(34px,5vw,52px)', fontWeight: 800, color: C.terra2, lineHeight: 1 }}><${CountUp} to=${s.to} suffix=${s.suffix} /></div>
            <div style=${{ marginTop: 12, fontSize: 14, color: 'rgba(248,244,239,0.6)' }}>${s.label}</div>
          </div>
        <//>`)}
      </div>
    </div>
  </section>`;
}

/* ---------------- WORK ---------------- */
function WorkCard({ item, i, onOpen }) {
  const [hover, setHover] = useState(false);
  return html`<${M.button}
    type="button" data-cursor="1" onClick=${() => onOpen(item)}
    onMouseEnter=${() => setHover(true)} onMouseLeave=${() => setHover(false)}
    initial=${{ opacity: 0, y: 46 }}
    whileInView=${{ opacity: 1, y: 0 }}
    viewport=${{ once: true, margin: '-60px' }}
    transition=${{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
    whileHover=${{ y: -8 }}
    style=${{ display: 'block', width: '100%', textAlign: 'left', font: 'inherit', cursor: 'pointer', position: 'relative', borderRadius: 16, overflow: 'hidden',
      background: C.ink, border: '1px solid rgba(248,244,239,0.10)', padding: 24,
      boxShadow: hover ? '0 26px 50px rgba(0,0,0,0.4)' : '0 10px 24px rgba(0,0,0,0.18)',
      transition: 'box-shadow .3s ease' }}>
    <${M.div} animate=${{ opacity: hover ? 0.18 : 0.08 }} style=${{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, ' + item.accent + ' 0%, transparent 70%)' }} />
    <div style=${{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style=${{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(135deg,' + item.accent + ' 0%, #17233A 150%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontWeight: 800, fontSize: 17, color: C.cream, boxShadow: '0 8px 20px ' + item.accent + '55' }}>${item.initials}</div>
      <span style=${{ fontFamily: mono, fontSize: 13, color: 'rgba(248,244,239,0.35)' }}>${item.n}</span>
    </div>
    <div style=${{ position: 'relative' }}>
      <div style=${{ fontSize: 20, fontWeight: 800, color: C.cream, marginBottom: 6 }}>${item.name}</div>
      <div style=${{ fontFamily: mono, fontSize: 12.5, color: item.accent, marginBottom: 12 }}>${item.tagline}</div>
      <p style=${{ fontSize: 14, lineHeight: 1.62, color: 'rgba(248,244,239,0.6)', margin: '0 0 18px' }}>${item.blurb}</p>
      <div style=${{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        ${item.tags.map((t) => html`<span key=${t} style=${{ fontFamily: mono, fontSize: 11, color: 'rgba(248,244,239,0.7)', border: '1px solid rgba(248,244,239,0.14)', borderRadius: 20, padding: '4px 11px' }}>${t}</span>`)}
      </div>
      <${M.div} animate=${{ x: hover ? 4 : 0 }} style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: mono, fontSize: 13, fontWeight: 600, color: C.terra2 }}>
        View case study <span>→</span>
      <//>
    </div>
  <//>`;
}

function ProjectModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return html`<${M.div}
    initial=${{ opacity: 0 }} animate=${{ opacity: 1 }} exit=${{ opacity: 0 }} transition=${{ duration: 0.25 }} onClick=${onClose}
    style=${{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(8,14,24,0.72)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(14px,4vw,40px)', overflowY: 'auto' }}>
    <${M.div} onClick=${(e) => e.stopPropagation()}
      initial=${{ opacity: 0, y: 30, scale: 0.97 }} animate=${{ opacity: 1, y: 0, scale: 1 }} exit=${{ opacity: 0, y: 20, scale: 0.98 }} transition=${{ duration: 0.35, ease: EASE }}
      style=${{ position: 'relative', width: 'min(640px, 100%)', maxHeight: '90vh', overflowY: 'auto', borderRadius: 20, background: C.ink, border: '1px solid rgba(248,244,239,0.12)', boxShadow: '0 40px 90px rgba(0,0,0,0.55)' }}>
      <div style=${{ position: 'relative', padding: '28px 30px 22px', background: 'linear-gradient(135deg,' + item.accent + '2b, transparent 70%)', borderBottom: '1px solid rgba(248,244,239,0.08)' }}>
        <button onClick=${onClose} data-cursor="1" aria-label="Close" style=${{ position: 'absolute', top: 18, right: 18, width: 34, height: 34, borderRadius: 9, border: '1px solid rgba(248,244,239,0.18)', background: 'rgba(248,244,239,0.05)', color: C.cream, cursor: 'pointer', fontSize: 18 }}>×</button>
        <div style=${{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style=${{ width: 54, height: 54, borderRadius: 13, background: 'linear-gradient(135deg,' + item.accent + ', #17233A 150%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontWeight: 800, fontSize: 18, color: C.cream }}>${item.initials}</div>
          <div>
            <div style=${{ fontSize: 22, fontWeight: 800, color: C.cream }}>${item.name}</div>
            <div style=${{ fontFamily: mono, fontSize: 13, color: item.accent }}>${item.tagline}</div>
          </div>
        </div>
      </div>
      <div style=${{ padding: '24px 30px 30px' }}>
        <p style=${{ fontSize: 15.5, lineHeight: 1.7, color: 'rgba(248,244,239,0.78)', margin: '0 0 22px' }}>${item.detail}</p>
        <div style=${{ fontFamily: mono, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.terra2, marginBottom: 12 }}>What it does</div>
        <div style=${{ display: 'grid', gap: 10, marginBottom: 24 }}>
          ${item.bullets.map((btxt) => html`<div key=${btxt} style=${{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style=${{ color: C.green, marginTop: 1 }}>✓</span>
            <span style=${{ fontSize: 14.5, lineHeight: 1.55, color: 'rgba(248,244,239,0.75)' }}>${btxt}</span>
          </div>`)}
        </div>
        ${item.results && html`<div style=${{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 26 }}>
          ${item.results.map((r) => html`<span key=${r} style=${{ fontFamily: mono, fontSize: 12, color: C.cream, background: 'rgba(248,244,239,0.06)', border: '1px solid rgba(248,244,239,0.14)', borderRadius: 20, padding: '6px 13px' }}>${r}</span>`)}
        </div>`}
        <div style=${{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <${M.a} href=${item.link} target="_blank" rel="noopener" data-cursor="1" whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }}
            style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.terra, color: C.cream, textDecoration: 'none', fontFamily: mono, fontSize: 14, fontWeight: 600, padding: '13px 22px', borderRadius: 8 }}>Visit live site ↗<//>
          <button onClick=${onClose} data-cursor="1" style=${{ background: 'transparent', border: '1px solid rgba(248,244,239,0.2)', color: C.cream, fontFamily: mono, fontSize: 14, padding: '13px 20px', borderRadius: 8, cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    <//>
  <//>`;
}

function Work() {
  const [active, setActive] = useState(null);
  useEffect(() => { document.body.style.overflow = active ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [active]);
  return html`<section id="work" className="snap-start" style=${{ padding: '96px 0 88px', background: 'linear-gradient(150deg, #2B1B14 0%, #3A2418 45%, #1D2A3F 100%)', position: 'relative', overflow: 'hidden' }}>
    <${Aurora} items=${SOFT_AURORA_DARK} blur=${64} />
    <${M.div} animate=${reduceMotion ? {} : { y: [0, 30, 0] }} transition=${{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} style=${{ position: 'absolute', top: -80, left: -100, width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(193,102,61,0.28) 0%, transparent 70%)', zIndex: 0 }} />
    <div className="wrap" style=${{ position: 'relative', zIndex: 1 }}>
      <${Reveal} style=${{ marginBottom: 52 }}>
        <div style=${{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style=${{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: C.terra2, marginBottom: 12 }}>// 01. selected work</div>
            <h2 style=${{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: C.cream }}>Projects built for real clients</h2>
          </div>
          <p style=${{ maxWidth: 380, color: 'rgba(248,244,239,0.6)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>Point-of-sale systems, automation agents, games and sites. Tap any card for the case study — each also has its own live microsite.</p>
        </div>
      <//>
      <div className="work-grid">
        ${WORK_ITEMS.map((item, i) => html`<${WorkCard} key=${item.id} item=${item} i=${i} onOpen=${setActive} />`)}
      </div>
    </div>
    <${AnimatePresence}>${active && html`<${ProjectModal} key="pm" item=${active} onClose=${() => setActive(null)} />`}<//>
  </section>`;
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const card = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
  return html`<section style=${{ padding: '90px 0', background: C.ink, position: 'relative', overflow: 'hidden' }}>
    <${Aurora} items=${SOFT_AURORA_DARK} blur=${70} />
    <div className="wrap" style=${{ position: 'relative', zIndex: 1 }}>
      <${Reveal} style=${{ textAlign: 'center', marginBottom: 44 }}>
        <div style=${{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: C.terra2, marginBottom: 12 }}>// what clients say</div>
        <h2 style=${{ fontSize: 'clamp(26px,3.6vw,38px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: C.cream }}>Trusted by the teams I build for</h2>
      <//>
      <${M.div} variants=${container} initial="hidden" whileInView="show" viewport=${{ once: true, margin: '-60px' }} className="test-grid" style=${{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 44 }}>
        ${TESTIMONIALS.map((t) => html`<${M.div} key=${t.role} variants=${card}
          style=${{ background: C.navy2, border: '1px solid rgba(248,244,239,0.1)', borderRadius: 16, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style=${{ color: '#E8B84B', fontSize: 14, letterSpacing: 2 }}>★★★★★</div>
          <p style=${{ fontSize: 15, lineHeight: 1.65, color: 'rgba(248,244,239,0.82)', margin: 0, flex: 1 }}>“${t.quote}”</p>
          <div style=${{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style=${{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,' + t.accent + ', #17233A 150%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontWeight: 800, fontSize: 14, color: C.cream }}>${t.initials}</div>
            <div>
              <div style=${{ fontSize: 14, fontWeight: 700, color: C.cream }}>${t.name}</div>
              <div style=${{ fontFamily: mono, fontSize: 12, color: 'rgba(248,244,239,0.55)' }}>${t.role}</div>
            </div>
          </div>
        <//>`)}
      <//>
      <${Reveal} style=${{ borderTop: '1px solid rgba(248,244,239,0.1)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '18px 40px' }}>
        <span style=${{ fontFamily: mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(248,244,239,0.4)' }}>Trusted by</span>
        ${TRUST_LOGOS.map((l) => html`<span key=${l} style=${{ fontSize: 16, fontWeight: 700, color: 'rgba(248,244,239,0.55)' }}>${l}</span>`)}
      <//>
    </div>
  </section>`;
}

/* ---------------- PROCESS ---------------- */
function Process() {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const step = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };
  return html`<section style=${{ padding: '92px 0', background: 'linear-gradient(150deg, #2B1B14 0%, #1D2A3F 100%)', position: 'relative', overflow: 'hidden' }}>
    <${Aurora} items=${SOFT_AURORA_DARK} blur=${64} />
    <div className="wrap" style=${{ position: 'relative', zIndex: 1 }}>
      <${Reveal} style=${{ marginBottom: 44 }}>
        <div style=${{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: C.terra2, marginBottom: 12 }}>// how i work</div>
        <h2 style=${{ fontSize: 'clamp(26px,3.6vw,38px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: C.cream }}>From idea to launched product</h2>
      <//>
      <${M.div} variants=${container} initial="hidden" whileInView="show" viewport=${{ once: true, margin: '-60px' }} className="process-grid" style=${{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
        ${PROCESS.map((s) => html`<${M.div} key=${s.n} variants=${step}
          style=${{ position: 'relative', background: 'rgba(14,26,46,0.6)', border: '1px solid rgba(248,244,239,0.1)', borderRadius: 16, padding: '26px 22px' }}>
          <div style=${{ fontSize: 26, marginBottom: 14 }}>${s.icon}</div>
          <div style=${{ fontFamily: mono, fontSize: 12, color: C.terra2, marginBottom: 6 }}>${s.n}</div>
          <div style=${{ fontSize: 18, fontWeight: 800, color: C.cream, marginBottom: 8 }}>${s.title}</div>
          <p style=${{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(248,244,239,0.65)', margin: 0 }}>${s.body}</p>
        <//>`)}
      <//>
    </div>
  </section>`;
}

/* ---------------- ABOUT ---------------- */
function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], [50, -50]);
  return html`<section id="about" ref=${ref} className="snap-start" style=${{ padding: '96px 0', background: 'linear-gradient(150deg, #1D2A3F 0%, #26344B 45%, #2B1B14 100%)', position: 'relative', overflow: 'hidden' }}>
    <${Aurora} items=${SOFT_AURORA_DARK} blur=${64} />
    <div className="wrap about-grid" style=${{ position: 'relative', zIndex: 1 }}>
      <${Reveal} y=${0}>
        <${M.div} style=${{ y: yImg, position: 'relative', aspectRatio: '1/1', maxHeight: 420, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(248,244,239,0.12)', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}>
          <img src="./workspace.jpg" alt="DB — full-stack developer" loading="lazy" style=${{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
          <div style=${{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19,31,53,0.5), transparent 55%)', pointerEvents: 'none' }} />
          <div style=${{ position: 'absolute', left: 16, bottom: 14, fontFamily: mono, fontSize: 12, letterSpacing: '0.06em', color: 'rgba(248,244,239,0.85)' }}>DB · <span style=${{ color: C.terra2 }}>DB Labs</span></div>
        <//>
      <//>
      <${Reveal} delay=${0.1}>
        <div style=${{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: C.terra2, marginBottom: 16 }}>// 02. about</div>
        <h2 style=${{ fontSize: 'clamp(26px,3.6vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 22px', color: C.cream }}>A developer who ships the whole product</h2>
        <p style=${{ fontSize: 17, lineHeight: 1.7, color: 'rgba(248,244,239,0.75)', margin: '0 0 18px', maxWidth: 560 }}>I'm DB — I build software for small businesses and founders who need something working, not just wireframed. Point-of-sale systems, backend agents, games, and the sites that sell them.</p>
        <p style=${{ fontSize: 17, lineHeight: 1.7, color: 'rgba(248,244,239,0.75)', margin: 0, maxWidth: 560 }}>On-call for clients across the world, I take a project from a napkin sketch to a live product — design, code, and the handoff after launch.</p>
      <//>
    </div>
  </section>`;
}

/* ---------------- SKILLS ---------------- */
function Skills() {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
  const chip = { hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } } };
  return html`<section id="skills" className="snap-start" style=${{ padding: '84px 0 100px', background: C.cream, backgroundImage: 'radial-gradient(rgba(23,35,58,0.07) 1px, transparent 1px)', backgroundSize: '24px 24px', position: 'relative', overflow: 'hidden' }}>
    <${Aurora} items=${SOFT_AURORA_LIGHT} blur=${76} />
    <div className="wrap" style=${{ position: 'relative', zIndex: 1 }}>
      <${Reveal} style=${{ textAlign: 'center', marginBottom: 44 }}>
        <div style=${{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: C.terra, marginBottom: 14 }}>${'// 03. skills & tools'}</div>
        <h2 style=${{ fontSize: 'clamp(26px,3.6vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: C.navy2 }}>What I build with</h2>
      <//>
      <${M.div} variants=${container} initial="hidden" whileInView="show" viewport=${{ once: true, margin: '-40px' }}
        style=${{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        ${SKILLS.map((s) => html`<${M.span} key=${s} variants=${chip} whileHover=${{ y: -4, borderColor: C.terra }}
          style=${{ fontFamily: mono, fontSize: 14, fontWeight: 500, color: C.navy2, background: '#fff', border: '1px solid rgba(23,35,58,0.12)', borderRadius: 8, padding: '11px 18px', boxShadow: '0 4px 12px rgba(23,35,58,0.05)', cursor: 'default' }}>${s}</>`)}
      <//>
    </div>
  </section>`;
}

/* ---------------- CONTACT ---------------- */
// FormSubmit needs no backend/keys; first submission triggers a one-time
// activation email to OWNER_EMAIL — confirm it once and the form goes live.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + OWNER_EMAIL;
function Contact() {
  const [country, setCountry] = useState('sa');
  const [f, setF] = useState({ name: '', email: '', type: '', msg: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | ok | err
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const build = () => [
    "Hi DB Labs! I'd like to work together.",
    f.name && `Name: ${f.name}`, f.email && `Email: ${f.email}`,
    f.type && `Project: ${f.type}`, f.msg && `Notes: ${f.msg}`,
  ].filter(Boolean).join('\n');
  const wa = () => window.open(`https://wa.me/${WHATSAPP_NUMBERS[country]}?text=${encodeURIComponent(build())}`, '_blank', 'noopener');
  const mail = () => { window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(build())}`; };

  const send = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, project: f.type, message: f.msg, _subject: 'New enquiry from db.dev', _template: 'table' }),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('ok'); setF({ name: '', email: '', type: '', msg: '' });
    } catch (err) { setStatus('err'); }
  };

  const input = { padding: '15px 18px', borderRadius: 10, border: '1px solid rgba(23,35,58,0.15)', fontFamily: 'Inter, sans-serif', fontSize: 15, background: '#fff', color: C.navy2, width: '100%' };
  const cbtn = (c, label) => html`<button type="button" onClick=${() => setCountry(c)} data-cursor="1" style=${{ fontFamily: mono, fontSize: 13, fontWeight: 600, padding: '10px 16px', borderRadius: 9, cursor: 'pointer',
    border: '1px solid ' + (country === c ? C.terra : 'rgba(23,35,58,0.15)'), background: country === c ? 'rgba(193,102,61,0.1)' : '#fff', color: country === c ? C.terra : '#5B6472' }}>${label}</button>`;

  return html`<section id="contact" className="snap-start" style=${{ padding: '110px 0', background: C.cream, position: 'relative', overflow: 'hidden' }}>
    <${Aurora} items=${SOFT_AURORA_LIGHT} blur=${72} />
    <${Reveal} className="wrap" style=${{ maxWidth: 660, position: 'relative', zIndex: 1 }}>
      <div style=${{ textAlign: 'center', marginBottom: 44 }}>
        <div style=${{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: C.terra, marginBottom: 14 }}>// 04. contact</div>
        <h2 style=${{ fontSize: 'clamp(28px,3.6vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px', color: C.navy2 }}>Let's build something</h2>
        <p style=${{ fontSize: 16, color: '#5B6472', margin: 0 }}>Send the form and it lands straight in my inbox — or reach me on WhatsApp / email. I reply within a day.</p>
      </div>
      ${status === 'ok'
        ? html`<${M.div} initial=${{ opacity: 0, y: 16 }} animate=${{ opacity: 1, y: 0 }} style=${{ textAlign: 'center', background: '#fff', border: '1px solid rgba(111,168,138,0.4)', borderRadius: 16, padding: '44px 30px' }}>
            <div style=${{ width: 60, height: 60, margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(111,168,138,0.15)', border: '2px solid ' + C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.green, fontSize: 26, fontWeight: 800 }}>✓</div>
            <h3 style=${{ margin: '0 0 8px', color: C.navy2, fontSize: 20 }}>Message sent!</h3>
            <p style=${{ margin: 0, color: '#5B6472' }}>Thanks — I'll get back to you within a day.</p>
          <//>`
        : html`<form onSubmit=${send} style=${{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="two-col">
          <input required placeholder="Your name" value=${f.name} onChange=${set('name')} style=${input} />
          <input required type="email" placeholder="Email address" value=${f.email} onChange=${set('email')} style=${input} />
        </div>
        <select required value=${f.type} onChange=${set('type')} style=${input}>
          <option value="">Project type</option>
          <option>POS / restaurant system</option>
          <option>Backend / automation agent</option>
          <option>Game</option>
          <option>Personal or business website</option>
          <option>Social media handling</option>
          <option>Something else</option>
        </select>
        <textarea placeholder="Tell me about your project" rows="5" value=${f.msg} onChange=${set('msg')} style=${{ ...input, resize: 'vertical' }}></textarea>
        ${status === 'err' && html`<div style=${{ fontSize: 13, color: '#B5462F', background: 'rgba(193,102,61,0.08)', border: '1px solid rgba(193,102,61,0.3)', borderRadius: 8, padding: '10px 14px' }}>Couldn't send just now — please use WhatsApp or email below.</div>`}
        <div style=${{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 2, alignItems: 'center' }}>
          <${Magnetic}><${M.button} type="submit" data-cursor="1" disabled=${status === 'sending'} whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }} style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.terra, color: C.cream, border: 'none', fontFamily: mono, fontSize: 15, fontWeight: 600, padding: '15px 28px', borderRadius: 30, cursor: 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>${status === 'sending' ? 'Sending…' : 'Send message'}<//><//>
          <span style=${{ fontFamily: mono, fontSize: 12, color: '#8a8378' }}>or</span>
          <${M.button} type="button" onClick=${wa} data-cursor="1" whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }} style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#04110a', border: 'none', fontFamily: mono, fontSize: 14, fontWeight: 700, padding: '13px 20px', borderRadius: 30, cursor: 'pointer' }}>💬 WhatsApp<//>
          <${M.button} type="button" onClick=${mail} data-cursor="1" whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }} style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: C.navy2, border: '1px solid rgba(23,35,58,0.2)', fontFamily: mono, fontSize: 14, fontWeight: 600, padding: '13px 20px', borderRadius: 30, cursor: 'pointer' }}>✉️ Email<//>
        </div>
        <div>
          <span style=${{ fontFamily: mono, fontSize: 12, color: '#8a8378', marginRight: 10 }}>WhatsApp region:</span>
          ${cbtn('sa', '🇸🇦 SA')} ${cbtn('in', '🇮🇳 India')}
        </div>
      </form>`}
    <//>
  </section>`;
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const soc = (s) => html`<${M.a} key=${s.label} href=${s.href} target="_blank" rel="noopener" data-cursor="1" aria-label=${s.label}
    whileHover=${{ y: -3, borderColor: C.terra2 }}
    style=${{ width: 38, height: 38, borderRadius: 10, border: '1px solid rgba(248,244,239,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.cream, textDecoration: 'none', fontFamily: mono, fontSize: 13, fontWeight: 700 }}>${s.abbr}<//>`;
  return html`<footer style=${{ background: C.navy2, padding: '44px clamp(20px,5vw,48px)' }}>
    <div className="wrap footer-row" style=${{ padding: 0 }}>
      <div style=${{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style=${{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: mono, fontWeight: 700, fontSize: 18, color: C.cream }}>
          <span style=${{ width: 30, height: 30, borderRadius: 7, background: C.terra, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>${'</>'}</span>
          db<span style=${{ color: C.terra }}>.</span>dev
        </div>
        <span style=${{ color: 'rgba(248,244,239,0.5)', fontFamily: mono, fontSize: 13 }}>© 2026 · Created by <span style=${{ color: C.terra2, fontWeight: 600 }}>DB Labs</span></span>
      </div>
      <div style=${{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        ${SOCIALS.map(soc)}
        <${M.a} href="./resume.pdf" target="_blank" rel="noopener" data-cursor="1" whileHover=${{ y: -3 }}
          style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(248,244,239,0.2)', color: C.cream, textDecoration: 'none', fontFamily: mono, fontSize: 13, fontWeight: 600, padding: '9px 16px', borderRadius: 10 }}>résumé ↓<//>
        <${M.a} href="#contact" data-cursor="1" whileHover=${{ y: -3 }} style=${{ color: C.terra2, fontFamily: mono, fontSize: 13, textDecoration: 'none', fontWeight: 600, marginLeft: 4 }}>contact() →<//>
      </div>
    </div>
  </footer>`;
}

/* ---------------- APP ---------------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return html`<${M.div} style=${{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,' + C.terra + ',' + C.terra2 + ')', transformOrigin: '0%', scaleX, zIndex: 100 }} />`;
}

/* ============================================================
   LOADER — 6s boot sequence with a 3D assembling cube (Three.js)
   ============================================================ */

/* ============================================================
   3D BUILD SCENES (Three.js) — one is picked per reload, cycling.
   Each builder adds meshes to `group` and returns { cam, update(p,dt,now) }.
   ============================================================ */
const _cl = (t) => Math.min(1, Math.max(0, t));       // clamp 0..1
const _eo = (t) => 1 - Math.pow(1 - t, 3);            // easeOutCubic
const slateMat = (THREE) => new THREE.MeshStandardMaterial({ color: 0x2C3E57, metalness: 0.4, roughness: 0.35, transparent: true, opacity: 0.92, emissive: 0x0a1220, emissiveIntensity: 0.4 });
const edgeMat = (THREE, c) => new THREE.LineBasicMaterial({ color: c || 0xE2A184, transparent: true, opacity: 0.9 });
const randDir = (THREE) => new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
const randSpin = (THREE) => new THREE.Vector3(Math.random() * 3, Math.random() * 3, Math.random() * 3);

// 1 — Rubik-style cube: 27 blocks fly in from scatter.
function buildCube(THREE, group) {
  const S = 1.04, sz = 0.94;
  const geo = new THREE.BoxGeometry(sz, sz, sz), eg = new THREE.EdgesGeometry(geo);
  const vox = [];
  for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
    const m = new THREE.Mesh(geo, slateMat(THREE));
    const edges = new THREE.LineSegments(eg, edgeMat(THREE));
    m.add(edges);
    const home = new THREE.Vector3(x * S, y * S, z * S);
    const scatter = home.clone().add(randDir(THREE).multiplyScalar(6 + Math.random() * 5));
    vox.push({ m, edges, home, scatter, spin: randSpin(THREE) });
    group.add(m);
  }
  vox.sort((a, b) => a.home.length() - b.home.length());
  vox.forEach((v, i) => { v.order = i / (vox.length - 1); });
  return { cam: { pos: [4.6, 3.5, 6.2], target: [0, 0.1, 0] }, update(p, dt, now) {
    vox.forEach((v) => {
      const local = _eo(_cl((p - v.order * 0.7) / 0.3));
      v.m.position.lerpVectors(v.scatter, v.home, local);
      v.m.scale.setScalar(0.001 + local);
      v.m.material.opacity = 0.18 + 0.74 * local; v.edges.material.opacity = 0.12 + 0.82 * local;
      if (local < 1) { v.m.rotation.x += dt * v.spin.x * (1 - local); v.m.rotation.y += dt * v.spin.y * (1 - local); v.m.rotation.z += dt * v.spin.z * (1 - local); } else v.m.rotation.set(0, 0, 0);
    });
    group.rotation.y += dt * 0.6; group.rotation.x = Math.sin(now * 0.0004) * 0.16 + 0.14;
  } };
}

// 2 — Twisting tower: slabs drop and stack into a spiralling skyscraper.
function buildTower(THREE, group) {
  const L = 10, w = 1.7, h = 0.42, gap = 0.16, totalH = L * (h + gap);
  const geo = new THREE.BoxGeometry(w, h, w), eg = new THREE.EdgesGeometry(geo);
  const slabs = [];
  for (let i = 0; i < L; i++) {
    const m = new THREE.Mesh(geo, slateMat(THREE));
    const edges = new THREE.LineSegments(eg, edgeMat(THREE)); m.add(edges);
    const homeY = i * (h + gap) - totalH / 2 + h;
    slabs.push({ m, edges, homeY, startY: homeY + 9, twist: i * 0.17, order: i / (L - 1) });
    group.add(m);
  }
  return { cam: { pos: [6.3, 2.0, 6.9], target: [0, 0.1, 0] }, update(p, dt, now) {
    slabs.forEach((s) => {
      const local = _eo(_cl((p - s.order * 0.78) / 0.24));
      s.m.position.y = s.startY + (s.homeY - s.startY) * local;
      s.m.scale.setScalar(0.001 + local); s.m.rotation.y = s.twist * local;
      s.m.material.opacity = 0.2 + 0.72 * local; s.edges.material.opacity = 0.12 + 0.82 * local;
    });
    group.rotation.y += dt * 0.5;
  } };
}

// 3 — Stepped pyramid: blocks fly in bottom-up.
function buildPyramid(THREE, group) {
  const S = 0.98, sz = 0.9, base = 4, totalH = base * S;
  const geo = new THREE.BoxGeometry(sz, sz, sz), eg = new THREE.EdgesGeometry(geo);
  const vox = [];
  for (let lvl = 0; lvl < base; lvl++) {
    const n = base - lvl, y = lvl * S - totalH / 2 + S / 2;
    for (let gx = 0; gx < n; gx++) for (let gz = 0; gz < n; gz++) {
      const m = new THREE.Mesh(geo, slateMat(THREE));
      const edges = new THREE.LineSegments(eg, edgeMat(THREE)); m.add(edges);
      const home = new THREE.Vector3((gx - (n - 1) / 2) * S, y, (gz - (n - 1) / 2) * S);
      const scatter = home.clone().add(randDir(THREE).multiplyScalar(6 + Math.random() * 4));
      vox.push({ m, edges, home, scatter, spin: randSpin(THREE), order: _cl((lvl + Math.random() * 0.4) / base) });
      group.add(m);
    }
  }
  return { cam: { pos: [5.2, 3.4, 6.2], target: [0, 0, 0] }, update(p, dt, now) {
    vox.forEach((v) => {
      const local = _eo(_cl((p - v.order * 0.72) / 0.28));
      v.m.position.lerpVectors(v.scatter, v.home, local);
      v.m.scale.setScalar(0.001 + local);
      v.m.material.opacity = 0.18 + 0.74 * local; v.edges.material.opacity = 0.12 + 0.82 * local;
      if (local < 1) { v.m.rotation.x += dt * v.spin.x * (1 - local); v.m.rotation.y += dt * v.spin.y * (1 - local); } else v.m.rotation.set(0, 0, 0);
    });
    group.rotation.y += dt * 0.55; group.rotation.x = 0.12;
  } };
}

// 4 — Point sphere: hundreds of points converge onto a globe.
function buildSphere(THREE, group) {
  const N = 540, R = 2.25, gold = Math.PI * (3 - Math.sqrt(5));
  const home = [], scatter = [], order = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * gold;
    home.push(new THREE.Vector3(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R));
    scatter.push(home[i].clone().add(randDir(THREE).multiplyScalar(5 + Math.random() * 5)));
    order.push(i / (N - 1));
  }
  const arr = new Float32Array(N * 3), geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xE2A184, size: 0.085, sizeAttenuation: true, transparent: true, opacity: 0.95, depthWrite: false }));
  group.add(pts);
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(R, 1)), new THREE.LineBasicMaterial({ color: 0x6A93C7, transparent: true, opacity: 0 }));
  group.add(wire);
  return { cam: { pos: [0, 1.1, 6.8], target: [0, 0, 0] }, update(p, dt, now) {
    const a = geo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      const local = _eo(_cl((p - order[i] * 0.65) / 0.33)), h = home[i], s = scatter[i];
      a[i * 3] = s.x + (h.x - s.x) * local; a[i * 3 + 1] = s.y + (h.y - s.y) * local; a[i * 3 + 2] = s.z + (h.z - s.z) * local;
    }
    geo.attributes.position.needsUpdate = true;
    wire.material.opacity = 0.14 * _cl((p - 0.5) / 0.4);
    group.rotation.y += dt * 0.4;
  } };
}

// 5 — DNA helix: two strands of nodes with rungs, spinning.
function buildHelix(THREE, group) {
  const T = 26, rad = 1.15, pitch = 0.24, totalH = T * pitch;
  const sph = new THREE.SphereGeometry(0.13, 14, 14);
  const nodes = [], rungPos = [];
  for (let i = 0; i < T; i++) {
    const ang = i * 0.5, y = i * pitch - totalH / 2;
    const A = new THREE.Vector3(Math.cos(ang) * rad, y, Math.sin(ang) * rad);
    const B = new THREE.Vector3(Math.cos(ang + Math.PI) * rad, y, Math.sin(ang + Math.PI) * rad);
    const mk = (pos, c) => { const m = new THREE.Mesh(sph, new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.35, metalness: 0.3, roughness: 0.4, transparent: true, opacity: 1 })); m.position.copy(pos); nodes.push({ m, order: i / (T - 1) }); group.add(m); };
    mk(A, 0xC1663D); mk(B, 0x6A93C7);
    rungPos.push(A.x, A.y, A.z, B.x, B.y, B.z);
  }
  const rgeo = new THREE.BufferGeometry(); rgeo.setAttribute('position', new THREE.Float32BufferAttribute(rungPos, 3));
  const rung = new THREE.LineSegments(rgeo, new THREE.LineBasicMaterial({ color: 0xE2A184, transparent: true, opacity: 0 }));
  group.add(rung);
  return { cam: { pos: [0, 0, 6.6], target: [0, 0, 0] }, update(p, dt, now) {
    nodes.forEach((n) => { const local = _eo(_cl((p - n.order * 0.7) / 0.3)); n.m.scale.setScalar(0.001 + local); n.m.material.opacity = local; });
    rung.material.opacity = 0.5 * _cl((p - 0.15) / 0.6);
    group.rotation.y += dt * 0.85;
  } };
}

const SCENES = [
  { name: 'cube', build: buildCube },
  { name: 'tower', build: buildTower },
  { name: 'pyramid', build: buildPyramid },
  { name: 'sphere', build: buildSphere },
  { name: 'helix', build: buildHelix },
];

// Pick a different scene each reload (cycles); ?scene=N forces one.
function pickSceneIndex() {
  try {
    const params = new URLSearchParams(location.search);
    if (params.has('scene')) { const n = parseInt(params.get('scene'), 10) || 0; return ((n % SCENES.length) + SCENES.length) % SCENES.length; }
    const prev = parseInt(localStorage.getItem('db_scene'), 10);
    const idx = isNaN(prev) ? Math.floor(Math.random() * SCENES.length) : (prev + 1) % SCENES.length;
    localStorage.setItem('db_scene', String(idx));
    return idx;
  } catch (e) { return 0; }
}

function Scene3D({ progressRef, index }) {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current, THREE = window.THREE;
    if (!mount || !THREE) return;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
    let W = mount.clientWidth || 320, H = mount.clientHeight || 320;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H); renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    scene.add(new THREE.AmbientLight(0xffffff, 0.62));
    const key = new THREE.PointLight(0xC1663D, 2.6); key.position.set(5, 6, 4); scene.add(key);
    const rim = new THREE.PointLight(0x6A93C7, 1.9); rim.position.set(-6, -2, -4); scene.add(rim);
    const top = new THREE.DirectionalLight(0xffffff, 0.5); top.position.set(0, 8, 3); scene.add(top);
    const grid = new THREE.GridHelper(24, 24, 0x6A93C7, 0x24344d); grid.material.transparent = true; grid.material.opacity = 0.14; grid.position.y = -2.7; scene.add(grid);

    const group = new THREE.Group(); scene.add(group);
    const inst = (SCENES[index] || SCENES[0]).build(THREE, group);
    const cam = inst.cam || { pos: [4.6, 3.5, 6.2], target: [0, 0.1, 0] };
    camera.position.set(cam.pos[0], cam.pos[1], cam.pos[2]);
    camera.lookAt(cam.target[0], cam.target[1], cam.target[2]);

    let raf, last = performance.now();
    const tick = () => {
      const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now;
      const p = Math.min(1, Math.max(0, progressRef.current || 0));
      inst.update(p, dt, now);
      group.scale.setScalar(p >= 1 ? 1 + Math.sin(now * 0.006) * 0.02 : 1);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => { W = mount.clientWidth; H = mount.clientHeight; if (!W || !H) return; camera.aspect = W / H; camera.updateProjectionMatrix(); renderer.setSize(W, H); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement); };
  }, []);
  return html`<div ref=${mountRef} style=${{ width: '100%', height: '100%' }} />`;
}

/* --- ambient backdrop --- */
function LoaderBg() {
  const orb = (style, anim, dur) => html`<${M.div} aria-hidden="true"
    animate=${reduceMotion ? {} : anim} transition=${{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    style=${{ position: 'absolute', borderRadius: '50%', filter: 'blur(30px)', pointerEvents: 'none', ...style }} />`;
  return html`<div aria-hidden="true" style=${{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <${M.div}
      animate=${reduceMotion ? {} : { x: [0, 60], y: [0, 60] }} transition=${{ duration: 16, repeat: Infinity, ease: 'linear' }}
      style=${{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%',
        backgroundImage: 'linear-gradient(rgba(248,244,239,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(248,244,239,0.02) 1px, transparent 1px)',
        backgroundSize: '64px 64px' }} />
    ${orb({ top: '-14%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(193,102,61,0.18) 0%, transparent 65%)' }, { x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }, 16)}
    ${orb({ bottom: '-18%', left: '-12%', width: 540, height: 540, background: 'radial-gradient(circle, rgba(106,147,199,0.15) 0%, transparent 65%)' }, { x: [0, -34, 0], y: [0, -26, 0], scale: [1, 1.15, 1] }, 20)}
  </div>`;
}

function BootStep({ step, status, index }) {
  const done = status === 'done', active = status === 'active';
  const icon = done
    ? html`<${M.span} initial=${{ scale: 0 }} animate=${{ scale: 1 }} transition=${{ type: 'spring', stiffness: 500, damping: 22 }}
        style=${{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(111,168,138,0.18)', border: '1px solid ' + C.green, color: C.green, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓<//>`
    : active
    ? html`<${M.span} animate=${reduceMotion ? {} : { rotate: 360 }} transition=${{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        style=${{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(226,161,132,0.25)', borderTopColor: C.terra2, flexShrink: 0 }} />`
    : html`<span style=${{ width: 18, height: 18, borderRadius: '50%', border: '1px solid rgba(248,244,239,0.16)', flexShrink: 0 }} />`;
  return html`<${M.div}
    initial=${{ opacity: 0, x: -12 }} animate=${{ opacity: 1, x: 0 }} transition=${{ duration: 0.4, delay: 0.15 + index * 0.05 }}
    style=${{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0' }}>
    ${icon}
    <span style=${{ fontFamily: mono, fontSize: 13, color: done || active ? C.cream : 'rgba(248,244,239,0.4)', flex: 1, transition: 'color .3s' }}>${step.label}</span>
    <span style=${{ fontFamily: mono, fontSize: 11, color: done ? C.green : active ? C.terra2 : 'rgba(248,244,239,0.25)' }}>${done ? 'done' : active ? step.detail : '·'}</span>
  <//>`;
}

function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const progressRef = useRef(0);
  const [sceneIdx] = useState(pickSceneIndex);
  const sceneName = (SCENES[sceneIdx] || SCENES[0]).name;

  useEffect(() => {
    const boot = document.getElementById('boot');
    if (boot) boot.style.display = 'none';
    let raf, start;
    const finish = () => { if (!done) { setDone(true); setTimeout(onDone, 620); } };
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / LOADER_MS);
      progressRef.current = p;
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick); else finish();
    };
    raf = requestAnimationFrame(tick);
    const skip = () => finish();
    const el = document.getElementById('loaderSkip');
    if (el) el.addEventListener('click', skip);
    return () => { cancelAnimationFrame(raf); if (el) el.removeEventListener('click', skip); };
  }, []);

  const active = BOOT_STEPS.findIndex((s) => pct < s.at);
  const stepStatus = (i) => (pct >= BOOT_STEPS[i].at ? 'done' : i === active ? 'active' : 'pending');
  const statusLabel = active === -1 ? 'ready' : BOOT_STEPS[active].label.toLowerCase();

  return html`<${M.div}
    initial=${{ opacity: 1 }} exit=${{ opacity: 0, scale: 1.03 }} transition=${{ duration: 0.6, ease: EASE }}
    style=${{ position: 'fixed', inset: 0, zIndex: 300, background: '#0A1220', overflow: 'hidden', fontFamily: mono,
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <${LoaderBg} />
    <!-- vignette for readability -->
    <div style=${{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 45%, rgba(10,18,32,0.35) 0%, rgba(10,18,32,0.82) 100%)', pointerEvents: 'none' }} />

    <div className="loader-inner" style=${{ position: 'relative', zIndex: 2, width: 'min(920px, 92vw)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px,5vw,64px)', alignItems: 'center' }}>
      <!-- left: 3D assembling cube + brand -->
      <${M.div} initial=${{ opacity: 0, y: 20 }} animate=${{ opacity: 1, y: 0 }} transition=${{ duration: 0.7, ease: EASE }}
        style=${{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style=${{ width: 'min(340px, 76vw)', height: 'min(300px, 66vw)', position: 'relative' }}>
          <${Scene3D} progressRef=${progressRef} index=${sceneIdx} />
          <!-- percent overlaid at the corner, tabular -->
          <div style=${{ position: 'absolute', left: 0, bottom: 0, display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style=${{ fontSize: 34, fontWeight: 800, color: C.cream, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>${String(pct).padStart(2, '0')}<span style=${{ color: C.terra2, fontSize: 18 }}>%</span></span>
          </div>
          <div style=${{ position: 'absolute', right: 0, bottom: 6, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(248,244,239,0.4)' }}>${done ? 'complete' : 'building ' + sceneName}</div>
        </div>
        <div style=${{ marginTop: 20, fontSize: 'clamp(34px,6vw,46px)', fontWeight: 800, color: C.cream, letterSpacing: 1, lineHeight: 1 }}>db<span style=${{ color: C.terra }}>.</span>dev</div>
        <div style=${{ marginTop: 10, fontSize: 11, letterSpacing: '0.28em', color: C.terra2, textTransform: 'uppercase' }}>DB Labs — Creative Dev Studio</div>
        <div style=${{ marginTop: 12, fontSize: 12, letterSpacing: '0.12em', color: 'rgba(248,244,239,0.5)', minHeight: 16 }}>${'> '}${statusLabel}<span className="terminal-cursor">_</span></div>
      <//>

      <!-- right: boot log + tech -->
      <${M.div} className="loader-panel" initial=${{ opacity: 0, y: 20 }} animate=${{ opacity: 1, y: 0 }} transition=${{ duration: 0.7, delay: 0.15, ease: EASE }}
        style=${{ background: 'rgba(14,26,46,0.6)', border: '1px solid rgba(248,244,239,0.10)', borderRadius: 16, padding: '22px 24px', backdropFilter: 'blur(6px)' }}>
        <div style=${{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style=${{ fontSize: 12, letterSpacing: '0.14em', color: 'rgba(248,244,239,0.45)' }}>// system boot</span>
          <span style=${{ fontSize: 11, color: C.green }}>● live</span>
        </div>
        <div>${BOOT_STEPS.map((s, i) => html`<${BootStep} key=${i} step=${s} status=${stepStatus(i)} index=${i} />`)}</div>
        <div style=${{ height: 1, background: 'rgba(248,244,239,0.08)', margin: '14px 0' }} />
        <div style=${{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          ${BOOT_TECH.map((t, i) => html`<${M.span} key=${t} initial=${{ opacity: 0, scale: 0.8 }} animate=${{ opacity: 1, scale: 1 }} transition=${{ delay: 0.5 + i * 0.09, duration: 0.4 }}
            style=${{ fontSize: 11, color: 'rgba(248,244,239,0.72)', border: '1px solid rgba(248,244,239,0.14)', borderRadius: 20, padding: '4px 11px' }}>${t}<//>`)}
        </div>
      <//>
    </div>

    <!-- bottom bar -->
    <div style=${{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2, padding: 'clamp(16px,3vw,24px) clamp(20px,5vw,40px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      <span style=${{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(248,244,239,0.34)' }}>Created by <span style=${{ color: C.terra, fontWeight: 700 }}>DB Labs</span></span>
      <div style=${{ flex: 1, maxWidth: 280, height: 2, background: 'rgba(248,244,239,0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <div style=${{ height: '100%', width: pct + '%', background: 'linear-gradient(90deg,' + C.terra + ',' + C.terra2 + ')', boxShadow: '0 0 10px rgba(193,102,61,0.6)' }} />
      </div>
      <button id="loaderSkip" style=${{ background: 'transparent', border: '1px solid rgba(248,244,239,0.16)', color: 'rgba(248,244,239,0.5)', fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', padding: '7px 14px', borderRadius: 6, cursor: 'pointer' }}>skip →</button>
    </div>

    <style>${'@media(max-width:760px){.loader-inner{grid-template-columns:1fr!important;text-align:center}.loader-panel{display:none!important}}'}</style>
  <//>`;
}

const seenLoader = (() => { try { return sessionStorage.getItem('db_booted') === '1'; } catch (e) { return false; } })();
function App() {
  const [booted, setBooted] = useState(seenLoader);
  useEffect(() => { const boot = document.getElementById('boot'); if (boot) boot.style.display = 'none'; }, []);
  useEffect(() => { document.body.style.overflow = booted ? '' : 'hidden'; }, [booted]);
  const finishBoot = () => { try { sessionStorage.setItem('db_booted', '1'); } catch (e) {} setBooted(true); };
  return html`<${React.Fragment}>
    ${booted && html`<${React.Fragment}>
      <${ScrollProgress} />
      <${Nav} />
      <${Hero} />
      <${Marquee} />
      <${Stats} />
      <${Work} />
      <${Testimonials} />
      <${About} />
      <${Process} />
      <${Skills} />
      <${Contact} />
      <${Footer} />
      <${BackToTop} />
      <${Grain} />
      <${CursorFX} />
    <//>`}
    <${AnimatePresence}>
      ${!booted && html`<${Loader} key="loader" onDone=${finishBoot} />`}
    <//>
  <//>`;
}

/* ---------------- boot ---------------- */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(html`<${App} />`);
