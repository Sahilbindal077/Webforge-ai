import OpenAI from 'openai';

const GROQ_MODEL = 'llama-3.3-70b-versatile';

function extractJSON(raw: string): any {
  // 1. Try parsing directly
  try { return JSON.parse(raw); } catch {}

  // 2. Strip markdown code fences and try again
  const stripped = raw.replace(/```[a-z]*/gi, '').replace(/```/g, '').trim();
  try { return JSON.parse(stripped); } catch {}

  // 3. Find the first { ... } block via regex
  const match = stripped.match(/{[\s\S]*}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch {}
  }

  throw new Error('Invalid output format from AI');
}

const GENERATE_SYSTEM_PROMPT = `You are WebForge AI, an elite frontend architect and world-class UI/UX designer. Your designs win Awwwards. Your code is production-ready and visually stunning.

The user wants a website. Return ONLY a valid JSON object with a "files" key containing these three files: "index.html", "styles.css", "main.js".
Return ONLY raw JSON — no markdown, no code fences, no explanation. Just the JSON object.

=== styles.css REQUIREMENTS ===
Your CSS must be WORLD-CLASS. These rules are MANDATORY:

1. GOOGLE FONTS: Always start with:
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

2. CSS VARIABLES at :root:
   :root {
     --bg: #0a0a0f;
     --bg-2: #12121a;
     --surface: rgba(255,255,255,0.05);
     --border: rgba(255,255,255,0.08);
     --accent: #6c63ff;
     --accent-2: #a78bfa;
     --text: #f0f0ff;
     --text-muted: #8888aa;
     --gradient: linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%);
     --glow: 0 0 40px rgba(108,99,255,0.35);
     --shadow: 0 20px 60px rgba(0,0,0,0.5);
     --radius: 16px;
     --transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
   }

3. GLOBAL RESET:
   * { margin:0; padding:0; box-sizing:border-box; }
   html { scroll-behavior: smooth; }
   body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; overflow-x: hidden; }

4. DARK MODE with deep dark backgrounds (#0a0a0f range).

5. GLASSMORPHISM for cards:
   background: var(--surface); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
   border: 1px solid var(--border); border-radius: var(--radius);

6. GRADIENT text for headlines:
   background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;

7. MANDATORY KEYFRAME ANIMATIONS — include all of these:
   @keyframes fadeInUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
   @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
   @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
   @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 20px rgba(108,99,255,0.3); } 50% { box-shadow: 0 0 60px rgba(108,99,255,0.7); } }
   @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

8. SCROLL ANIMATION classes (JS will add these):
   .animate { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
   .animate.visible { opacity: 1; transform: translateY(0); }

9. HOVER EFFECTS on all interactive elements:
   - Buttons: transform: translateY(-2px); box-shadow: var(--glow); background: var(--gradient);
   - Cards: transform: translateY(-6px); border-color: var(--accent);
   - Links: color: var(--accent); text-decoration: none;

10. NAVBAR with scroll effect:
    nav { position: fixed; top:0; width:100%; z-index:1000; padding: 1.2rem 2rem; transition: var(--transition); }
    nav.scrolled { background: rgba(10,10,15,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }

11. HERO SECTION with large clamp typography:
    font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 800; line-height: 1.1;

12. BUTTONS with gradient and glow:
    .btn { padding: 0.85rem 2rem; border: none; border-radius: 50px; cursor: pointer; font-weight: 600; transition: var(--transition); }
    .btn-primary { background: var(--gradient); color: #fff; }
    .btn-primary:hover { transform: translateY(-3px); box-shadow: var(--glow); }

13. RESPONSIVE breakpoints at 768px and 480px.

14. BACKGROUND DECORATION — large blurred gradient orbs:
    .bg-orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }

=== index.html REQUIREMENTS ===
- Semantic HTML5: <header>, <nav>, <main>, <section>, <footer>
- In <head>: Include Google Fonts <link> AND meta viewport
- DO NOT include <link> for styles.css or <script> for main.js (injected automatically)
- Add class="animate" to elements you want scroll-animated
- Build a full, rich page: hero, features/services, about, contact, footer sections

=== main.js REQUIREMENTS ===
Include ALL of this JavaScript:

// 1. Scroll animations with IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => { if(el.isIntersecting) { el.target.classList.add('visible'); } });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// 2. Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => { if(nav) nav.classList.toggle('scrolled', window.scrollY > 60); });

// 3. Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// 4. Mobile menu toggle (if nav has a hamburger #menu-btn and #nav-links)
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
if(menuBtn && navLinks) { menuBtn.addEventListener('click', () => navLinks.classList.toggle('open')); }

// 5. Add any other feature-specific JS the website needs (counters, tabs, sliders, forms, etc.)
`;

const REFINE_SYSTEM_PROMPT = `You are WebForge AI, an elite frontend architect. You refine existing websites while keeping the premium quality.

RULES:
- Maintain the CSS design system (variables, dark mode, glassmorphism, animations).
- Keep all JavaScript working.
- Return ONLY raw JSON (no markdown) with a "files" key containing "index.html", "styles.css", "main.js".
`;

export class AIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY || '',
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  private isKeyMissing(): boolean {
    return !process.env.GROQ_API_KEY;
  }

  async generateWebsite(prompt: string) {
    try {
      if (this.isKeyMissing()) {
        return { files: { 'index.html': '<h1>Please set GROQ_API_KEY in .env</h1>' } };
      }

      const completion = await this.client.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: GENERATE_SYSTEM_PROMPT },
          { role: 'user', content: `Generate a premium website for: ${prompt}\n\nReturn ONLY the JSON object now.` },
        ],
        temperature: 0.7,
        max_tokens: 8192,
      });

      const output = completion.choices[0]?.message?.content || '';

      try {
        const parsed = extractJSON(output);
        return { files: parsed.files || parsed };
      } catch (e) {
        console.error('Raw AI output (first 800 chars):', output.slice(0, 800));
        throw new Error('Invalid output format from AI');
      }
    } catch (error) {
      console.error('AI Generation Error', error);
      throw error;
    }
  }

  async refineWebsite(currentFiles: string, chatHistory: any[]) {
    const lastMessage = chatHistory[chatHistory.length - 1]?.content || '';

    const userContent = `${REFINE_SYSTEM_PROMPT}

Current website files (JSON):
${currentFiles}

User refinement request: "${lastMessage}"

Return the full updated files as JSON now.`;

    try {
      if (this.isKeyMissing()) return { files: JSON.parse(currentFiles) };

      const completion = await this.client.chat.completions.create({
        model: GROQ_MODEL,
        messages: [{ role: 'user', content: userContent }],
        temperature: 0.7,
        max_tokens: 8192,
      });

      const output = completion.choices[0]?.message?.content || '';
      const parsed = extractJSON(output);
      return { files: parsed.files || parsed };
    } catch (error) {
      console.error('AI Refinement Error', error);
      throw error;
    }
  }
}
