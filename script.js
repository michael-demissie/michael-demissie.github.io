// ============================================
// Pipeline Hero Animation
// ============================================
const canvas = document.getElementById('pipeCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

const tools = [
  'Python','Airflow','Spark','Kafka','PostgreSQL',
  'AWS S3','Docker','dbt','MLflow','FastAPI',
  'Snowflake','Redis','Terraform','HuggingFace','LightGBM',
  'BigQuery','Redshift','scikit-learn','Pandas','Node.js'
];

const nodes = tools.map(label => ({
  label,
  x: Math.random(),
  y: Math.random(),
  vx: (Math.random() - 0.5) * 0.0004,
  vy: (Math.random() - 0.5) * 0.0004,
}));

const edges = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    if (Math.random() < 0.25) edges.push([i, j]);
  }
}

const particles = edges.map(e => ({
  edge: e,
  t: Math.random(),
  speed: 0.001 + Math.random() * 0.002
}));

function drawPipeline() {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  nodes.forEach(n => {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0.02 || n.x > 0.98) n.vx *= -1;
    if (n.y < 0.02 || n.y > 0.98) n.vy *= -1;
  });

  edges.forEach(([a, b]) => {
    const na = nodes[a], nb = nodes[b];
    const dx = (na.x - nb.x) * W, dy = (na.y - nb.y) * H;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 320) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(201,168,76,${0.12 * (1 - dist/320)})`;
      ctx.lineWidth = 0.8;
      ctx.moveTo(na.x * W, na.y * H);
      ctx.lineTo(nb.x * W, nb.y * H);
      ctx.stroke();
    }
  });

  particles.forEach(p => {
    p.t += p.speed;
    if (p.t > 1) p.t = 0;
    const [a, b] = p.edge;
    const na = nodes[a], nb = nodes[b];
    const px = (na.x + (nb.x - na.x) * p.t) * W;
    const py = (na.y + (nb.y - na.y) * p.t) * H;
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(232,201,122,0.7)';
    ctx.fill();
  });

  nodes.forEach(n => {
    const x = n.x * W, y = n.y * H;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(201,168,76,0.6)';
    ctx.fill();
    ctx.font = '10px monospace';
    ctx.fillStyle = 'rgba(136,146,164,0.7)';
    ctx.textAlign = 'center';
    ctx.fillText(n.label, x, y - 8);
  });

  requestAnimationFrame(drawPipeline);
}
drawPipeline();

// ============================================
// Typewriter
// ============================================
const twLines = [
  '> designing end-to-end data pipelines...',
  '> building and deploying ML models to production...',
  '> architecting cloud-native data infrastructure...',
  '> transforming raw data into business intelligence...',
  '> engineering real-time and batch data systems...',
  '> building APIs that serve data at scale...',
  '> automating workflows with Airflow and Docker...',
];
let twIdx = 0;
const twEl = document.getElementById('twText');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function typeLoop() {
  while (true) {
    const line = twLines[twIdx % twLines.length];
    for (let i = 0; i <= line.length; i++) {
      twEl.textContent = line.slice(0, i);
      await sleep(45 + Math.random() * 25);
    }
    await sleep(1800);
    for (let i = line.length; i >= 0; i--) {
      twEl.textContent = line.slice(0, i);
      await sleep(18);
    }
    await sleep(300);
    twIdx++;
  }
}
typeLoop();

// ============================================
// Scroll-triggered fade-in
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .project-card, .skill-card, .timeline-item, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// ============================================
// Active nav link on scroll
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
  });
});

// ============================================
// Video Modal
// ============================================
function openModal(src) {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('modal-video');
  video.src = src;
  modal.classList.add('active');
  video.play();
}

function closeModal() {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('modal-video');
  video.pause();
  video.src = '';
  modal.classList.remove('active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    if(zoomOverlay) zoomOverlay.classList.remove('active');
  }
});

// ============================================
// Zoomable Images
// ============================================
const zoomOverlay = document.createElement('div');
zoomOverlay.className = 'img-zoom-overlay';
const zoomImg = document.createElement('img');
zoomOverlay.appendChild(zoomImg);
document.body.appendChild(zoomOverlay);

document.querySelectorAll('.project-visual img').forEach(img => {
  img.addEventListener('click', () => {
    zoomImg.src = img.src;
    zoomOverlay.classList.add('active');
  });
});

zoomOverlay.addEventListener('click', () => {
  zoomOverlay.classList.remove('active');
});
