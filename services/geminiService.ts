import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDb5yVbZSoJxq5pScKzdadb0QbO-E1n6Cs';
    if (!apiKey) {
      console.error("Gemini API Key is missing! Make sure VITE_GEMINI_API_KEY is set in .env.local");
      throw new Error("Missing API Key");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export interface LyricsResponse {
  verse: string;
  chords: string;
  referenceSong: string;
  referenceArtist: string;
  raagAnalysis: string;
}

export const generateLyrics = async (mood: string, genre: string): Promise<LyricsResponse | null> => {
  try {
    const client = getAiClient();
    const model = 'gemini-2.5-flash';
    const prompt = `You are a master songwriter for an Indian Fusion band that blends Western music with Indian Classical/Sufi/Folk.

TASK: Create a song verse based on the input.

INPUT:
- Mood/Vibe: ${mood}
- Fusion Style: ${genre}

OUTPUT REQUIREMENTS:
1. RAAG ANALYSIS: Briefly identify which Indian raag or musical mode fits this mood (1 short line)
2. VERSE: Write EXACTLY 4-8 lines of song lyrics in HINDI language but written in ENGLISH/ROMAN script (transliteration). ONLY include the actual lyrics - no titles, no labels, no explanations, no "Verse 1:" prefixes. Just pure poetic lines separated by \\n.
3. CHORDS: Provide a chord progression that fits the verse (e.g., "Am - G - C - F")
4. REFERENCE SONG: Name ONE popular Bollywood or Indian indie song that matches the tone, rhythm, and tempo. Prefer well-known songs. Include the artist name.

CRITICAL: The "verse" field must contain ONLY the song lyrics themselves. No introductions, no explanations, no commentary. Just 4-8 lines of the actual song.

RESPOND ONLY WITH THIS EXACT JSON FORMAT (no markdown, no code blocks):
{
  "raagAnalysis": "This mood evokes Raag Yaman with its...",
  "verse": "Line 1\\nLine 2\\nLine 3\\nLine 4",
  "chords": "Am - G - C - F (repeat)",
  "referenceSong": "Tum Hi Ho",
  "referenceArtist": "Arijit Singh"
}`;

    const response = await client.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        maxOutputTokens: 600,
        temperature: 0.85,
      }
    });

    const text = response.text || "";

    // Parse JSON response
    try {
      // Clean up potential markdown code blocks
      let cleanText = text.trim();
      if (cleanText.startsWith("```json")) {
        cleanText = cleanText.slice(7);
      } else if (cleanText.startsWith("```")) {
        cleanText = cleanText.slice(3);
      }
      if (cleanText.endsWith("```")) {
        cleanText = cleanText.slice(0, -3);
      }
      cleanText = cleanText.trim();

      const parsed = JSON.parse(cleanText) as LyricsResponse;
      return parsed;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError, text);
      // Fallback: return the raw text as verse
      return {
        verse: text,
        chords: "Am - G - C - Em",
        referenceSong: "Kabira",
        referenceArtist: "Arijit Singh & Rekha Bhardwaj",
        raagAnalysis: "Fusion blend based on your mood"
      };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};