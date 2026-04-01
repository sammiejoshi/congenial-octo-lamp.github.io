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

      // Trigger AI animation only once for Method section
      if(entry.target.id === 'method' && entry.isIntersecting){
        startAIPromptAnimation();
      }
    });
  },
  { threshold: 0.3 }
);

// Observe each section
sections.forEach(section => observer.observe(section));

// AI Prompt Animation: Start blank → instant AI paste → delete char → human prompt
const aiPromptEl = document.getElementById('ai-prompt');
const aiTexts = [
  "AI-generated text: Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  "AI-generated text: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
];
const humanPrompt = "Rewrite this AI output in a clear, human-friendly way.";

let aiIndex = 0;
let animationPlayed = false;

function startAIPromptAnimation() {
  if(animationPlayed) return;
  animationPlayed = true;

  aiPromptEl.textContent = ""; // start completely blank

  function showNext() {
    // Instant paste AI text
    aiPromptEl.textContent = aiTexts[aiIndex];

    setTimeout(() => {
      // Delete character by character
      let text = aiPromptEl.textContent;
      let i = text.length;
      function deleteChar() {
        if(i > 0){
          aiPromptEl.textContent = text.substring(0, i - 1);
          i--;
          setTimeout(deleteChar, 20); // quick deletion
        } else {
          // Type human-style prompt
          let j = 0;
          function typeHuman() {
            if(j < humanPrompt.length){
              aiPromptEl.textContent += humanPrompt.charAt(j);
              j++;
              setTimeout(typeHuman, 40);
            }
          }
          typeHuman();
        }
      }
      deleteChar();
    }, 1000); // keep AI text visible 1s
  }

  showNext();
}