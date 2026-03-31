document.addEventListener('DOMContentLoaded', () => {
  const methodText = document.querySelector('#method-typing');
  const firstPrompt = 'Generate a structured methodology section using AI-assisted research synthesis...';
  const secondPrompt = 'Rewriting: Mixed-method analysis using iterative prompt refinement and human validation.';
  let hasPlayed = false;

  if (!methodText) {
    console.error('Method typing element not found!');
    return;
  }

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
    if (hasPlayed) return;
    hasPlayed = true;
    typeText(firstPrompt, 35, () => {
      deleteText(() => {
        typeText(secondPrompt, 28);
      });
    });
  }

  // Make typing happen when #method enters viewport
  const methodSection = document.querySelector('#method');
  if (methodSection) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeSequence();
          obs.disconnect(); // run only once
        }
      });
    }, { threshold: 0.1 }); // smaller threshold to trigger earlier
    observer.observe(methodSection);
  }
});