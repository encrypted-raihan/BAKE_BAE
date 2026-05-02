/* =========================================
   BAKE BAE BAKERS — script.js
   Buildex Web Solutions
   ========================================= */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navOverlay = document.createElement('div');

navOverlay.style.cssText = `
  position: fixed; inset: 0; background: rgba(26,15,8,0.4);
  z-index: 997; display: none; backdrop-filter: blur(2px);
`;
document.body.appendChild(navOverlay);

function openMenu() {
  hamburger.classList.add('open');
  navLinks.classList.add('open');
  navOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  navOverlay.style.display = 'none';
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});
navOverlay.addEventListener('click', closeMenu);

// Close on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ===== SMOOTH SCROLL (iOS Safari fix) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== INTERSECTION OBSERVER — FADE UP ANIMATIONS =====
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.style.display = '';
        item.style.animation = 'fadeIn 0.45s ease both';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== MENU TABS =====
const menuTabs   = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('active'));
    menuPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) {
      panel.classList.add('active');
      panel.style.animation = 'fadeIn 0.4s ease both';
    }
  });
});

// ===== OPENING HOURS INDICATOR =====
function updateOpenBadge() {
  const badge = document.getElementById('openBadge');
  if (!badge) return;

  // UPDATE THESE HOURS when client confirms
  const schedule = {
    0: { open: '09:00', close: '22:00' }, // Sunday
    1: { open: '08:00', close: '22:00' }, // Monday
    2: { open: '08:00', close: '22:00' },
    3: { open: '08:00', close: '22:00' },
    4: { open: '08:00', close: '22:00' },
    5: { open: '08:00', close: '22:00' },
    6: { open: '08:00', close: '22:00' }, // Saturday
  };

  const now = new Date();
  const day = now.getDay();
  const hrs = schedule[day];

  if (!hrs) { badge.textContent = 'Hours not available'; return; }

  const [oh, om] = hrs.open.split(':').map(Number);
  const [ch, cm] = hrs.close.split(':').map(Number);
  const openMin  = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  const nowMin   = now.getHours() * 60 + now.getMinutes();

  if (nowMin >= openMin && nowMin < closeMin) {
    const left = closeMin - nowMin;
    const h = Math.floor(left / 60);
    const m = left % 60;
    badge.textContent = `Open Now · Closes in ${h > 0 ? h + 'h ' : ''}${m}m`;
    badge.classList.remove('closed');
  } else {
    const opensNext = nowMin < openMin
      ? `Opens at ${hrs.open}`
      : `Opens tomorrow at ${schedule[(day + 1) % 7]?.open || hrs.open}`;
    badge.textContent = `Closed · ${opensNext}`;
    badge.classList.add('closed');
  }
}
updateOpenBadge();
setInterval(updateOpenBadge, 60000);

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + id) {
          a.style.color = 'var(--brown)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===== WHATSAPP PHONE NUMBER UPDATE =====
// Replace 919995000000 with the real number throughout index.html
// Format: 91XXXXXXXXXX (country code + number, no + sign, no spaces)

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 50);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(interval);
  }, 30);
}

const counterEls = document.querySelectorAll('.trust-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = '1';
      const raw  = entry.target.textContent.trim();
      const num  = parseInt(raw.replace(/\D/g, ''));
      const suf  = raw.replace(/\d/g, '');
      animateCounter(entry.target, num, suf);
    }
  });
}, { threshold: 0.8 });
counterEls.forEach(el => counterObserver.observe(el));

// ===== GALLERY TOUCH HOVER (mobile) =====
galleryItems.forEach(item => {
  item.addEventListener('touchstart', () => {
    item.querySelector('.gallery-overlay').style.opacity = '1';
  }, { passive: true });
  item.addEventListener('touchend', () => {
    setTimeout(() => {
      item.querySelector('.gallery-overlay').style.opacity = '';
    }, 1200);
  }, { passive: true });
});

const timeline = document.querySelector(".timeline");
const items = document.querySelectorAll(".timeline-item");

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateTimeline();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

function updateTimeline() {
  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const progress = Math.min(
    Math.max((windowHeight * 0.5 - rect.top) / rect.height, 0),
    1
  );

  // ✅ NEW LOGIC (this is the fix)
const endDot = document.querySelector(".end-dot");

const dotRect = endDot.getBoundingClientRect();
const dotOffset = dotRect.top - rect.top; // relative to timeline

const rawHeight = progress * rect.height;
const lineHeight = Math.max(0, Math.min(rawHeight, dotOffset));

timeline.style.setProperty("--progress", `${lineHeight}px`);

  timeline.style.setProperty("--progress", `${lineHeight}px`);

  items.forEach(item => {
    const r = item.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const distance = Math.abs(windowHeight / 2 - center);

    item.classList.toggle("active", distance < 120);
  });

  const end = document.querySelector(".timeline-end");

  if (progress > 0.95) {
    end.classList.add("active");
  } else {
    end.classList.remove("active");
  }
}


console.log('%c🍰 Bake Bae Bakers', 'font-size:20px; font-weight:bold; color:#a0673a;');
console.log('%cBuilt by Buildex Web Solutions', 'color:#888; font-size:12px;');