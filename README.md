<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Writer's Block</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: #0a0a0a;
      color: #f5f2eb;
      overflow-x: hidden;
    }

    section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6rem 8vw;
      position: relative;
    }

    .hero {
      background: #000;
      text-align: center;
      flex-direction: column;
    }

    .title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(4rem, 10vw, 9rem);
      font-weight: 400;
      letter-spacing: -0.03em;
      line-height: 0.9;
      opacity: 0;
      transform: translateY(30px);
      animation: fadeUp 1.2s ease forwards;
    }

    .subtitle {
      margin-top: 1rem;
      font-size: 0.8rem;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      opacity: 0.7;
    }

    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      font-size: 0.7rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      opacity: 0.6;
      animation: pulse 2s infinite;
    }

    .dark-section {
      background: linear-gradient(180deg, #0b0b0b, #16120f);
      display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 4rem;
    }

    .big-copy {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3rem, 6vw, 6rem);
      line-height: 0.95;
      color: #d8cfc2;
    }

    .grid-list {
      display: grid;
      gap: 2rem;
      font-size: 0.95rem;
      color: #b8afa3;
    }

    .cards-section {
      background: #6f6b63;
      color: #f7f1e8;
      flex-direction: column;
      text-align: center;
    }

    .cards-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(3rem, 6vw, 5.5rem);
      margin-bottom: 4rem;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      width: 100%;
      max-width: 1200px;
    }

    .card {
      padding: 2rem;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(4px);
      text-align: left;
      transition: transform 0.4s ease, opacity 0.4s ease;
    }

    .card:hover { transform: translateY(-8px); }

    .end {
      background: #f5f0e7;
      color: #111;
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(4rem, 10vw, 8rem);
      letter-spacing: 0.08em;
    }

    .reveal {
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.9s ease;
    }

    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @keyframes fadeUp {
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }

    @media (max-width: 900px) {
      .dark-section, .cards { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1 class="title">Writer's Block</h1>
    <p class="subtitle">An Anatomy of Silence</p>
    <div class="scroll-indicator">Scroll</div>
  </section>

  <section class="dark-section reveal">
    <div class="big-copy">A cognitive overload masquerading as emptiness.</div>
    <div class="grid-list">
      <div><strong>01</strong> Perfectionism</div>
      <div><strong>02</strong> Cognitive Load</div>
      <div><strong>03</strong> Fear of Judgment</div>
      <div><strong>04</strong> Identity Threat</div>
    </div>
  </section>

  <section class="cards-section reveal">
    <h2 class="cards-title">Lower the stakes to zero.</h2>
    <div class="cards">
      <div class="card">
        <h3>Embrace the Trash</h3>
        <p>Accept that the first draft is intentionally flawed.</p>
      </div>
      <div class="card">
        <h3>Disrupt Context</h3>
        <p>Break environmental habits to reset creative patterns.</p>
      </div>
      <div class="card">
        <h3>Kinetic Overload</h3>
        <p>Move first. Let motion generate momentum.</p>
      </div>
    </div>
  </section>

  <section class="end reveal">BEGIN.</section>

  <script>
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      document.querySelector('.title').style.transform = `translateY(${y * 0.15}px)`;
    });
  </script>
</body>
</html>
