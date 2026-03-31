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

const methodText = document.querySelector('#method-typing');
const firstPrompt = 'Generate a structured methodology section using AI-assisted research synthesis...';
const secondPrompt = 'Rewriting: Mixed-method analysis using iterative prompt refinement and human validation.';

let hasPlayed = false;
function typeSequence() {
  if (!methodText || hasPlayed) return;
  hasPlayed = true;
  let i = 0;
  let deleting = false;
  let current = firstPrompt;

  function animate() {
    if (!deleting) {
      methodText.textContent = current.slice(0, i++);
      if (i <= current.length) return setTimeout(animate, 35);
      deleting = true;
      return setTimeout(animate, 900);
    }

    methodText.textContent = current.slice(0, i--);
    if (i >= 0) return setTimeout(animate, 18);

    current = secondPrompt;
    deleting = false;
    i = 0;

    function rewrite() {
      methodText.textContent = current.slice(0, i++);
      if (i <= current.length) setTimeout(rewrite, 28);
    }
    rewrite();
  }
  animate();
}

const methodSection = document.querySelector('#method');
const methodObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if (entry.isIntersecting) typeSequence();
  });
}, {threshold:0.4});
if (methodSection) methodObserver.observe(methodSection);

});