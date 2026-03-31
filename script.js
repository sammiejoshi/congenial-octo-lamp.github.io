// Reveal sections on scroll
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


// AI Prompt animation: Instant paste then rewrite as human prompt
const aiPromptEl = document.getElementById('ai-prompt');

const prompts = [
  "AI-generated text: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  "AI-generated text: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
];

const humanPrompt = "Rewrite this prompt in human style for clarity and purpose.";

let currentIndex = 0;

function pasteAndRewrite() {
  if(aiPromptEl.dataset.started) return;
  aiPromptEl.dataset.started = true;

  function showNext() {
    // Instant paste AI text
    aiPromptEl.textContent = prompts[currentIndex];

    setTimeout(() => {
      // Delete instantly
      aiPromptEl.textContent = "";

      // Type out human prompt
      let i = 0;
      function typeHuman() {
        if(i < humanPrompt.length) {
          aiPromptEl.textContent += humanPrompt.charAt(i);
          i++;
          setTimeout(typeHuman, 50);
        } else {
          // Loop to next AI text after a delay
          setTimeout(() => {
            currentIndex = (currentIndex + 1) % prompts.length;
            showNext();
          }, 2000);
        }
      }
      typeHuman();
    }, 1000); // Keep AI text visible briefly
  }

  showNext();
}

function startAIPromptAnimation() {
  pasteAndRewrite();
}