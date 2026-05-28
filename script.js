// ============================================
// Scroll-triggered fade-in for sections
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
    zoomOverlay.classList.remove('active');
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

// ============================================
// Hero Typewriter Effect
// ============================================
const lines = [
  { text: '> whoami',                    delay: 0,    speed: 80,  pause: 400  },
  { text: 'Michael Mulugeta Demissie',   delay: 0,    speed: 55,  pause: 300  },
  { text: '> role',                      delay: 0,    speed: 80,  pause: 400  },
  { text: 'Data Engineer | ML Infra',    delay: 0,    speed: 55,  pause: 300  },
  { text: '> location',                  delay: 0,    speed: 80,  pause: 400  },
  { text: 'Washington, DC',              delay: 0,    speed: 55,  pause: 300  },
  { text: '> stack',                     delay: 0,    speed: 80,  pause: 400  },
  { text: 'Python · Airflow · Spark · AWS · PostgreSQL · Docker', delay: 0, speed: 30, pause: 300 },
  { text: '> status',                    delay: 0,    speed: 80,  pause: 400  },
  { text: 'Open to full-time roles ✓',   delay: 0,    speed: 55,  pause: 600  },
];

const terminal = document.getElementById('hero-terminal');
const cursor = document.getElementById('hero-cursor');

async function typeLine(lineEl, text, speed) {
  for (let i = 0; i < text.length; i++) {
    lineEl.textContent += text[i];
    await sleep(speed + Math.random() * 20);
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runTerminal() {
  await sleep(400);
  for (const line of lines) {
    const lineEl = document.createElement('div');
    const isCommand = line.text.startsWith('>');
    lineEl.className = isCommand ? 'term-cmd' : 'term-output';
    terminal.insertBefore(lineEl, cursor);
    await typeLine(lineEl, line.text, line.speed);
    await sleep(line.pause);
  }
  cursor.style.animation = 'blink 1s step-end infinite';
}

runTerminal();
