const sections = document.querySelectorAll('.reveal');
const progress = document.querySelector('.progress');
const heroContent = document.querySelector('.hero .content');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.25 });

sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = (scrollTop / docHeight) * 100;
  progress.style.width = percent + '%';

  heroContent.style.transform = `translateY(${scrollTop * 0.18}px)`;
  heroContent.style.opacity = `${1 - scrollTop / 600}`;
});