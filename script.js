// Smooth scroll reveal for sections
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        if(entry.target.id === 'method'){
          startAIPromptAnimation();
        }
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach(section => observer.observe(section));


// AI Prompt typing animation for Method section
const aiPromptEl = document.getElementById('ai-prompt');
const prompts = [
  "Generating AI prompt...",
  "Processing data...",
  "Analyzing results...",
  "Finalizing output..."
];

let currentPromptIndex = 0;

function typeWriter(text, i = 0, callback) {
  if (i < text.length) {
    aiPromptEl.textContent += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1, callback), 50);
  } else {
    setTimeout(callback, 500);
  }
}

function deleteWriter(callback) {
  const text = aiPromptEl.textContent;
  let i = text.length;
  function deleteChar() {
    if (i > 0) {
      aiPromptEl.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(deleteChar, 30);
    } else {
      callback();
    }
  }
  deleteChar();
}

function startAIPromptAnimation() {
  if(aiPromptEl.dataset.started) return; // prevent re-trigger
  aiPromptEl.dataset.started = true;

  function nextPrompt() {
    typeWriter(prompts[currentPromptIndex], 0, () => {
      deleteWriter(() => {
        currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
        nextPrompt();
      });
    });
  }

  nextPrompt();
}