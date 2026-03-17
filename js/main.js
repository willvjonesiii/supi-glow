/* ==========================================
   SUPI GLOW — MAIN JAVASCRIPT
   ========================================== */

/* ── NAV SCROLL EFFECT ── */
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ── MOBILE MENU ── */
(function() {
  const navInner = document.querySelector('.nav__inner');
  if (!navInner) return;

  const hamburger = document.createElement('button');
  hamburger.className = 'nav__hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  navInner.appendChild(hamburger);

  const leftLinks  = document.querySelector('.nav__links--left');
  const rightLinks = document.querySelector('.nav__links--right');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    leftLinks.classList.toggle('open', open);
    rightLinks.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // close on link click
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      leftLinks.classList.remove('open');
      rightLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── TESTIMONIAL SLIDER ── */
(function() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  if (!testimonials.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    testimonials[current].classList.remove('testimonial--active');
    dots[current].classList.remove('dot--active');
    current = (index + testimonials.length) % testimonials.length;
    testimonials[current].classList.add('testimonial--active');
    dots[current].classList.add('dot--active');
  }

  function autoplay() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(parseInt(dot.dataset.index));
      autoplay();
    });
  });

  autoplay();
})();

/* ── SCROLL FADE-IN ANIMATIONS ── */
(function() {
  const targets = document.querySelectorAll(
    '.section > .container, .split__content, .split__image, .service-card, .testimonial__quote, .events__content, .events__image, .quote-banner .container, .page-hero__content'
  );

  targets.forEach(el => el.classList.add('fade-up'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings slightly
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => io.observe(el));
})();

/* ── CONTACT FORM (Formspree fallback) ── */
(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Check if using formspree (update action URL in HTML to your form ID)
  // This provides a simple client-side message when no backend configured
  if (form.action.includes('YOUR_FORM_ID')) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const name = form.querySelector('#name')?.value;
      btn.textContent = `Thank you, ${name || 'friend'}! Message received.`;
      btn.disabled = true;
      form.reset();
    });
  }
})();

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
