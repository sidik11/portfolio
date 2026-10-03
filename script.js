// ==========================================================================
// SCRIPT.JS — INTERACTIVE & ANIMATIVE ENGINE FOR MD SIDIK PORTFOLIO
// 1. Particle Canvas Physics
// 2. Dynamic Typing Headline
// 3. 3D Perspective Card Tilt
// 4. Directional Cinematic Slide Observer
// 5. Live GitHub REST API Sync (Live Repos & Counter Auto-Update)
// 6. Interactive Quick-View Project Modal System
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar & Active Section Tracker
  const progressBar = document.getElementById('progressBar');
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links .nav-item'));
  const topbar = document.querySelector('.topbar');

  function handleScroll() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    if (topbar) {
      topbar.classList.toggle('scrolled', window.scrollY > 40);
    }

    // Active Section Detection
    let activeId = 'home';
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) {
        activeId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${activeId}`);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Interactive Ambient Cyber Canvas (Floating Nodes & Red Electric Sparks)
  const canvas = document.getElementById('cyberCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 22), 65);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.color = Math.random() > 0.4 ? 'rgba(255, 42, 68, ' : 'rgba(121, 40, 202, ';
        this.alpha = Math.random() * 0.4 + 0.15;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 42, 68, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 42, 68, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 3. Dynamic Typing Headline Animation
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const phrases = [
      "B.Tech CSE Graduate from Odisha, India.",
      "Building practical web applications & developer tools.",
      "React • Node.js • Express • MySQL • Firebase.",
      "36+ repositories shipped on GitHub.",
      "Code → Build → Test → Improve → Repeat."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 65;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1600;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }
    typeLoop();
  }

  // 4. Interactive Cursor Glow & Dot Trail (Desktop)
  const glow = document.getElementById('cursorGlow');
  const trail = document.getElementById('cursorTrail');

  if (glow && trail && window.innerWidth > 960) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      trailX += (mouseX - trailX) * 0.28;
      trailY += (mouseY - trailY) * 0.28;
      trail.style.left = `${trailX}px`;
      trail.style.top = `${trailY}px`;

      requestAnimationFrame(renderCursor);
    }
    renderCursor();
  }

  // 5. Directional Cinematic Slide Observer
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale, .reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');

          // Trigger Count Up
          const counters = entry.target.querySelectorAll('.count-up');
          counters.forEach(counter => {
            if (!counter.dataset.animated) {
              counter.dataset.animated = 'true';
              const target = parseInt(counter.dataset.target, 10);
              let count = 0;
              const step = Math.ceil(target / 40);
              const timer = setInterval(() => {
                count += step;
                if (count >= target) {
                  counter.innerHTML = `${target}<span>+</span>`;
                  if (target === 100) counter.innerHTML = `100<span>%</span>`;
                  clearInterval(timer);
                } else {
                  counter.innerHTML = `${count}<span>+</span>`;
                }
              }, 30);
            }
          });

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 6. 3D Perspective Tilt on Cards (Desktop only)
  const tiltCards = document.querySelectorAll('.tilt');
  tiltCards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      if (window.innerWidth < 960) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const maxRotate = 7;
      card.style.transform = `perspective(1000px) rotateX(${-y * maxRotate}deg) rotateY(${x * maxRotate}deg) translateY(-4px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  // 7. Skills Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translate(0, 0) scale(1)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileItems = document.querySelectorAll('.mobile-item');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileItems.forEach((item) => {
      item.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // 9. Smooth Anchor Linking
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================================================
  // 10. LIVE GITHUB REST API SYNC (Feature 1)
  // ==========================================================================
  const liveReposGrid = document.getElementById('liveReposGrid');
  const apiSyncBadge = document.getElementById('apiSyncBadge');
  const heroRepoCount = document.getElementById('heroRepoCount');
  const heroReposMetric = document.getElementById('heroReposMetric');
  const statRepoVal = document.getElementById('statRepoVal');

  async function fetchLiveGitHubData() {
    try {
      // Fetch user profile stats
      const userRes = await fetch('https://api.github.com/users/sidik11');
      if (userRes.ok) {
        const userData = await userRes.json();
        const reposCount = userData.public_repos || 36;
        if (heroRepoCount) heroRepoCount.textContent = `${reposCount}+`;
        if (heroReposMetric) heroReposMetric.textContent = `${reposCount}+`;
        if (statRepoVal) {
          statRepoVal.setAttribute('data-target', reposCount);
          statRepoVal.innerHTML = `${reposCount}<span>+</span>`;
        }
      }

      // Fetch latest 4 repositories
      const reposRes = await fetch('https://api.github.com/users/sidik11/repos?sort=updated&per_page=4');
      if (reposRes.ok) {
        const repos = await reposRes.json();
        if (apiSyncBadge) {
          apiSyncBadge.textContent = 'CONNECTED • 200 OK';
          apiSyncBadge.style.color = '#00ff87';
        }

        if (liveReposGrid && repos.length > 0) {
          liveReposGrid.innerHTML = '';
          repos.forEach(repo => {
            const date = new Date(repo.updated_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            const card = document.createElement('a');
            card.href = repo.html_url;
            card.target = '_blank';
            card.rel = 'noreferrer';
            card.className = 'live-repo-item tilt';
            card.innerHTML = `
              <div>
                <div class="repo-card-top">
                  <span>★ ${repo.stargazers_count}</span>
                  <span class="repo-lang">${repo.language || 'Code'}</span>
                </div>
                <h4 class="repo-card-name">${repo.name}</h4>
                <p class="repo-card-desc">${repo.description || 'Public GitHub repository exploring modern web architecture and systems.'}</p>
              </div>
              <div class="repo-card-foot">
                <span class="repo-card-date">UPDATED: ${date}</span>
                <span class="text-punch">VIEW ↗</span>
              </div>
            `;
            liveReposGrid.appendChild(card);
          });
        }
      }
    } catch (err) {
      console.warn('GitHub API live sync fallback:', err);
      if (apiSyncBadge) {
        apiSyncBadge.textContent = 'CACHED ARCHIVE';
      }
    }
  }

  fetchLiveGitHubData();

  // ==========================================================================
  // 11. INTERACTIVE PROJECT PREVIEW MODAL (Feature 2)
  // ==========================================================================
  const projectDatabase = {
    exam: {
      badge: "FLAGSHIP // FULL-STACK ENTERPRISE",
      title: "Competitive Exam Platform",
      subtitle: "Full-scale digital assessment system with role-based routing and automated proctoring guards.",
      features: [
        "Multi-tier permission management for Administrators, Teachers, and Students.",
        "Server-synchronized examination clock with zero-latency automated test submission.",
        "Secure RESTful endpoint verification preventing client-side response tampering.",
        "Realtime live score calculation and institution report generation."
      ],
      stack: ["Node.js", "Express", "Firebase Auth", "Realtime DB", "REST APIs", "Vite"],
      url: "https://github.com/sidik11/Exam"
    },
    gallery: {
      badge: "FLAGSHIP // CRYPTOGRAPHIC VAULT",
      title: "Secure Image & Media Vault",
      subtitle: "Client-side encrypted local media container for confidential file isolation.",
      features: [
        "Hardware-backed AES-256 block cipher protecting confidential documents and images.",
        "Zero-knowledge architecture ensuring files never leave device memory unencrypted.",
        "Biometric and PIN-guarded protective sandbox container.",
        "High-performance cached thumbnail generation pipeline."
      ],
      stack: ["Android / Java", "AES-256", "Secure Media", "Encrypted Storage", "Android SDK"],
      url: "https://github.com/sidik11/Gallery"
    },
    excel: {
      badge: "WEB APPLICATION // UTILITY",
      title: "Excel Catalog & Image Vault",
      subtitle: "Web project combining spreadsheet search routines and protected image containers.",
      features: [
        "Real-time parsing and search indexing of large multi-sheet Excel files.",
        "Secure image asset association with spreadsheet records.",
        "Instant filtering and visual slideshow modal workflows.",
        "Seamless cloud sync via Firebase."
      ],
      stack: ["React", "Vite", "Firebase", "SheetJS", "Tailwind CSS"],
      url: "https://github.com/sidik11/Excel"
    },
    innovatex: {
      badge: "CORPORATE PORTAL // TECH FIRM",
      title: "MS InnovateX Corporate Platform",
      subtitle: "Corporate technology platform featuring dynamic sections and student intake workflows.",
      features: [
        "Ultra-responsive enterprise layout built with modern CSS custom properties.",
        "Interactive services carousel and technology capability showcases.",
        "Structured student internship application and registration workflows.",
        "High-performance assets optimized for instant sub-second load times."
      ],
      stack: ["HTML5", "CSS3", "Modern JavaScript", "UI/UX Architecture"],
      url: "https://github.com/sidik11/MS_InnovateX"
    },
    excel2: {
      badge: "DATA AUTOMATION // ANALYZER",
      title: "Excel2 Enterprise Analyzer",
      subtitle: "High-speed spreadsheet workbook ingestion and visual reporting engine.",
      features: [
        "Parses multi-table workbooks directly in-browser with zero upload delay.",
        "Dynamic formula recalculation and aggregation metrics.",
        "Visual chart export capabilities for management reporting."
      ],
      stack: ["JavaScript", "Data Grid", "Export Utilities", "DOM APIs"],
      url: "https://github.com/sidik11/Excel2"
    },
    lifevision: {
      badge: "INTERACTIVE APP // SOCIAL",
      title: "Life-Vision Interactive App",
      subtitle: "Goal tracking and personal vision portal built with fluid reactive interfaces.",
      features: [
        "Interactive goal boards and personal progress visualization.",
        "Media showcases and motivational card workflows.",
        "Client-side persistence with real-time UI state transitions."
      ],
      stack: ["Web App", "State Flow", "UI Engineering", "Modern CSS"],
      url: "https://github.com/sidik11/Life-Vision"
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalStack = document.getElementById('modalStack');
  const modalRepoBtn = document.getElementById('modalRepoBtn');

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data || !projectModal) return;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;

    modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    modalStack.innerHTML = data.stack.map(s => `<span>${s}</span>`).join('');
    modalRepoBtn.setAttribute('href', data.url);

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-project-id');
      if (pId) openProjectModal(pId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });
});