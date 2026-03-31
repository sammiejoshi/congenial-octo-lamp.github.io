// Scroll reveal for all sections (repeatable)
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // repeat effect on scroll back
      }

      // Trigger AI animation only when Method section enters viewport
      if(entry.target.id === 'method' && entry.isIntersecting){
        startAIPromptAnimation();
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach(section => observer.observe(section));

// AI Prompt Animation: Instant paste → delete → human-style prompt typing
const aiPromptEl = document.getElementById('ai-prompt');

const aiTexts = [
  "AI-generated text: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  "AI-generated text: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
];

const humanPrompt = "Rewrite this AI output in a clear, human-friendly way.";

let aiIndex = 0;
let typingInProgress = false;

function startAIPromptAnimation() {
  if(typingInProgress) return; // Prevent multiple triggers
  typingInProgress = true;

  function showNext() {
    // Instant paste AI text
    aiPromptEl.textContent = aiTexts[aiIndex];

    setTimeout(() => {
      // Instant delete
      aiPromptEl.textContent = "";

      // Type human-style prompt letter by letter
      let i = 0;
      function typeHuman() {
        if(i < humanPrompt.length) {
          aiPromptEl.textContent += humanPrompt.charAt(i);
          i++;
          setTimeout(typeHuman, 40);
        } else {
          // After a pause, show next AI text
          setTimeout(() => {
            aiIndex = (aiIndex + 1) % aiTexts.length;
            showNext();
          }, 2000);
        }
      }
      typeHuman();
    }, 1000); // Show AI text for 1 second
  }

  showNext();
}