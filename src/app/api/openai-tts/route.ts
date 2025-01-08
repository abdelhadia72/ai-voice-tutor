import { NextResponse } from "next/server";
import OpenAI from "openai";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CACHE_DIR = path.join(process.cwd(), "public", "audio-cache");

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

function generateCacheFilename(text: string, voice: string): string {
  const hash = crypto
    .createHash("md5")
    .update(`${text}-${voice}`)
    .digest("hex");
  return `${hash}.mp3`;
}

// Map of voices optimized for different languages
const VOICE_LANGUAGE_MAP: { [key: string]: string } = {
  ar: "nova",    // Arabic - Nova has better pronunciation for Arabic
  en: "alloy",   // English
  fr: "echo",    // French
  es: "nova",    // Spanish
  de: "fable",   // German
  default: "alloy"
};

export async function POST(req: Request) {
  try {
    const { text, voice = "alloy", language = "en" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Select the best voice for the language
    const selectedVoice = VOICE_LANGUAGE_MAP[language] || voice;

    const cacheFilename = generateCacheFilename(text, selectedVoice);
    const cacheFilePath = path.join(CACHE_DIR, cacheFilename);
    const publicUrl = `/audio-cache/${cacheFilename}`;

    // Return cached audio if available
    if (fs.existsSync(cacheFilePath)) {
      return NextResponse.json({ audioUrl: publicUrl });
    }

    // Set timeout for the OpenAI API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: selectedVoice,
        input: text,
      }, { signal: controller.signal });

      clearTimeout(timeoutId);

      const buffer = Buffer.from(await mp3.arrayBuffer());
      fs.writeFileSync(cacheFilePath, buffer);

      return NextResponse.json({ audioUrl: publicUrl });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json(
          { error: "Request timed out" },
          { status: 408 }
        );
      }
      throw error; // Re-throw other errors to be caught by outer catch
    }
  } catch (error: unknown) {
    console.error("TTS error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to generate speech",
        details: error
      },
      { status: 500 }
    );
  }
}
