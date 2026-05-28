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
  if (e.key === 'Escape') closeModal();
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

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') zoomOverlay.classList.remove('active');
});
