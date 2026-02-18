// Animations: trigger visibility classes and handle offcanvas link stagger + toggler rotation
(function () {
  const infoContent = document.getElementById('infoContent');
  const offcanvasEl = document.getElementById('offcanvasNavbar');
  const toggler = document.getElementById('navToggler');
  const links = offcanvasEl.querySelectorAll('.nav-link');

  // Reveal main content with a short delay for pleasant entrance
  document.addEventListener('DOMContentLoaded', function () {
    // small timeout to allow paint
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (infoContent) infoContent.classList.add('is-visible');
      }, 90);
    });
  });

  // When offcanvas opens, animate nav links in a staggered fashion
  offcanvasEl.addEventListener('show.bs.offcanvas', function () {
    // rotate toggler icon
    toggler.classList.add('toggled');

    links.forEach((link, i) => {
      link.classList.remove('is-visible');
      // staggered reveal
      setTimeout(() => link.classList.add('is-visible'), i * 55 + 80);
    });
  });

  // When offcanvas hides, reverse changes
  offcanvasEl.addEventListener('hide.bs.offcanvas', function () {
    toggler.classList.remove('toggled');
    links.forEach(link => link.classList.remove('is-visible'));
  });

  // Respect reduced-motion: avoid JS animations if user requested reduced motion
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce && reduce.matches) {
    // remove classes that animate or alter transitions
    if (infoContent) infoContent.classList.add('is-visible');
    links.forEach(link => link.classList.add('is-visible'));
  }

  // Scroll Observer for Skills Section (Staggered Fade-Up)
  const skillCards = document.querySelectorAll('.skill-card');
  if (skillCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // staggered delay based on index
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 100); // 100ms delay between each card
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    skillCards.forEach(card => observer.observe(card));
  }

})();



// Fallback JS for smooth scrolling (in case CSS doesn't work)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Project Slider Logic
document.addEventListener('DOMContentLoaded', () => {
  const projectCarousel = document.querySelector('.project-carousel');
  const imgSlider = document.querySelector('.project-img-slider');
  const imgItems = document.querySelectorAll('.project-img-item');
  const infoItems = document.querySelectorAll('.project-info-item');
  const nextBtn = document.querySelector('.project-next-btn');
  const prevBtn = document.querySelector('.project-prev-btn');

  if (!projectCarousel || !imgSlider) return;

  // Colors corresponding to the 6 slides
  // #3674be, #d26181, #ceb13d, #c6414c, #171f2b, #50aa61
  let colors = ['#3674be', '#d26181', '#ceb13d', '#c6414c', '#171f2b', '#50aa61'];

  let indexSlider = 0;
  let index = 0;

  const slider = () => {
    imgSlider.style.transform = `rotate(${indexSlider * 60}deg)`;

    // Rotate items counter to keep images upright
    document.querySelectorAll('.project-item').forEach(item => {
      item.style.transform = `rotate(${indexSlider * -60}deg)`;
    });

    // Handle Active Classes
    const activeImg = document.querySelector('.project-img-item.active');
    if (activeImg) activeImg.classList.remove('active');
    imgItems[index].classList.add('active');

    const activeInfo = document.querySelector('.project-info-item.active');
    if (activeInfo) activeInfo.classList.remove('active');
    infoItems[index].classList.add('active');

    // Change background of the carousel section - REMOVED per user request
    // projectCarousel.style.background = colors[index];
  }

  nextBtn.addEventListener('click', () => {
    indexSlider++;
    index++;
    if (index > imgItems.length - 1) {
      index = 0;
    }
    slider();
  });

  prevBtn.addEventListener('click', () => {
    indexSlider--;
    index--;
    if (index < 0) {
      index = imgItems.length - 1;
    }
    slider();
  });
});

