document.addEventListener('DOMContentLoaded', () => {
  const progress = document.querySelector('.progress');
  const heroContent = document.querySelector('.hero .content');

  // Scroll progress & hero parallax
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (scrollTop / docHeight) * 100 + '%';
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollTop * 0.18}px)`;
      heroContent.style.opacity = `${1 - scrollTop / 600}`;
    }
  });

  // Reveal animation
  const sections = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  sections.forEach(sec => revealObserver.observe(sec));

  // Typing animation
  const methodText = document.querySelector('#method-typing');
  const firstPrompt = 'Generate a structured methodology section using AI-assisted research synthesis...';
  const secondPrompt = 'Rewriting: Mixed-method analysis using iterative prompt refinement and human validation.';
  let hasPlayed = false;

  function typeText(text, speed = 35, callback) {
    let i = 0;
    function typing() {
      methodText.textContent = text.slice(0, i++);
      if (i <= text.length) setTimeout(typing, speed);
      else if (callback) setTimeout(callback, 500);
    }
    typing();
  }

  function deleteText(callback, speed = 18) {
    let text = methodText.textContent;
    let i = text.length;
    function deleting() {
      methodText.textContent = text.slice(0, i--);
      if (i >= 0) setTimeout(deleting, speed);
      else if (callback) setTimeout(callback, 300);
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

  // Trigger typing when Methods section visible
  const methodSection = document.querySelector('#method');
  if(methodSection){
    const methodObserver = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) {
          typeSequence();
          obs.disconnect();
        }
      });
    }, {threshold:0.1});
    methodObserver.observe(methodSection);
  }
});