'use strict';

/* ============================================================
   RestoPOS portfolio — db.dev
   Vanilla-JS reimplementation of the Claude Design component.
   ============================================================ */

const OWNER_EMAIL = 'hello@dbdev.io';
const WHATSAPP_NUMBERS = { sa: '966538360053', in: '918848095603' };
// The live RestoPOS marketing site. Tapping the Restopos project opens this.
const RESTOPOS_URL = 'https://resto-pos-landing.vercel.app/';

const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, style, html) => {
  const n = document.createElement(tag);
  if (style) n.style.cssText = style;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ---------- Data ---------- */
const solid = (c) => `linear-gradient(135deg, ${c} 0%, #17233A 130%)`;

const WORK_ITEMS = [
  {
    id: 'restopos', name: 'Restopos', initials: '', pattern: "url('./assets/restopos-logo.png')",
    link: RESTOPOS_URL,
    tagline: 'POS & VAT compliance for Saudi retail',
    detail: "Restopos is billing and point-of-sale software built for local Saudi stores. It handles day-to-day checkout and invoicing, then automatically calculates VAT on every sale, generates ZATCA-compliant e-invoices for customers, and compiles the periodic tax reports the business submits to the Saudi government — so store owners stay compliant without manual bookkeeping.",
    bullets: [
      'Fast in-store checkout and invoice generation for retail and restaurant counters',
      'Automatic VAT calculation on every transaction, per Saudi (ZATCA) e-invoicing rules',
      'Government-ready tax reports compiled and exported on a set schedule',
      'Sales, inventory and daily revenue dashboards for the store owner'
    ]
  },
  {
    id: 'agent', name: 'DB Agent', initials: 'DB', pattern: solid('#6A93C7'),
    link: './projects/db-agent/',
    tagline: 'Backend automation for repetitive workflows',
    detail: "A backend automation agent that takes over repetitive operational work — syncing data between tools, processing incoming orders or forms, and triggering the right notifications — so client teams stop doing it by hand.",
    bullets: [
      'Connects and syncs data across the client’s existing tools and spreadsheets',
      'Processes incoming orders, forms or messages on a schedule or trigger',
      'Sends automatic notifications and status updates to staff or customers',
      'Built and hosted to run unattended, with basic error alerts'
    ]
  },
  {
    id: 'baloot', name: 'Baloot', initials: 'BL', pattern: solid('#E2A184'),
    link: './projects/baloot/',
    tagline: 'Real-time multiplayer card game',
    detail: "Baloot is a mobile multiplayer card game built around the traditional Gulf card game of the same name, with real-time matchmaking so friends and strangers can play together instantly.",
    bullets: [
      'Real-time multiplayer with live matchmaking and rooms',
      'Full Baloot rules engine with scoring and bidding',
      'Mobile-first interface built for quick casual sessions',
      'Friend invites and private table codes'
    ]
  },
  {
    id: 'mathbro', name: 'Mathbro', initials: 'MB', pattern: solid('#C1663D'),
    link: './projects/mathbro/',
    tagline: 'Gamified math practice for kids',
    detail: "Mathbro turns math practice into a game — kids solve problems to progress through levels and earn rewards, while parents get a simple view of progress over time.",
    bullets: [
      'Level-based math challenges tuned to different grade levels',
      'Reward and progress system to keep kids motivated',
      'Parent-facing progress view',
      'Works offline for practice without a connection'
    ]
  },
  {
    id: 'site', name: 'Personal Website', initials: 'PW', pattern: solid('#6A93C7'),
    link: './projects/web-studio/',
    tagline: 'Fast custom sites for founders and creators',
    detail: "A fast, custom-built personal or business website — designed and coded from scratch to match the client's brand, optimized for speed and search, and easy to hand off or update after launch.",
    bullets: [
      'Custom design matched to the client’s brand, not a generic template',
      'Built for speed and clean SEO out of the box',
      'Contact/booking forms wired up and ready to use',
      'Simple handoff so the client can update content after launch'
    ]
  },
  {
    id: 'social', name: 'Social Media Handling', initials: 'SM', pattern: solid('#E2A184'),
    link: './projects/social/',
    tagline: 'Content systems for client accounts',
    detail: "Ongoing content systems and scheduling tools for client social accounts — planning posts, automating publishing, and reporting on what's working, so clients get consistent output without doing it manually every day.",
    bullets: [
      'Content calendar and scheduling across platforms',
      'Automated publishing pipeline',
      'Performance reporting on reach and engagement',
      'Reusable templates for recurring post types'
    ]
  }
];

const SKILLS = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'Stripe'];

const CALC_SERVICES = [
  { id: 'pos', name: 'POS & Billing' },
  { id: 'website', name: 'Website' },
  { id: 'game', name: 'Game Dev' },
  { id: 'agent', name: 'Automation Agent' },
  { id: 'social', name: 'Social Media' }
];
const SHOP_TYPES = [
  { id: 'restaurant', label: 'Restaurant' }, { id: 'cafe', label: 'Cafe' },
  { id: 'supermarket', label: 'Supermarket' }, { id: 'pharmacy', label: 'Pharmacy' }, { id: 'other', label: 'Other' }
];
const POS_PLANS = [
  { name: 'Basic', price: 25, features: ['Single register checkout', 'Digital receipts', 'Basic sales log'] },
  { name: 'Standard', price: 49, features: ['VAT calculation & e-invoicing', 'Inventory tracking', 'Multi-staff logins'] },
  { name: 'Professional', price: 79, features: ['Government tax report automation', 'Multi-location sync', 'Priority support'] }
];
const WEBSITE_FEATURES = [
  { id: 'homepage', label: 'Homepage design' }, { id: 'pages', label: 'Multiple pages (up to 5)' },
  { id: 'blog', label: 'Blog / CMS' }, { id: 'contact', label: 'Contact form' },
  { id: 'booking', label: 'Booking / scheduling' }, { id: 'seo', label: 'SEO optimization' },
  { id: 'store', label: 'Online store' }, { id: 'animations', label: 'Custom animations' }
];
const AGENT_FEATURES = [
  { id: 'sync', label: 'Data sync automation' }, { id: 'orders', label: 'Order / form processing' },
  { id: 'alerts', label: 'Notifications & alerts' }, { id: 'reports', label: 'Automated reporting' },
  { id: 'chatbot', label: 'Customer support chatbot' }, { id: 'scheduling', label: 'Scheduling automation' },
  { id: 'integrations', label: 'Third-party API integrations' }, { id: 'custom-ai', label: 'Custom AI workflows' }
];
const SOCIAL_FEATURES = [
  { id: 'calendar', label: 'Content calendar & scheduling' }, { id: 'design', label: 'Post design / graphics' },
  { id: 'instagram', label: 'Instagram management' }, { id: 'tiktok', label: 'TikTok management' },
  { id: 'twitter', label: 'X / Twitter management' }, { id: 'engagement', label: 'Community engagement & replies' },
  { id: 'reporting', label: 'Monthly analytics report' }, { id: 'ads', label: 'Paid ad boosting' }
];

/* Reusable button styles (from the source design) */
const activeBtn = "padding: 12px 14px; border-radius: 8px; border: 1px solid #C1663D; background: rgba(193,102,61,0.18); color: #F8F4EF; font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600; cursor: pointer; text-align: left;";
const idleBtn = "padding: 12px 14px; border-radius: 8px; border: 1px solid rgba(248,244,239,0.15); background: transparent; color: rgba(248,244,239,0.75); font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600; cursor: pointer; text-align: left;";
const activeCard = "padding: 20px; border-radius: 10px; border: 1px solid #C1663D; background: rgba(193,102,61,0.16); color: #F8F4EF; font-family: 'Inter', sans-serif; cursor: pointer; text-align: left;";
const idleCard = "padding: 20px; border-radius: 10px; border: 1px solid rgba(248,244,239,0.15); background: rgba(248,244,239,0.03); color: rgba(248,244,239,0.85); font-family: 'Inter', sans-serif; cursor: pointer; text-align: left;";
const waActiveBtn = "padding: 9px 14px; border-radius: 6px; border: 1px solid #C1663D; background: rgba(193,102,61,0.2); color: #F8F4EF; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600; cursor: pointer;";
const waIdleBtn = "padding: 9px 14px; border-radius: 6px; border: 1px solid rgba(248,244,239,0.15); background: transparent; color: rgba(248,244,239,0.6); font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600; cursor: pointer;";

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Particle canvas (hero, about, loader) ---------- */
function setupParticles(canvas) {
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  let width, height, particles = [], rafId = null;
  const colors = ['rgba(193,102,61,0.55)', 'rgba(106,147,199,0.5)', 'rgba(248,244,239,0.35)'];
  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = Math.max(1, Math.round(rect.width));
    height = canvas.height = Math.max(1, Math.round(rect.height));
    const count = Math.max(24, Math.round((width * height) / 28000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 1, color: colors[Math.floor(Math.random() * colors.length)]
    }));
  };
  const step = () => {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.strokeStyle = `rgba(226,161,132,${0.16 * (1 - dist / 130)})`;
          ctx.lineWidth = 1; ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const p of particles) {
      ctx.fillStyle = p.color; ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    rafId = requestAnimationFrame(step);
  };
  resize(); step();
  window.addEventListener('resize', resize);
  return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
}

/* ---------- Loader ---------- */
const LOADER_LINES = ['> booting portfolio...', '> npm run build...', '> compiling components...', '> resolving dependencies...', '> rendering projects...', '> optimizing assets...', '> running final checks...', '> ready.'];
const FALLING_TOKENS = ['{ }', '</>', '01', '10', 'fn()', '=>', '[ ]', 'git', 'npm', '$', '&&', 'API'];
const GLASS_BOX_LABELS = ['Restopos', 'DB Agent', 'Baloot', 'Mathbro', 'Personal Website', 'Social Media', 'React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Git'];
const CRACK_SVG_URL = `data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 50 L18 12 M50 50 L82 18 M50 50 L12 55 M50 50 L88 60 M50 50 L42 92 M50 50 L68 88 M50 50 L28 32 M50 50 L74 38 M50 50 L50 10' stroke='white' stroke-width='2.4' fill='none' opacity='0.95'/></svg>")}`;
const LOADER_TOTAL_MS = 15000;
const TOUCH_LIMIT = 7;
const getHue = (i) => Math.round((i * 137.5) % 360);

let loaderTimers = [];
let glassRaf = null;
const pendingTimers = [];

function buildFallingTokens() {
  const wrap = $('#fallingTokens');
  for (let i = 0; i < 14; i++) {
    const left = Math.round(Math.random() * 96);
    const delay = (Math.random() * 4).toFixed(2);
    const duration = (4 + Math.random() * 3).toFixed(2);
    const token = FALLING_TOKENS[i % FALLING_TOKENS.length];
    wrap.appendChild(el('div',
      `position: absolute; left: ${left}%; top: -40px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.28); animation: loaderFallDown ${duration}s linear ${delay}s infinite;`,
      token));
  }
}

function startGlassPhysics() {
  const container = $('#glassContainer');
  if (!container || reduceMotion) return;
  const boxEls = [], crackEls = [];
  GLASS_BOX_LABELS.forEach((label, i) => {
    const hue = getHue(i);
    const box = el('div',
      `position: absolute; top: 50%; left: 50%; transform-style: preserve-3d; will-change: transform; padding: 10px 18px; border-radius: 12px; background: hsla(${hue},75%,68%,0.24); backdrop-filter: blur(10px); border: 1px solid hsla(${hue},80%,80%,0.5); box-shadow: 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3); color: #F8F4EF; font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden;`,
      label);
    const crack = el('div', `position: absolute; inset: 0; background-image: url("${CRACK_SVG_URL}"); background-size: 160% 160%; background-position: center; background-repeat: no-repeat; opacity: 0; pointer-events: none;`);
    box.appendChild(crack);
    container.appendChild(box);
    boxEls.push(box); crackEls.push(crack);
  });

  const rect = container.getBoundingClientRect();
  const w = rect.width, h = rect.height;
  const shieldRadius = 220;
  const count = GLASS_BOX_LABELS.length;
  const state = GLASS_BOX_LABELS.map((_, i) => {
    const baseAngle = (i / count) * Math.PI * 2;
    const angle = baseAngle + (Math.random() - 0.5) * (Math.PI * 2 / count) * 0.7;
    const dist = shieldRadius + 80 + Math.random() * (Math.min(w, h) * 0.42);
    const speed = 35 + Math.random() * 45, dir = Math.random() * Math.PI * 2;
    return {
      x: w / 2 + Math.cos(angle) * dist, y: h / 2 + Math.sin(angle) * dist, z: (Math.random() - 0.5) * 240,
      vx: Math.cos(dir) * speed, vy: Math.sin(dir) * speed, vz: (Math.random() - 0.5) * 40,
      rx: Math.random() > 0.5 ? 1 : 0, ry: Math.random() > 0.5 ? 1 : 0, rz: Math.random() > 0.6 ? 1 : 0,
      wobbleAmp: 12 + Math.random() * 18, wobbleFreq: 0.25 + Math.random() * 0.35, wobblePhase: Math.random() * Math.PI * 2,
      scale: 0.85 + Math.random() * 0.3, hue: getHue(i), broken: false, touchCount: 0, lastHitAt: 0
    };
  });

  const spawnShards = (x, y, hue, nx, ny, half) => {
    if (half) {
      const perpX = -ny, perpY = nx;
      [{ dx: nx * 75 + perpX * 45, dy: ny * 75 + perpY * 45, rot: 55 }, { dx: nx * 75 - perpX * 45, dy: ny * 75 - perpY * 45, rot: -55 }].forEach((p) => {
        const shard = el('div', `position:absolute; left:${x}px; top:${y}px; width:36px; height:34px; background:hsla(${hue},70%,72%,0.22); border:1px solid hsla(${hue},80%,88%,0.55); border-radius:6px; backdrop-filter:blur(4px); transform:translate(-50%,-50%) rotate(0deg); opacity:1; pointer-events:none; --sx:${p.dx.toFixed(1)}px; --sy:${p.dy.toFixed(1)}px; --srot:${p.rot}deg; animation: shardFly 0.95s ease-out forwards;`);
        container.appendChild(shard);
        pendingTimers.push(setTimeout(() => shard.remove(), 1150));
      });
    } else {
      const n = 5 + Math.floor(Math.random() * 3), baseAngle = Math.atan2(ny, nx);
      for (let k = 0; k < n; k++) {
        const wd = 8 + Math.random() * 14, ht = 6 + Math.random() * 10;
        const angle = baseAngle + (Math.random() - 0.5) * 2.6, dist = 50 + Math.random() * 70;
        const sx = Math.cos(angle) * dist, sy = Math.sin(angle) * dist, srot = (Math.random() - 0.5) * 640;
        const dur = (0.7 + Math.random() * 0.4).toFixed(2);
        const shard = el('div', `position:absolute; left:${x}px; top:${y}px; width:${wd}px; height:${ht}px; background:hsla(${hue},75%,72%,0.5); border:1px solid hsla(${hue},80%,85%,0.6); border-radius:2px; transform:translate(-50%,-50%) rotate(0deg); opacity:1; pointer-events:none; --sx:${sx.toFixed(1)}px; --sy:${sy.toFixed(1)}px; --srot:${srot.toFixed(1)}deg; animation: shardFly ${dur}s ease-out forwards;`);
        container.appendChild(shard);
        pendingTimers.push(setTimeout(() => shard.remove(), 1300));
      }
    }
  };
  const respawn = (i) => {
    const s = state[i]; const box = boxEls[i];
    const r = container.getBoundingClientRect(), w2 = r.width, h2 = r.height;
    const baseAngle = (i / count) * Math.PI * 2;
    const angle = baseAngle + (Math.random() - 0.5) * (Math.PI * 2 / count) * 0.7;
    const dist = shieldRadius + 80 + Math.random() * (Math.min(w2, h2) * 0.42);
    s.x = w2 / 2 + Math.cos(angle) * dist; s.y = h2 / 2 + Math.sin(angle) * dist; s.z = (Math.random() - 0.5) * 240;
    const speed = 35 + Math.random() * 45, dir = Math.random() * Math.PI * 2;
    s.vx = Math.cos(dir) * speed; s.vy = Math.sin(dir) * speed; s.vz = (Math.random() - 0.5) * 40;
    s.touchCount = 0; s.lastHitAt = 0;
    if (crackEls[i]) crackEls[i].style.opacity = '0';
    box.style.transition = 'none';
    box.style.transform = `translate3d(calc(-50% + ${(s.x - w2 / 2).toFixed(1)}px), calc(-50% + ${(s.y - h2 / 2).toFixed(1)}px), ${s.z.toFixed(1)}px) rotate3d(${s.rx},${s.ry},${s.rz},0deg) scale(${s.scale.toFixed(2)})`;
    void box.offsetWidth;
    box.style.transition = 'opacity 0.6s ease'; box.style.opacity = '1'; s.broken = false;
  };
  const breakBox = (i, x, y, nx, ny, half) => {
    const s = state[i], box = boxEls[i];
    if (s.broken) return;
    s.broken = true; box.style.transition = 'opacity 0.15s ease'; box.style.opacity = '0';
    spawnShards(x, y, s.hue, nx, ny, half);
    pendingTimers.push(setTimeout(() => respawn(i), 750 + Math.random() * 300));
  };

  let last = performance.now();
  const R = 55;
  const step = (now) => {
    const r2 = container.getBoundingClientRect(), w2 = r2.width, h2 = r2.height, cx2 = w2 / 2, cy2 = h2 / 2;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    state.forEach((s, i) => {
      if (s.broken) return;
      const box = boxEls[i]; if (!box) return;
      s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
      const rot = s.wobbleAmp * Math.sin((now / 1000) * s.wobbleFreq * Math.PI * 2 + s.wobblePhase);
      const m = 70;
      if (s.x < m) { s.x = m; s.vx = Math.abs(s.vx); }
      if (s.x > w2 - m) { s.x = w2 - m; s.vx = -Math.abs(s.vx); }
      if (s.y < m) { s.y = m; s.vy = Math.abs(s.vy); }
      if (s.y > h2 - m) { s.y = h2 - m; s.vy = -Math.abs(s.vy); }
      if (s.z < -240) { s.z = -240; s.vz = Math.abs(s.vz); }
      if (s.z > 240) { s.z = 240; s.vz = -Math.abs(s.vz); }
      const dx = s.x - cx2, dy = s.y - cy2, dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
      if (dist < shieldRadius) {
        const nx = dx / dist, ny = dy / dist;
        s.x = cx2 + nx * shieldRadius; s.y = cy2 + ny * shieldRadius;
        breakBox(i, s.x, s.y, nx, ny, true);
      }
      box.style.transform = `translate3d(calc(-50% + ${(s.x - w2 / 2).toFixed(1)}px), calc(-50% + ${(s.y - h2 / 2).toFixed(1)}px), ${s.z.toFixed(1)}px) rotate3d(${s.rx},${s.ry},${s.rz},${rot.toFixed(1)}deg) scale(${s.scale.toFixed(2)})`;
    });
    for (let a = 0; a < state.length; a++) {
      const sa = state[a]; if (sa.broken) continue;
      for (let b = a + 1; b < state.length; b++) {
        const sb = state[b]; if (sb.broken) continue;
        const dx = sb.x - sa.x, dy = sb.y - sa.y, dist = Math.sqrt(dx * dx + dy * dy) || 0.001, minD = R * 2;
        if (dist < minD) {
          const nx = dx / dist, ny = dy / dist, overlap = (minD - dist) / 2;
          sa.x -= nx * overlap; sa.y -= ny * overlap; sb.x += nx * overlap; sb.y += ny * overlap;
          const va = sa.vx * nx + sa.vy * ny, vb = sb.vx * nx + sb.vy * ny;
          sa.vx += (vb - va) * nx; sa.vy += (vb - va) * ny; sb.vx += (va - vb) * nx; sb.vy += (va - vb) * ny;
          [a, b].forEach((idx) => {
            const s = state[idx];
            if (now - s.lastHitAt > 400) {
              s.lastHitAt = now; s.touchCount++;
              if (crackEls[idx]) crackEls[idx].style.opacity = Math.min(1, s.touchCount / TOUCH_LIMIT).toFixed(2);
              if (s.touchCount >= TOUCH_LIMIT) breakBox(idx, s.x, s.y, Math.cos(Math.random() * 6.28), Math.sin(Math.random() * 6.28), false);
            }
          });
        }
      }
    }
    glassRaf = requestAnimationFrame(step);
  };
  glassRaf = requestAnimationFrame(step);
}

// Minimal techy intro — the "db.dev" wordmark types in over a filling hairline.
const LOADER_WORD = 'db.dev';
const LOADER_STATUS = ['initializing', 'mounting projects', 'linking microsites', 'ready'];

// Render the typed portion, keeping the "." terracotta.
function paintLoaderWord(el, n) {
  const s = LOADER_WORD.slice(0, n).replace('.', '<span style="color:#C1663D">.</span>');
  el.innerHTML = s;
}

function runLoader(onDone) {
  const wordEl = $('#loaderWord'), caretEl = $('#loaderCaret');
  const pctEl = $('#loaderPercent'), txtEl = $('#loaderText'), barEl = $('#loaderBar');
  const total = reduceMotion ? 300 : 1500;
  const start = Date.now();
  let lastStatus = -1, lastTyped = -1;

  const iv = setInterval(() => {
    const p = Math.min(100, Math.round(((Date.now() - start) / total) * 100));
    if (pctEl) pctEl.textContent = p;
    if (barEl) barEl.style.width = p + '%';

    // type the wordmark over the first ~70% of the load
    const chars = Math.min(LOADER_WORD.length, Math.round((p / 70) * LOADER_WORD.length));
    if (wordEl && chars !== lastTyped) { lastTyped = chars; paintLoaderWord(wordEl, chars); }

    const s = Math.min(LOADER_STATUS.length - 1, Math.floor((p / 100) * LOADER_STATUS.length));
    if (txtEl && s !== lastStatus) { lastStatus = s; txtEl.textContent = LOADER_STATUS[s]; }
    if (p >= 100) {
      if (caretEl) caretEl.style.opacity = '0'; // caret retires once fully typed
      clearInterval(iv);
    }
  }, 40);
  loaderTimers.push(iv);

  const finish = () => {
    const loader = $('#loader');
    if (!loader || loader.dataset.done) return;
    loader.dataset.done = '1';
    loader.style.animation = 'loaderFadeOut 0.5s ease forwards';
    loaderTimers.forEach((t) => { clearTimeout(t); clearInterval(t); });
    setTimeout(() => { loader.style.display = 'none'; onDone(); }, 500);
  };
  loaderTimers.push(setTimeout(finish, total + 260));
  $('#skipLoader').addEventListener('click', finish);
}

/* ---------- Lead gate ---------- */
function initGate() {
  const gate = $('#gate');
  const captured = (() => { try { return localStorage.getItem('db_lead_captured'); } catch (e) { return null; } })();
  if (captured) { gate.style.display = 'none'; return; }
  gate.style.display = 'flex';
  const close = () => { gate.style.display = 'none'; };
  $('#skipGate').addEventListener('click', close);
  $('#gateFormEl').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#gateName').value.trim(), email = $('#gateEmail').value.trim();
    if (!name || !email) return;
    try { localStorage.setItem('db_lead_captured', 'true'); } catch (err) {}
    const subject = encodeURIComponent('New portfolio visitor');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
    $('#gateForm').style.display = 'none';
    $('#gateThanks').textContent = `Thanks, ${name}!`;
    $('#gateSuccess').style.display = 'flex';
    setTimeout(close, 1600);
  });
}

/* ---------- Nav + mobile menu ---------- */
function initNav() {
  const nav = $('nav');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY > 60;
      nav.style.background = scrolled ? 'rgba(19,31,53,0.92)' : 'transparent';
      nav.style.backdropFilter = scrolled ? 'blur(10px)' : 'none';
      nav.style.borderBottomColor = scrolled ? 'rgba(248,244,239,0.1)' : 'rgba(248,244,239,0.08)';
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  const menu = $('#mobileMenu');
  const open = () => { menu.style.display = 'flex'; };
  const close = () => { menu.style.display = 'none'; };
  $('#menuToggle').addEventListener('click', open);
  $('#menuClose').addEventListener('click', close);
  menu.querySelectorAll('.mlink').forEach((a) => a.addEventListener('click', close));
  document.querySelectorAll('.navlink').forEach((a) => {
    a.addEventListener('mouseenter', () => { a.style.opacity = '1'; a.style.transform = 'translateY(-2px)'; });
    a.addEventListener('mouseleave', () => { a.style.opacity = '0.85'; a.style.transform = 'translateY(0)'; });
  });
}

/* ---------- Hero parallax ---------- */
function initHeroTilt() {
  const grid = $('#heroGrid'), card = $('#heroCard');
  if (!grid || !card) return;
  grid.addEventListener('mousemove', (e) => {
    const rect = grid.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${px * 14}deg) rotateX(${py * -14}deg) translateZ(10px)`;
  });
  grid.addEventListener('mouseleave', () => { card.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)'; });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const reveal = (elm) => { elm.style.animation = 'revealBounceIn 1.5s cubic-bezier(0.2, 0.6, 0.3, 1) forwards'; };
  if (reduceMotion) {
    document.querySelectorAll('[data-reveal-group]').forEach((g) => {
      Array.from(g.children).forEach((c) => { c.style.opacity = '1'; c.style.transform = 'none'; });
    });
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const g = entry.target;
      Array.from(g.children).forEach((child, i) => setTimeout(() => reveal(child), i * 110));
      obs.unobserve(g);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('[data-reveal-group]').forEach((g) => obs.observe(g));
}

/* ---------- Work grid + service overlay ---------- */
function renderWork() {
  const grid = $('#workGrid');
  WORK_ITEMS.forEach((item) => {
    const card = el('a', `--fx: 60vw; --fy: 30vh; --fr: 6deg; text-decoration: none; color: inherit; display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 28px 16px; background: rgba(248,244,239,0.07); backdrop-filter: blur(14px); border-radius: 12px; border: 1px solid rgba(248,244,239,0.14); opacity: 0; transform: translate(60vw, 30vh) scale(0.75) rotate(6deg); transition: transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.2s ease; transform-style: preserve-3d; will-change: transform; cursor: pointer;`);
    card.href = item.link || '#';
    if (item.link) { card.target = '_blank'; card.rel = 'noopener'; }
    const liveTag = item.link ? `<div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #6FA88A; display: flex; align-items: center; gap: 5px;"><span style="width:6px;height:6px;border-radius:50%;background:#6FA88A;"></span>live site ↗</div>` : '';
    card.innerHTML = `<div style="width: 56px; height: 56px; border-radius: 12px; background-image: ${item.pattern}; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: #F8F4EF; font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.25);">${item.initials}</div><div style="font-size: 15px; font-weight: 700; color: #F8F4EF; text-align: center;">${item.name}</div>${liveTag}`;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${px * 18}deg) rotateX(${py * -18}deg) scale(1.04) translateZ(0)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)'; });
    card.addEventListener('mouseenter', () => { card.style.borderColor = 'rgba(193,102,61,0.6)'; });
    card.addEventListener('click', (e) => {
      // Projects with a live link (e.g. Restopos) navigate to the real site.
      if (item.link) return; // let the anchor open item.link in a new tab
      e.preventDefault();
      card.style.transition = 'transform 0.16s ease';
      card.style.transform = 'scale(0.92)';
      card.style.boxShadow = '0 0 0 3px rgba(193,102,61,0.5)';
      setTimeout(() => { card.style.boxShadow = 'none'; openService(item); }, 170);
    });
    grid.appendChild(card);
  });
}

function openService(item) {
  const ov = $('#serviceOverlay');
  ov.innerHTML = `
    <div style="max-width: 820px; margin: 0 auto; padding: 100px 32px 100px;">
      <button id="svcBack" style="background: none; border: 1px solid rgba(248,244,239,0.25); color: #F8F4EF; font-family: 'JetBrains Mono', monospace; font-size: 14px; padding: 10px 18px; border-radius: 6px; cursor: pointer; margin-bottom: 40px; display: inline-flex; align-items: center; gap: 8px;">← back()</button>
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 28px;">
        <div style="width: 64px; height: 64px; border-radius: 14px; background-image: ${item.pattern}; background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: #F8F4EF; font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 17px; flex-shrink: 0;">${item.initials}</div>
        <div>
          <h1 style="font-size: 34px; font-weight: 800; letter-spacing: -0.02em; color: #F8F4EF; margin: 0 0 6px;">${item.name}</h1>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 14px; color: #E2A184;">${item.tagline}</div>
        </div>
      </div>
      <p style="font-size: 17px; line-height: 1.75; color: rgba(248,244,239,0.75); margin: 0 0 36px;">${item.detail}</p>
      <div style="background: #0E1A2E; border: 1px solid rgba(248,244,239,0.1); border-radius: 10px; padding: 26px 28px; margin-bottom: 40px;">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.4); margin-bottom: 16px;">// what it delivers</div>
        ${item.bullets.map((b) => `<div style="display: flex; gap: 10px; font-size: 15px; line-height: 1.6; color: rgba(248,244,239,0.85); margin-bottom: 12px;"><span style="color: #C1663D; font-family: 'JetBrains Mono', monospace;">&gt;</span><span>${b}</span></div>`).join('')}
      </div>
      <a href="#contact" id="svcContact" style="background: #C1663D; color: #F8F4EF; text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 15px; font-weight: 600; padding: 16px 30px; border-radius: 6px; display: inline-block;">discuss_this_project()</a>
    </div>`;
  ov.style.display = 'block';
  ov.style.animation = 'overlayIn 0.45s cubic-bezier(0.2, 0.6, 0.3, 1) both';
  window.scrollTo(0, 0);
  const close = () => { ov.style.display = 'none'; };
  $('#svcBack').addEventListener('click', close);
  $('#svcContact').addEventListener('click', close);
}

/* ---------- Skills ---------- */
function renderSkills() {
  const wrap = $('#skillsWrap');
  SKILLS.forEach((skill) => {
    const chip = el('span', `--fx: 0px; --fy: 45vh; --fr: 4deg; background: #17233A; color: #F8F4EF; font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 500; padding: 12px 20px; border-radius: 8px; border: 1px solid rgba(193,102,61,0.4); opacity: 0; transform: translate(0, 45vh) scale(0.75) rotate(4deg); transition: background 0.2s ease, border-color 0.2s ease;`,
      `<span style="color: #C1663D;">&lt;</span>${skill}<span style="color: #C1663D;">/&gt;</span>`);
    chip.addEventListener('mouseenter', () => { chip.style.background = '#C1663D'; chip.style.borderColor = '#C1663D'; });
    chip.addEventListener('mouseleave', () => { chip.style.background = '#17233A'; chip.style.borderColor = 'rgba(193,102,61,0.4)'; });
    wrap.appendChild(chip);
  });
}

/* ---------- Pricing calculator ---------- */
const calc = {
  serviceId: null, shopType: null, otherShopType: '', posPlanIdx: null,
  websiteSelected: {}, agentSelected: {}, socialSelected: {}, gameIdea: '', waCountry: 'sa', gameSubmitted: false
};

function buildLinks(serviceLabel, detailLine) {
  const number = WHATSAPP_NUMBERS[calc.waCountry];
  const message = encodeURIComponent(`Hi! I'd like a quote for ${serviceLabel}. ${detailLine}`);
  return {
    wa: `https://wa.me/${number}?text=${message}`,
    mail: `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent('Quote request: ' + serviceLabel)}&body=${message}`
  };
}

function ctaBlock(links) {
  return `
    <div style="display: flex; gap: 8px; margin-top: 16px; margin-bottom: 8px;">
      <button data-country="sa" class="waBtn" style="${calc.waCountry === 'sa' ? waActiveBtn : waIdleBtn}">Saudi Arabia</button>
      <button data-country="in" class="waBtn" style="${calc.waCountry === 'in' ? waActiveBtn : waIdleBtn}">India</button>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
      <a href="${links.mail}" style="background: transparent; color: #F8F4EF; text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 600; padding: 12px; border-radius: 6px; border: 1px solid rgba(248,244,239,0.2); text-align: center;">Email</a>
      <a href="${links.wa}" target="_blank" rel="noopener" style="background: #25D366; color: #0E1A2E; text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700; padding: 12px; border-radius: 6px; text-align: center;">WhatsApp</a>
    </div>`;
}
const summaryPanel = (title, sub, items, links) => `
  <div style="position: sticky; top: 24px; background: #0E1A2E; border: 1px solid rgba(248,244,239,0.12); border-radius: 12px; padding: 28px;">
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.45); margin-bottom: 10px;">// estimated total</div>
    <div style="font-size: 30px; font-weight: 800; color: #F8F4EF; margin-bottom: ${sub ? '6px' : '24px'};">${title}</div>
    ${sub ? `<div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #E2A184; margin-bottom: 24px;">${sub}</div>` : ''}
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: rgba(248,244,239,0.4); margin-bottom: 14px;">// what's included</div>
    ${items.map((line) => `<div style="display: flex; gap: 8px; font-size: 14px; line-height: 1.6; color: rgba(248,244,239,0.85); margin-bottom: 10px;"><span style="color: #C1663D; font-family: 'JetBrains Mono', monospace;">&gt;</span><span>${line}</span></div>`).join('')}
    ${ctaBlock(links)}
  </div>`;

function calcFlowHTML() {
  const sId = calc.serviceId;
  if (sId === 'pos') {
    const shopLabel = calc.shopType === 'other' ? (calc.otherShopType.trim() || 'your shop') : (SHOP_TYPES.find((s) => s.id === calc.shopType)?.label || '');
    const posShopReady = !!calc.shopType && (calc.shopType !== 'other' || calc.otherShopType.trim().length > 0);
    const plan = calc.posPlanIdx != null ? POS_PLANS[calc.posPlanIdx] : null;
    const total = plan ? `$${plan.price}/mo` : 'Select a plan';
    const items = plan ? [`Configured for: ${shopLabel}`, ...plan.features] : (calc.shopType ? [`Configured for: ${shopLabel}`, 'Choose a plan to see what’s included'] : ['Pick your shop type to get started']);
    const links = buildLinks('POS & Billing', `Shop type: ${shopLabel || 'not yet chosen'}. Plan: ${plan ? plan.name + ' (' + total + ')' : 'not yet selected'}.`);
    return `<div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; align-items: start;" data-calc-grid="true">
      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.45); margin-bottom: 12px;">// 2. what type of shop do you have?</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; margin-bottom: 16px;">
          ${SHOP_TYPES.map((st) => `<button class="shopBtn" data-shop-id="${st.id}" style="${st.id === calc.shopType ? activeBtn : idleBtn}">${st.label}</button>`).join('')}
        </div>
        ${calc.shopType === 'other' ? `<input id="otherShop" type="text" placeholder="Tell me what type of shop (required)" value="${calc.otherShopType.replace(/"/g, '&quot;')}" style="width: 100%; box-sizing: border-box; padding: 14px 16px; border-radius: 8px; border: 1px solid rgba(248,244,239,0.2); background: rgba(248,244,239,0.05); color: #F8F4EF; font-family: 'Inter', sans-serif; font-size: 14px; margin-bottom: 28px;">` : ''}
        ${posShopReady ? `<div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.45); margin: 12px 0;">// 3. choose your plan (monthly)</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;" data-pos-plans="true">
            ${POS_PLANS.map((p, idx) => `<button class="posPlan" data-plan-idx="${idx}" style="${idx === calc.posPlanIdx ? activeCard : idleCard}">
              <div style="font-weight: 700; font-size: 16px; margin-bottom: 6px;">${p.name}</div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 20px; font-weight: 800; margin-bottom: 12px;">$${p.price}/mo</div>
              ${p.features.map((f) => `<div style="font-size: 12px; line-height: 1.6; opacity: 0.8;">&gt; ${f}</div>`).join('')}
            </button>`).join('')}
          </div>` : ''}
      </div>
      ${summaryPanel(total, '', items, links)}
    </div>`;
  }
  if (sId === 'website') {
    const count = WEBSITE_FEATURES.filter((f) => calc.websiteSelected[f.id]).length;
    const est = Math.min(500, 200 + count * 40);
    const items = count > 0 ? WEBSITE_FEATURES.filter((f) => calc.websiteSelected[f.id]).map((f) => f.label) : ['Select what your website needs'];
    const links = buildLinks('Website', `Estimate: $${est}.`);
    return `<div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; align-items: start;" data-calc-grid="true">
      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.45); margin-bottom: 12px;">// 2. what does your website need?</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px;">
          ${WEBSITE_FEATURES.map((f) => `<button class="featBtn" data-set="websiteSelected" data-feat-id="${f.id}" style="${calc.websiteSelected[f.id] ? activeBtn : idleBtn}">${f.label}</button>`).join('')}
        </div>
      </div>
      ${summaryPanel(`$${est}`, 'typical range $200 – $500', items, links)}
    </div>`;
  }
  if (sId === 'agent') {
    const count = AGENT_FEATURES.filter((f) => calc.agentSelected[f.id]).length;
    const est = count === 0 ? 20 : Math.min(400, 20 + count * 55);
    const items = count > 0 ? AGENT_FEATURES.filter((f) => calc.agentSelected[f.id]).map((f) => f.label) : ['Select what your automation agent should do'];
    const links = buildLinks('Automation Agent', `Estimate: $${est}/mo.`);
    return `<div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; align-items: start;" data-calc-grid="true">
      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.45); margin-bottom: 12px;">// 2. what kind of automation agent do you need?</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px;">
          ${AGENT_FEATURES.map((f) => `<button class="featBtn" data-set="agentSelected" data-feat-id="${f.id}" style="${calc.agentSelected[f.id] ? activeBtn : idleBtn}">${f.label}</button>`).join('')}
        </div>
      </div>
      ${summaryPanel(`$${est}/mo`, 'monthly subscription · $20–$400/mo', items, links)}
    </div>`;
  }
  if (sId === 'social') {
    const count = SOCIAL_FEATURES.filter((f) => calc.socialSelected[f.id]).length;
    const est = count === 0 ? 200 : Math.min(400, 200 + count * 30);
    const items = count > 0 ? SOCIAL_FEATURES.filter((f) => calc.socialSelected[f.id]).map((f) => f.label) : ['Select what you need help with'];
    const links = buildLinks('Social Media', `Estimate: $${est}/mo.`);
    return `<div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; align-items: start;" data-calc-grid="true">
      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.45); margin-bottom: 12px;">// 2. what do you need help with?</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px;">
          ${SOCIAL_FEATURES.map((f) => `<button class="featBtn" data-set="socialSelected" data-feat-id="${f.id}" style="${calc.socialSelected[f.id] ? activeBtn : idleBtn}">${f.label}</button>`).join('')}
        </div>
      </div>
      ${summaryPanel(`$${est}/mo`, 'monthly retainer · $200–$400/mo', items, links)}
    </div>`;
  }
  if (sId === 'game') {
    const links = buildLinks('Game Dev', `Idea: ${calc.gameIdea.trim() || '(not written yet)'}`);
    return `<div style="max-width: 620px;">
      <h2 style="font-size: 22px; font-weight: 700; color: #F8F4EF; margin: 0 0 10px;">Submit your idea and I'll be contacting you</h2>
      <p style="font-size: 15px; color: rgba(248,244,239,0.65); line-height: 1.6; margin: 0 0 20px;">Games vary too much to price on a form — describe what you're imagining and I'll follow up with a real quote and timeline.</p>
      <textarea id="gameIdea" rows="6" placeholder="Describe your game idea..." style="width: 100%; box-sizing: border-box; padding: 16px; border-radius: 10px; border: 1px solid rgba(248,244,239,0.2); background: rgba(248,244,239,0.05); color: #F8F4EF; font-family: 'Inter', sans-serif; font-size: 15px; resize: vertical; margin-bottom: 16px;">${calc.gameIdea.replace(/</g, '&lt;')}</textarea>
      <button id="gameSubmit" style="background: #C1663D; color: #F8F4EF; border: none; font-family: 'JetBrains Mono', monospace; font-size: 15px; font-weight: 600; padding: 16px 28px; border-radius: 6px; cursor: pointer;">${calc.gameSubmitted ? 'Got it — I’ll be in touch!' : 'Submit idea'}</button>
      <div style="margin-top: 28px; padding-top: 24px; border-top: 1px solid rgba(248,244,239,0.1);">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.45); margin-bottom: 12px;">// or reach me directly</div>
        <div style="max-width: 360px;">${ctaBlock(links)}</div>
      </div>
    </div>`;
  }
  return '';
}

function renderCalc() {
  const ov = $('#calcOverlay');
  ov.innerHTML = `
    <div style="max-width: 980px; margin: 0 auto; padding: 90px 32px 100px;">
      <button id="calcBack" style="background: none; border: 1px solid rgba(248,244,239,0.25); color: #F8F4EF; font-family: 'JetBrains Mono', monospace; font-size: 14px; padding: 10px 18px; border-radius: 6px; cursor: pointer; margin-bottom: 32px; display: inline-flex; align-items: center; gap: 8px;">← back()</button>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600; color: #E2A184; margin-bottom: 10px;">// estimate calculator</div>
      <h1 style="font-size: 32px; font-weight: 800; letter-spacing: -0.02em; color: #F8F4EF; margin: 0 0 36px;">Build your estimate</h1>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: rgba(248,244,239,0.45); margin-bottom: 12px;">// 1. what are you building?</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-bottom: 40px;">
        ${CALC_SERVICES.map((s) => `<button class="svcBtn" data-svc-id="${s.id}" style="${s.id === calc.serviceId ? activeBtn : idleBtn}">${s.name}</button>`).join('')}
      </div>
      <div id="calcFlow">${calcFlowHTML()}</div>
    </div>`;
  wireCalc();
}

function wireCalc() {
  const ov = $('#calcOverlay');
  $('#calcBack').addEventListener('click', () => { ov.style.display = 'none'; });
  ov.querySelectorAll('.svcBtn').forEach((b) => b.addEventListener('click', () => {
    calc.serviceId = b.getAttribute('data-svc-id'); renderCalc();
  }));
  ov.querySelectorAll('.shopBtn').forEach((b) => b.addEventListener('click', () => {
    calc.shopType = b.getAttribute('data-shop-id'); calc.posPlanIdx = null; renderCalc();
  }));
  const other = $('#otherShop');
  if (other) other.addEventListener('input', () => {
    calc.otherShopType = other.value;
    // re-render but keep focus/caret
    const pos = other.selectionStart; renderCalc();
    const n = $('#otherShop'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (e) {} }
  });
  ov.querySelectorAll('.posPlan').forEach((b) => b.addEventListener('click', () => {
    calc.posPlanIdx = parseInt(b.getAttribute('data-plan-idx'), 10); renderCalc();
  }));
  ov.querySelectorAll('.featBtn').forEach((b) => b.addEventListener('click', () => {
    const set = b.getAttribute('data-set'), id = b.getAttribute('data-feat-id');
    calc[set][id] = !calc[set][id]; renderCalc();
  }));
  ov.querySelectorAll('.waBtn').forEach((b) => b.addEventListener('click', () => {
    calc.waCountry = b.getAttribute('data-country'); renderCalc();
  }));
  const gi = $('#gameIdea');
  if (gi) gi.addEventListener('input', () => { calc.gameIdea = gi.value; });
  const gs = $('#gameSubmit');
  if (gs) gs.addEventListener('click', () => {
    if (!calc.gameIdea.trim()) return;
    calc.gameSubmitted = true; renderCalc();
    setTimeout(() => { calc.gameSubmitted = false; if ($('#calcOverlay').style.display === 'block') renderCalc(); }, 3000);
  });
}

function initCalc() {
  $('#openCalc').addEventListener('click', (e) => {
    e.preventDefault();
    renderCalc();
    $('#calcOverlay').style.display = 'block';
    $('#calcOverlay').style.animation = 'overlayIn 0.45s cubic-bezier(0.2, 0.6, 0.3, 1) both';
    window.scrollTo(0, 0);
  });
}

/* ---------- Contact form ---------- */
function initContact() {
  const form = $('#contactForm'), btn = $('#contactSubmit');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    btn.textContent = 'Sent — thank you!';
    setTimeout(() => { btn.textContent = 'Send message'; form.reset(); }, 2500);
  });
}

/* ---------- Boot ---------- */
function boot() {
  initNav();
  initHeroTilt();
  renderWork();
  renderSkills();
  initReveal();
  initCalc();
  initContact();
  setupParticles($('#heroCanvas'));
  setupParticles($('#aboutCanvas'));
}

document.addEventListener('DOMContentLoaded', () => {
  runLoader(() => { initGate(); });
  boot();
});
