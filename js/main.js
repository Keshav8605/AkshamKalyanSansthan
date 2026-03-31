/* ===== AKSHAM KALYAN SANSTHAN - Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Navbar Scroll Effect =====
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (navbar) {
      if (scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    // Back to top button
    if (backToTop) {
      if (scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ===== Back to Top =====
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Mobile Menu =====
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function toggleMobileMenu() {
    if (!mobileMenuBtn || !navLinks) return;
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (mobileOverlay) mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when a link is clicked
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          toggleMobileMenu();
        }
      });
    });
  }

  // ===== Smooth Scroll for Navigation =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ===== Counter Animation =====
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        counter.textContent = current.toLocaleString('en-IN');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString('en-IN');
          // Add suffix
          if (suffix) {
            counter.innerHTML = target.toLocaleString('en-IN') + `<span class="counter-suffix">${suffix}</span>`;
          }
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ===== Premium Gallery Lightbox =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-premium__content img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-premium__close') : null;
  const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-premium__nav--prev') : null;
  const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-premium__nav--next') : null;
  const lightboxCategory = lightbox ? lightbox.querySelector('.lightbox-premium__category') : null;
  const lightboxTitle = lightbox ? lightbox.querySelector('.lightbox-premium__title') : null;
  const lightboxCounter = lightbox ? lightbox.querySelector('.lightbox-premium__counter') : null;
  const galleryCards = document.querySelectorAll('.gallery-card');
  let currentLightboxIndex = 0;
  let lightboxItems = [];

  // Collect gallery items
  galleryCards.forEach((card, index) => {
    const img = card.querySelector('img');
    const category = card.querySelector('.gallery-card__category');
    const title = card.querySelector('.gallery-card__title');
    if (img) {
      lightboxItems.push({
        src: img.src,
        alt: img.alt,
        category: category ? category.textContent : '',
        title: title ? title.textContent : ''
      });
    }
    card.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    if (!lightbox || !lightboxImg || lightboxItems.length === 0) return;
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent() {
    const item = lightboxItems[currentLightboxIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    if (lightboxCategory) lightboxCategory.textContent = item.category;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCounter) lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxItems.length}`;
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    updateLightboxContent();
  }

  function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxItems.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
  if (lightbox) {
    lightbox.querySelector('.lightbox-premium__backdrop').addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // ===== Donation Amount Buttons =====
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.querySelector('.custom-amount-input');

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (customAmountInput) {
        customAmountInput.value = btn.textContent.replace('₹', '').replace(',', '').trim();
      }
    });
  });

  // ===== Donation Option Selection =====
  const donationOptions = document.querySelectorAll('.donation-option');

  donationOptions.forEach(option => {
    option.addEventListener('click', () => {
      donationOptions.forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });
  });

  // ===== Active Nav Link Highlight =====
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.style.color = '';
          navLink.style.opacity = '1';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink);

  // ===== Contact Form Handling =====
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'var(--primary-green)';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ===== Parallax-lite on Hero =====
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
      }
    });
  }

  // ===== Parallax on Program Hero =====
  const progHeroBg = document.querySelector('.prog-hero-bg img');
  if (progHeroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        progHeroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.25}px)`;
      }
    });
  }

  // ===== Newsletter Form =====
  const newsletterForm = document.querySelector('.footer-newsletter-input');
  if (newsletterForm) {
    const btn = newsletterForm.querySelector('button');
    const input = newsletterForm.querySelector('input');
    if (btn && input) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (input.value.trim()) {
          btn.textContent = '✓ Subscribed!';
          setTimeout(() => {
            btn.textContent = 'Subscribe';
            input.value = '';
          }, 2500);
        }
      });
    }
  }

});
