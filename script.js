document.addEventListener('DOMContentLoaded', () => {
  // Reveal animation
  const sections = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // only trigger once
      }
    });
  }, {
    root:null,
    rootMargin:'0px 0px -100px 0px', // trigger a bit earlier
    threshold:0.1
  });
  sections.forEach(sec => revealObserver.observe(sec));

  // Methods typing animation
  const methodText = document.querySelector('#method-typing');
  const firstPrompt = 'Generate a structured methodology section using AI-assisted research synthesis...';
  const secondPrompt = 'Rewriting: Mixed-method analysis using iterative prompt refinement and human validation.';
  let hasPlayed = false;

  function typeText(text, speed = 35, callback) {
    let i = 0;
    function typing() {
      methodText.textContent = text.slice(0, i++);
      if(i <= text.length) setTimeout(typing, speed);
      else if(callback) setTimeout(callback, 500, callback);
    }
    typing();
  }

  function deleteText(callback, speed = 18) {
    let i = methodText.textContent.length;
    function deleting() {
      methodText.textContent = methodText.textContent.slice(0, i--);
      if(i >= 0) setTimeout(deleting, speed);
      else if(callback) setTimeout(callback, 300);
    }
    deleting();
  }

  function typeSequence() {
    if(hasPlayed || !methodText) return;
    hasPlayed = true;
    typeText(firstPrompt, 35, () => {
      deleteText(() => {
        typeText(secondPrompt, 28);
      });
    });
  }

  // Trigger typing when method section is revealed
  const methodSection = document.querySelector('#method');
  if(methodSection) {
    const methodObserver = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          typeSequence();
          obs.disconnect();
        }
      });
    }, {threshold:0.1});
    methodObserver.observe(methodSection);
  }
});