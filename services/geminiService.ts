
import { GoogleGenAI } from "@google/genai";
import { ResumeRequest } from "../types";

export const generateResume = async (request: ResumeRequest): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `You are a world-class Executive Resume Architect and Master Brand Strategist. Your goal is to produce a resume that is not just a document, but a high-conversion marketing tool for an elite executive.

STRICT VISUAL & CONTENT ARCHITECTURE:
1. LAYOUT: Strict single-column, spacious design.
2. HEADER: 
   - Name in H1.
   - Professional Brand Statement in H3 (e.g., "Global Technology Executive | Scaling $100M+ Operations").
   - One-line contact block with separators (📍 · ✉️ · 📞 · 🔗).
3. SUMMARY: A 5-line power narrative highlighting "Legacy Wins" and "Future Potential".
4. EXPERIENCE:
   - Format: #### Job Title at Company Name | Month YYYY – Present
   - Every bullet MUST start with a bold Action Verb.
   - Use the APR (Action-Project-Result) model. 
   - EVERY bullet must contain a metric (%, $, #, Scale).
5. SKILLS: Categorize into "Strategic Leadership", "Industry Expertise", and "Digital & Tech Stack".
6. STYLE: 
   - Use Markdown H1, H2, H3, H4 correctly.
   - Use --- for section breaks.
   - Ensure a clean, scannable "F-pattern" flow.

Output ONLY the raw markdown. Do not include any preamble. End with the standard disclaimer about personalization.`;

  const prompt = `
Generate a High-Impact, Stylish Executive Resume for:

TARGET POSITION:
Title: ${request.targetRole}
Focus Area: ${request.details.targetTitle || request.targetRole}
${request.targetCompany ? `Target Company: ${request.targetCompany}` : ""}

CANDIDATE PROFILE:
Name: ${request.details.fullName}
Location: ${request.details.location}
Contact: ${request.details.email} | ${request.details.phone}
LinkedIn/Portfolio: ${request.details.linkedin || ""} | ${request.details.portfolio || ""}

CAREER HISTORY:
${request.details.experience}

ACADEMIC FOUNDATION:
${request.details.education}

CORE COMPETENCIES:
${request.details.skills}

EXTRAS:
${request.details.certifications ? `Certs: ${request.details.certifications}` : ""}
${request.details.languages ? `Languages/Awards: ${request.details.languages}` : ""}

STYLING DIRECTIVE:
${request.details.specialRequests || "Emphasize high-stakes decision making and measurable bottom-line impact."}

Generate the full Ultra-Polished Markdown document now.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.65,
      },
    });

    return response.text || "Failed to generate resume content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("An error occurred while generating your resume. Please try again.");
  }
};
