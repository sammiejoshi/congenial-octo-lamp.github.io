document.addEventListener('DOMContentLoaded', () => {
  const methodText = document.querySelector('#method-typing');
  const firstPrompt = 'Generate a structured methodology section using AI-assisted research synthesis...';
  const secondPrompt = 'Rewriting: Mixed-method analysis using iterative prompt refinement and human validation.';
  const progress = document.querySelector('.progress');
  const heroContent = document.querySelector('.hero .content');

  let hasPlayed = false;

  function typeText(text, speed = 35, callback) {
    let i = 0;
    function typing() {
      methodText.textContent = text.slice(0, i++);
      if (i <= text.length) {
        setTimeout(typing, speed);
      } else if (callback) {
        setTimeout(callback, 500);
      }
    }
    typing();
  }

  function deleteText(callback, speed = 18) {
    let text = methodText.textContent;
    let i = text.length;
    function deleting() {
      methodText.textContent = text.slice(0, i--);
      if (i >= 0) {
        setTimeout(deleting, speed);
      } else if (callback) {
        setTimeout(callback, 300);
      }
    }
    deleting();
  }

  function typeSequence() {
    if (hasPlayed || !methodText) return;
    hasPlayed = true;
    typeText(firstPrompt, 35, () => {
      deleteText(() => {
        typeText(secondPrompt, 28);
      });
    });
  }

  // Intersection Observer for reveal sections
  const sections = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.25 });
  sections.forEach(sec => observer.observe(sec));

  // Trigger method typing when #method comes into view
  const methodSection = document.querySelector('#method');
  if (methodSection) {
    const methodObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) typeSequence();
      });
    }, { threshold: 0.4 });
    methodObserver.observe(methodSection);
  }

  // Scroll effects
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const percent = (scrollTop / docHeight) * 100;
    if (progress) progress.style.width = percent + '%';

    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollTop * 0.18}px)`;
      heroContent.style.opacity = `${1 - scrollTop / 600}`;
    }
  });
});