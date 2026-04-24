/* ===========================
   EUNICE D. IBARDALOZA
   IT Intern E-Portfolio — JS
=========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // CUSTOM CURSOR
  // ============================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();


  // ============================
  // TYPING HERO TEXT
  // ============================
  const phrases = [
    'Desk-Site Engineer Trainee',
    'Cybersecurity Enthusiast',
    'Team Lead — Fusion CX',
    'Endpoint Security Specialist',
    'Future Systems Engineer',
    'Software QA Advocate',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const target = document.getElementById('typingText');

  function type() {
    if (!target) return;
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      target.textContent = phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      target.textContent = phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 48 : 80);
  }

  setTimeout(type, 1200);


  // ============================
  // HERO PARTICLES
  // ============================
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    for (let i = 0; i < 50; i++) {
      createParticle();
    }
  }

  function createParticle() {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 2 + 1}px;
      height: ${Math.random() * 2 + 1}px;
      background: rgba(0,229,255,${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      pointer-events: none;
      animation: particleFloat ${Math.random() * 12 + 8}s ease-in-out infinite;
      animation-delay: -${Math.random() * 10}s;
    `;
    particleContainer.appendChild(p);
  }

  // Inject particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
      25% { transform: translateY(-${Math.random()*40+20}px) translateX(${Math.random()*20-10}px); opacity: 0.8; }
      50% { transform: translateY(-${Math.random()*20+10}px) translateX(${Math.random()*30-15}px); opacity: 0.5; }
      75% { transform: translateY(${Math.random()*20+10}px) translateX(${Math.random()*20-10}px); opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);


  // ============================
  // SCROLL REVEAL
  // ============================
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));


  // ============================
  // SKILL BAR ANIMATION
  // ============================
  const fillBars = document.querySelectorAll('.ss-fill');
  const toolsSection = document.getElementById('tools');

  if (toolsSection) {
    const barObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fillBars.forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), i * 120);
        });
        barObserver.disconnect();
      }
    }, { threshold: 0.3 });
    barObserver.observe(toolsSection);
  }


  // ============================
  // TERMINAL ANIMATION
  // ============================
  const termLines = document.querySelectorAll('.term-line');
  const termSection = document.getElementById('reflection');

  if (termSection) {
    const termObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        termLines.forEach((line, i) => {
          line.style.animationDelay = `${i * 180}ms`;
        });
        termObserver.disconnect();
      }
    }, { threshold: 0.4 });
    termObserver.observe(termSection);
  }


  // ============================
  // ACTIVE NAV HIGHLIGHT
  // ============================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 160) current = s.id;
    });

    navLinks.forEach(a => {
      const href = a.getAttribute('href').replace('#', '');
      if (href === current) {
        a.style.color = 'var(--cyan)';
        a.style.textShadow = '0 0 12px rgba(0,229,255,0.6)';
      } else {
        a.style.color = '';
        a.style.textShadow = '';
      }
    });
  });


  // ============================
  // NAVBAR SCROLL EFFECT
  // ============================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.background = 'rgba(5,10,15,0.97)';
    } else {
      navbar.style.background = 'rgba(5,10,15,0.9)';
    }
  });


  // ============================
  // CARD HOVER GLOW FOLLOW
  // ============================
  document.querySelectorAll('.card-glow').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,229,255,0.05), var(--surface) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });


  // ============================
  // GLITCH RANDOM TRIGGER
  // ============================
  const glitchEls = document.querySelectorAll('.glitch');
  setInterval(() => {
    const el = glitchEls[Math.floor(Math.random() * glitchEls.length)];
    if (el) {
      el.style.animation = 'none';
      el.offsetHeight; // reflow
      el.style.animation = '';
    }
  }, 3000);


  // ============================
  // HERO ORBIT INTERACTIVE
  // ============================
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const visual = heroSection.querySelector('.hero-visual');
      if (visual) {
        visual.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      const visual = heroSection.querySelector('.hero-visual');
      if (visual) {
        visual.style.transform = '';
        visual.style.transition = 'transform 0.6s ease';
        setTimeout(() => visual.style.transition = '', 600);
      }
    });
  }


  // ============================
  // SMOOTH SCROLL FOR NAV
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
