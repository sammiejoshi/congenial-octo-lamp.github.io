const methodText = document.querySelector('#method-typing');
const firstPrompt = 'Generate a structured methodology section using AI-assisted research synthesis...';
const secondPrompt = 'Rewriting: Mixed-method analysis using iterative prompt refinement and human validation.';
let hasPlayed = false;

function typeText(text, speed = 35, callback) {
  let i = 0;
  function typing() {
    methodText.textContent = text.slice(0, i++);
    if (i <= text.length) {
      setTimeout(typing, speed);
    } else if (callback) {
      setTimeout(callback, 500); // small pause before next step
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
  if (hasPlayed) return;
  hasPlayed = true;
  typeText(firstPrompt, 35, () => {
    deleteText(() => {
      typeText(secondPrompt, 28);
    });
  });
}

// Trigger when method section comes into view
const methodSection = document.querySelector('#method');
if (methodSection) {
  const methodObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) typeSequence();
    });
  }, { threshold: 0.4 });
  methodObserver.observe(methodSection);
}