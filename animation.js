document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade');

  const options = {
    threshold: 0.2,
    rootMargin: '0px 0px -20px 0px'
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        const animation = el.dataset.animation;

        if (animation) {
          el.classList.add(animation);
        }

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, options);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // 🔽 Плавная прокрутка к якорю
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
