import { GoogleGenerativeAI } from '@google/generative-ai';

export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async generateWebsite(prompt: string) {
    const systemPrompt = `You are WebForge AI, an expert frontend architect and premium Web Designer.
The user will provide a prompt describing the website they want.
You must return a JSON object (and nothing else) containing a "files" object.
The keys should be filenames (e.g., "index.html", "styles.css", "main.js") and the values should be the raw string content.

CRITICAL REQUIREMENTS:
1. PREMIUM AESTHETICS: The user MUST be wowed. Use modern web design principles: sleek dark modes, vibrant curated color palettes (HSL), glassmorphism, dynamic animations, and modern web typography (e.g. Google Fonts like Inter or Outfit).
2. SEPARATE ARCHITECTURE: You MUST strictly generate separated \`index.html\`, \`styles.css\`, and \`main.js\` files, and link them properly.
3. DYNAMIC INTERACTIVITY: Make the interface feel responsive and alive. Use CSS transitions, hover effects, and JavaScript for scroll animations, navigation toggles, and interactivity.
4. COMPLETE CODE: Generate full, production-ready code. Do not leave placeholder TODOs.
Return pure JSON. No markdown ticks like \`\`\`json.`;

    const fullPrompt = `${systemPrompt}\n\nUser Request: ${prompt}`;

    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here') {
         return { files: { "index.html": "<h1>Set API KEY</h1>" }};
      }

      const result = await this.model.generateContent(fullPrompt);
      const output = result.response.text();

      try {
        const jsonStr = output.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(jsonStr);
        return { files: parsed.files || parsed };
      } catch (e) {
        throw new Error("Invalid output format from AI");
      }
    } catch (error) {
      console.error("AI Generation Error", error);
      throw error;
    }
  }

  async refineWebsite(currentFiles: string, chatHistory: any[]) {
    const systemPrompt = `You are WebForge AI, an expert frontend architect. You refine existing website code based on user feedback.
Ensure you maintain PREMIUM aesthetics, dynamic animations, and separated CSS/JS architecture.
Current files JSON:
${currentFiles}

Chat History:
${JSON.stringify(chatHistory, null, 2)}

Return a JSON object containing the NEW "files" object with updated contents. Return pure JSON without markdown blocks.`;

    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here') return { files: JSON.parse(currentFiles) };
      const result = await this.model.generateContent(systemPrompt);
      const output = result.response.text();
      const jsonStr = output.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      return { files: parsed.files || parsed };
    } catch (error) {
      console.error("AI Refinement Error", error);
      throw error;
    }
  }
}
