// ==========================================================================
// SCRIPT.JS — INTERACTIVE & ANIMATIVE ENGINE FOR MD SIDIK PORTFOLIO
// Particle Canvas, Dynamic Typing, 3D Perspective Tilt, Smooth Cursor Physics
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
        typingSpeed = 1600; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(typeLoop, typingSpeed);
    }
    typeLoop();
  }

  // 4. Interactive Cursor Glow & Dot Trail
  const glow = document.getElementById('cursorGlow');
  const trail = document.getElementById('cursorTrail');

  if (glow && trail) {
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

  // 5. Scroll Reveal Observer with Count-Up Trigger
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');

          // Trigger Count Up if present inside
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 6. 3D Perspective Tilt on Cards
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
            card.style.transform = 'translateY(0)';
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
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileItems.forEach((item) => {
      item.addEventListener('click', () => {
        mobileNav.classList.remove('open');
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
});