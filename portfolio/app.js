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
    tags: ['POS', 'ZATCA', 'VAT'] },
  { id: 'agent', n: '02', name: 'DB Agent', initials: 'DB', accent: '#6A93C7', link: './projects/db-agent/',
    tagline: 'Backend automation for repetitive work',
    blurb: 'A personal automation agent that syncs data, processes orders and forms, and fires notifications — running unattended.',
    tags: ['Automation', 'Node', 'Integrations'] },
  { id: 'baloot', n: '03', name: 'Baloot', initials: 'BL', accent: '#C89B3C', link: './projects/baloot/',
    tagline: 'Real-time multiplayer card game',
    blurb: 'A mobile multiplayer take on the Gulf classic — live matchmaking, a full rules engine, private tables and invites.',
    tags: ['Realtime', 'Multiplayer', 'Game'] },
  { id: 'mathbro', n: '04', name: 'Mathbro', initials: 'MB', accent: '#6FA88A', link: './projects/mathbro/',
    tagline: 'Gamified math practice for kids',
    blurb: 'Math practice that plays like a game — levels, rewards and a parent progress view, working even offline.',
    tags: ['EdTech', 'Gamified', 'Kids'] },
  { id: 'site', n: '05', name: 'Web Studio', initials: 'WS', accent: '#8E7CC3', link: './projects/web-studio/',
    tagline: 'Fast custom sites for founders',
    blurb: 'Custom personal and business sites, coded from scratch to match the brand — fast, SEO-clean and easy to hand off.',
    tags: ['Web', 'SEO', 'Design'] },
  { id: 'social', n: '06', name: 'DB Social', initials: 'SM', accent: '#E2604A', link: './projects/social/',
    tagline: 'Content systems for client accounts',
    blurb: 'Ongoing content systems — planning, automated publishing and reporting, so accounts stay consistent without daily effort.',
    tags: ['Content', 'Scheduling', 'Analytics'] },
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
const LOADER_MS = reduceMotion ? 1200 : 7000;

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
const BOOT_TOKENS = ['{ }', '</>', ';', '=>', 'const', '()', '#', '$', '[ ]', '01', '&&', '::', 'fn', '<•>'];

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
        <a href="#contact" style=${{ background: 'transparent', border: '1px solid ' + C.terra, color: C.terra, textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 5, marginLeft: 8, fontFamily: mono }}>contact()</a>
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
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, 120]);
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
    <section id="top" ref=${ref} style=${{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden',
      paddingTop: 96, background: C.navy,
      backgroundImage: 'linear-gradient(rgba(248,244,239,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(248,244,239,0.05) 1px, transparent 1px)',
      backgroundSize: '40px 40px' }}>

      <${M.div} style=${{ position: 'absolute', top: -140, right: -120, width: 500, height: 500, borderRadius: '50%', y: yGlow,
        background: 'radial-gradient(circle, rgba(193,102,61,0.32) 0%, rgba(193,102,61,0) 70%)', zIndex: 0 }} />
      <${M.div} style=${{ position: 'absolute', bottom: -160, left: -100, width: 420, height: 420, borderRadius: '50%', y: yGrid,
        background: 'radial-gradient(circle, rgba(106,147,199,0.22) 0%, transparent 70%)', zIndex: 0 }} />

      <${M.div} className="wrap hero-grid" style=${{ position: 'relative', zIndex: 2, y: yContent, opacity: fade }}>
        <${M.div} variants=${container} initial="hidden" animate="show">
          <${M.div} variants=${up} style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(193,102,61,0.15)', border: '1px solid rgba(193,102,61,0.4)', color: C.terra2, fontFamily: mono, fontSize: 13, fontWeight: 500, padding: '7px 16px', borderRadius: 5, marginBottom: 26 }}>${'> whoami: full-stack developer'}</>
          <${M.h1} variants=${up} style=${{ fontFamily: mono, fontSize: 'clamp(28px,4.4vw,40px)', lineHeight: 1.32, fontWeight: 700, letterSpacing: '-0.02em', color: C.cream, margin: '0 0 22px' }}>
            <span style=${{ color: C.blue }}>const</span> services = <span style=${{ color: C.terra }}>DB Labs</span><br/>.<span style=${{ color: C.terra2 }}>buildEverything</span>()<span>;</span>
          </>
          <${M.p} variants=${up} style=${{ fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.6, color: 'rgba(248,244,239,0.68)', maxWidth: 470, margin: '0 0 36px' }}>
            I design and build products for restaurants, communities and startups — from POS systems to social apps — end to end.
          </>
          <${M.div} variants=${up} style=${{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <${M.a} href="#contact" whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }} style=${{ background: C.terra, color: C.cream, textDecoration: 'none', fontFamily: mono, fontSize: 15, fontWeight: 600, padding: '15px 26px', borderRadius: 6, boxShadow: '0 12px 30px rgba(193,102,61,0.35)' }}>book_a_call()</>
            <${M.a} href="#work" whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }} style=${{ background: 'transparent', color: C.cream, textDecoration: 'none', fontFamily: mono, fontSize: 15, fontWeight: 600, padding: '15px 26px', borderRadius: 6, border: '1px solid rgba(248,244,239,0.3)' }}>see_my_work()</>
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
  return html`<section style=${{ background: C.navy2, padding: '0' }}>
    <div className="wrap" style=${{ padding: '0 clamp(20px,5vw,48px)' }}>
      <div className="stats-grid" style=${{ background: 'rgba(248,244,239,0.08)', borderRadius: 0 }}>
        ${STATS.map((s, i) => html`<${Reveal} key=${s.label} delay=${i * 0.08} style=${{ background: C.navy2 }}>
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
function WorkCard({ item, i }) {
  const [hover, setHover] = useState(false);
  return html`<${M.a}
    href=${item.link} target="_blank" rel="noopener"
    onMouseEnter=${() => setHover(true)} onMouseLeave=${() => setHover(false)}
    initial=${{ opacity: 0, y: 46 }}
    whileInView=${{ opacity: 1, y: 0 }}
    viewport=${{ once: true, margin: '-60px' }}
    transition=${{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
    whileHover=${{ y: -8 }}
    style=${{ display: 'block', textDecoration: 'none', position: 'relative', borderRadius: 16, overflow: 'hidden',
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
        Visit site <span>↗</span>
      <//>
    </div>
  <//>`;
}

function Work() {
  return html`<section id="work" style=${{ padding: '96px 0 88px', background: 'linear-gradient(150deg, #2B1B14 0%, #3A2418 45%, #1D2A3F 100%)', position: 'relative', overflow: 'hidden' }}>
    <${M.div} animate=${reduceMotion ? {} : { y: [0, 30, 0] }} transition=${{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} style=${{ position: 'absolute', top: -80, left: -100, width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(193,102,61,0.28) 0%, transparent 70%)' }} />
    <div className="wrap" style=${{ position: 'relative', zIndex: 1 }}>
      <${Reveal} style=${{ marginBottom: 52 }}>
        <div style=${{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style=${{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: C.terra2, marginBottom: 12 }}>// 01. selected work</div>
            <h2 style=${{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: C.cream }}>Projects built for real clients</h2>
          </div>
          <p style=${{ maxWidth: 380, color: 'rgba(248,244,239,0.6)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>Point-of-sale systems, automation agents, games and sites — each one has its own live microsite. Tap to open.</p>
        </div>
      <//>
      <div className="work-grid">
        ${WORK_ITEMS.map((item, i) => html`<${WorkCard} key=${item.id} item=${item} i=${i} />`)}
      </div>
    </div>
  </section>`;
}

/* ---------------- ABOUT ---------------- */
function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], [50, -50]);
  return html`<section id="about" ref=${ref} style=${{ padding: '96px 0', background: 'linear-gradient(150deg, #1D2A3F 0%, #26344B 45%, #2B1B14 100%)', position: 'relative', overflow: 'hidden' }}>
    <div className="wrap about-grid">
      <${Reveal} y=${0}>
        <${M.div} style=${{ y: yImg, position: 'relative', aspectRatio: '1/1', maxHeight: 380, borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(248,244,239,0.12)',
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(193,102,61,0.2) 0px, rgba(193,102,61,0.2) 2px, rgba(248,244,239,0.03) 2px, rgba(248,244,239,0.03) 24px)' }}>
          <div style=${{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style=${{ fontFamily: mono, fontSize: 13, color: C.cream, background: 'rgba(19,31,53,0.75)', padding: '8px 16px', borderRadius: 6 }}>workspace photo</span>
          </div>
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
  return html`<section id="skills" style=${{ padding: '84px 0 100px', background: C.cream, backgroundImage: 'radial-gradient(rgba(23,35,58,0.07) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
    <div className="wrap">
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
function Contact() {
  const [country, setCountry] = useState('sa');
  const [f, setF] = useState({ name: '', email: '', type: '', msg: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const build = () => [
    "Hi DB Labs! I'd like to work together.",
    f.name && `Name: ${f.name}`,
    f.email && `Email: ${f.email}`,
    f.type && `Project: ${f.type}`,
    f.msg && `Notes: ${f.msg}`,
  ].filter(Boolean).join('\n');
  const wa = (e) => { e.preventDefault(); window.open(`https://wa.me/${WHATSAPP_NUMBERS[country]}?text=${encodeURIComponent(build())}`, '_blank', 'noopener'); };
  const mail = () => { window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(build())}`; };

  const input = { padding: '15px 18px', borderRadius: 10, border: '1px solid rgba(23,35,58,0.15)', fontFamily: 'Inter, sans-serif', fontSize: 15, background: '#fff', color: C.navy2, width: '100%' };
  const cbtn = (c, label) => html`<button type="button" onClick=${() => setCountry(c)} style=${{ fontFamily: mono, fontSize: 13, fontWeight: 600, padding: '10px 16px', borderRadius: 9, cursor: 'pointer',
    border: '1px solid ' + (country === c ? C.terra : 'rgba(23,35,58,0.15)'), background: country === c ? 'rgba(193,102,61,0.1)' : '#fff', color: country === c ? C.terra : '#5B6472' }}>${label}</button>`;

  return html`<section id="contact" style=${{ padding: '110px 0', background: C.cream }}>
    <${Reveal} className="wrap" style=${{ maxWidth: 660 }}>
      <div style=${{ textAlign: 'center', marginBottom: 44 }}>
        <div style=${{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: C.terra, marginBottom: 14 }}>// 04. contact</div>
        <h2 style=${{ fontSize: 'clamp(28px,3.6vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px', color: C.navy2 }}>Let's build something</h2>
        <p style=${{ fontSize: 16, color: '#5B6472', margin: 0 }}>Fill this in and reach me on WhatsApp or by email — I reply within a day.</p>
      </div>
      <form onSubmit=${wa} style=${{ display: 'flex', flexDirection: 'column', gap: 18 }}>
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
        <div>
          <div style=${{ fontFamily: mono, fontSize: 12, color: '#5B6472', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Reach me on</div>
          <div style=${{ display: 'flex', gap: 10 }}>${cbtn('sa', '🇸🇦 Saudi Arabia')}${cbtn('in', '🇮🇳 India')}</div>
        </div>
        <div style=${{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
          <${M.button} type="submit" whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }} style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#04110a', border: 'none', fontFamily: mono, fontSize: 15, fontWeight: 700, padding: '15px 26px', borderRadius: 30, cursor: 'pointer' }}>💬 Send on WhatsApp</>
          <${M.button} type="button" onClick=${mail} whileHover=${{ y: -3 }} whileTap=${{ scale: 0.97 }} style=${{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.terra, color: C.cream, border: 'none', fontFamily: mono, fontSize: 15, fontWeight: 600, padding: '15px 26px', borderRadius: 30, cursor: 'pointer' }}>✉️ Send by email</>
        </div>
      </form>
    <//>
  </section>`;
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return html`<footer style=${{ background: C.navy2, padding: '38px clamp(20px,5vw,48px)' }}>
    <div className="wrap footer-row" style=${{ padding: 0 }}>
      <div style=${{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
        <span style=${{ color: 'rgba(248,244,239,0.5)', fontFamily: mono, fontSize: 13 }}>© 2026 db.dev · Created by <span style=${{ color: C.terra2, fontWeight: 600 }}>DB Labs</span></span>
      </div>
      <span style=${{ color: 'rgba(248,244,239,0.35)', fontFamily: mono, fontSize: 12 }}>${'<built_with_care />'}</span>
      <a href="#contact" style=${{ color: C.terra2, fontFamily: mono, fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>contact() →</a>
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
   LOADER — 7s Framer Motion boot sequence with living background
   ============================================================ */
const VH = (typeof window !== 'undefined' ? window.innerHeight : 800);
const ORBIT_DOTS = Array.from({ length: 10 }, (_, i) => ({ a: (i / 10) * 360, c: [C.terra, C.blue, C.terra2, C.green][i % 4], r: 3 + (i % 3) }));
const TOKEN_DATA = BOOT_TOKENS.map((t, i) => ({
  t, left: (i * 6.7 + 4) % 96, size: 12 + (i % 4) * 5,
  delay: (i % 7) * 0.9, dur: 8 + (i % 5) * 2.4, tilt: (i % 2 ? 1 : -1) * (6 + (i % 4) * 5),
}));

/* --- animated background, all Framer Motion --- */
function LoaderBg() {
  const orb = (style, anim, dur) => html`<${M.div} aria-hidden="true"
    animate=${reduceMotion ? {} : anim} transition=${{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    style=${{ position: 'absolute', borderRadius: '50%', filter: 'blur(20px)', pointerEvents: 'none', ...style }} />`;
  return html`<div aria-hidden="true" style=${{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    <!-- drifting grid -->
    <${M.div}
      animate=${reduceMotion ? {} : { x: [0, 46], y: [0, 46] }} transition=${{ duration: 6, repeat: Infinity, ease: 'linear' }}
      style=${{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%',
        backgroundImage: 'linear-gradient(rgba(248,244,239,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(248,244,239,0.045) 1px, transparent 1px)',
        backgroundSize: '46px 46px' }} />
    <!-- soft drifting orbs -->
    ${orb({ top: '-12%', right: '-8%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(193,102,61,0.22) 0%, transparent 65%)' }, { x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }, 12)}
    ${orb({ bottom: '-16%', left: '-10%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(106,147,199,0.18) 0%, transparent 65%)' }, { x: [0, -34, 0], y: [0, -26, 0], scale: [1, 1.15, 1] }, 15)}
    ${orb({ top: '30%', left: '40%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(111,168,138,0.12) 0%, transparent 65%)' }, { x: [0, 30, 0], y: [0, -20, 0] }, 18)}
    <!-- rising code tokens -->
    ${TOKEN_DATA.map((k, i) => html`<${M.span} key=${i}
      animate=${reduceMotion ? {} : { y: [0, -(VH + 240)], opacity: [0, 0.5, 0.5, 0], rotate: [0, k.tilt] }}
      transition=${{ duration: k.dur, repeat: Infinity, ease: 'linear', delay: k.delay }}
      style=${{ position: 'absolute', top: '100%', left: k.left + '%', fontFamily: mono, fontSize: k.size, fontWeight: 600, color: 'rgba(226,161,132,0.45)', userSelect: 'none' }}>${k.t}<//>`)}
    <!-- radar pulses behind the logo -->
    ${[0, 1, 2].map((i) => html`<${M.div} key=${'r' + i}
      animate=${reduceMotion ? {} : { scale: [0.5, 2.4], opacity: [0.45, 0] }}
      transition=${{ duration: 3.6, repeat: Infinity, ease: 'easeOut', delay: i * 1.2 }}
      style=${{ position: 'absolute', top: '50%', left: '50%', width: 220, height: 220, marginLeft: -110, marginTop: -110, borderRadius: '50%', border: '1px solid rgba(193,102,61,0.4)' }} />`)}
    <!-- scan sweep -->
    <${M.div} animate=${reduceMotion ? {} : { y: ['-10%', '110%'] }} transition=${{ duration: 5, repeat: Infinity, ease: 'linear' }}
      style=${{ position: 'absolute', left: 0, right: 0, height: 160, background: 'linear-gradient(rgba(193,102,61,0) 0%, rgba(193,102,61,0.05) 50%, rgba(193,102,61,0) 100%)' }} />
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

  useEffect(() => {
    const boot = document.getElementById('boot');
    if (boot) boot.style.display = 'none';
    let raf, start;
    const finish = () => { if (!done) { setDone(true); setTimeout(onDone, 620); } };
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / LOADER_MS);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick); else finish();
    };
    raf = requestAnimationFrame(tick);
    const skip = () => finish();
    const el = document.getElementById('loaderSkip');
    if (el) el.addEventListener('click', skip);
    return () => { cancelAnimationFrame(raf); if (el) el.removeEventListener('click', skip); };
  }, []);

  const R = 80, CIRC = 2 * Math.PI * R;
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
      <!-- left: ring + brand -->
      <${M.div} initial=${{ opacity: 0, y: 20 }} animate=${{ opacity: 1, y: 0 }} transition=${{ duration: 0.7, ease: EASE }}
        style=${{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style=${{ position: 'relative', width: 180, height: 180 }}>
          <${M.div} animate=${reduceMotion ? {} : { rotate: 360 }} transition=${{ duration: 24, repeat: Infinity, ease: 'linear' }} style=${{ position: 'absolute', inset: 0 }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="88" fill="none" stroke="rgba(248,244,239,0.06)" strokeWidth="1" strokeDasharray="2 7" />
            </svg>
          <//>
          <svg width="180" height="180" viewBox="0 0 180 180" style=${{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor=${C.terra} /><stop offset="1" stopColor=${C.terra2} />
              </linearGradient>
            </defs>
            <circle cx="90" cy="90" r=${R} fill="none" stroke="rgba(248,244,239,0.08)" strokeWidth="4" />
            <circle cx="90" cy="90" r=${R} fill="none" stroke="url(#ringg)" strokeWidth="4" strokeLinecap="round"
              strokeDasharray=${CIRC} strokeDashoffset=${CIRC * (1 - pct / 100)}
              style=${{ filter: 'drop-shadow(0 0 6px rgba(193,102,61,0.6))', transition: 'stroke-dashoffset .1s linear' }} />
          </svg>
          <!-- percentage, centered with flexbox (cannot drift) -->
          <div style=${{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style=${{ fontSize: 44, fontWeight: 800, color: C.cream, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>${pct}<span style=${{ color: C.terra2, fontSize: 20 }}>%</span></span>
            <span style=${{ marginTop: 6, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(248,244,239,0.4)' }}>loading</span>
          </div>
          <!-- orbiting dots -->
          <${M.div} animate=${reduceMotion ? {} : { rotate: 360 }} transition=${{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style=${{ position: 'absolute', inset: 0 }}>
            ${ORBIT_DOTS.map((d, i) => html`<span key=${i} style=${{ position: 'absolute', top: '50%', left: '50%', width: d.r * 2, height: d.r * 2, marginLeft: -d.r, marginTop: -d.r, borderRadius: '50%', background: d.c, transform: 'rotate(' + d.a + 'deg) translateX(90px)', boxShadow: '0 0 8px ' + d.c }} />`)}
          <//>
        </div>
        <div style=${{ marginTop: 30, fontSize: 'clamp(34px,6vw,46px)', fontWeight: 800, color: C.cream, letterSpacing: 1, lineHeight: 1 }}>db<span style=${{ color: C.terra }}>.</span>dev</div>
        <div style=${{ marginTop: 10, fontSize: 11, letterSpacing: '0.28em', color: C.terra2, textTransform: 'uppercase' }}>DB Labs — Creative Dev Studio</div>
        <div style=${{ marginTop: 16, fontSize: 12, letterSpacing: '0.12em', color: 'rgba(248,244,239,0.5)', minHeight: 16 }}>${'> '}${statusLabel}<span className="terminal-cursor">_</span></div>
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

function App() {
  const [booted, setBooted] = useState(false);
  useEffect(() => { document.body.style.overflow = booted ? '' : 'hidden'; }, [booted]);
  return html`<${React.Fragment}>
    ${booted && html`<${React.Fragment}>
      <${ScrollProgress} />
      <${Nav} />
      <${Hero} />
      <${Marquee} />
      <${Stats} />
      <${Work} />
      <${About} />
      <${Skills} />
      <${Contact} />
      <${Footer} />
    <//>`}
    <${AnimatePresence}>
      ${!booted && html`<${Loader} key="loader" onDone=${() => setBooted(true)} />`}
    <//>
  <//>`;
}

/* ---------------- boot ---------------- */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(html`<${App} />`);
