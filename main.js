// Hero text animation
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.animate-hero').forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 300 + i * 200);
  });

  // Scroll-triggered animations (fade-in, slide-in, scale-in)
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scroll-animate, .fade-in, .slide-in, .scale-in').forEach(el => {
    observer.observe(el);
  });

  // Animated counters
  document.querySelectorAll('.counter').forEach(counter => {
    let started = false;
    const animate = () => {
      if (started) return;
      started = true;
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const step = Math.ceil(target / 100);
      const update = () => {
        count += step;
        if (count > target) count = target;
        counter.textContent = count + '+';
        if (count < target) {
          requestAnimationFrame(update);
        }
      };
      update();
    };
    // Animate when visible
    const counterObserver = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animate();
        counterObserver.disconnect();
      }
    }, { threshold: 0.5 });
    counterObserver.observe(counter);
  });

  // Responsive preview animation on resize
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768 && lastWidth >= 768) {
      document.querySelectorAll('.feature-card, .stat-card, .gallery-img').forEach((el, i) => {
        el.classList.remove('visible');
        setTimeout(() => {
          el.classList.add('visible', 'scale-in');
        }, 200 + i * 120);
      });
      document.querySelectorAll('.navbar-nav .nav-link').forEach((el, i) => {
        el.classList.remove('visible');
        setTimeout(() => {
          el.classList.add('visible', 'slide-in');
        }, 100 + i * 80);
      });
    }
    lastWidth = window.innerWidth;
  });

  // Animate nav underline on hover (handled by CSS, but force repaint for mobile nav)
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('touchstart', () => {
      link.classList.add('active');
      setTimeout(() => link.classList.remove('active'), 400);
    });
  });

  // Floating shapes overlay
  if (!document.querySelector('.floating-shapes')) {
    const overlay = document.createElement('div');
    overlay.className = 'floating-shapes';
    overlay.innerHTML = `
      <div class="floating-shape blue"></div>
      <div class="floating-shape purple"></div>
      <div class="floating-shape green"></div>
    `;
    document.body.appendChild(overlay);
  }

  // Lightbox for gallery images
  if (!document.querySelector('.lightbox-modal')) {
    const modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <span class="close-btn">&times;</span>
      <img src="" alt="Gallery Large" />
    `;
    document.body.appendChild(modal);
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => modal.classList.remove('active');
    modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };
  }
  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.querySelector('.lightbox-modal');
      modal.querySelector('img').src = img.src;
      modal.classList.add('active');
    });
  });

  // Ripple effect for buttons
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}); 