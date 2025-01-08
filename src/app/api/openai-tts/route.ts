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

export async function POST(req: Request) {
  try {
    const { text, voice = "fable" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const cacheFilename = generateCacheFilename(text, voice);
    const cacheFilePath = path.join(CACHE_DIR, cacheFilename);
    const publicUrl = `/audio-cache/${cacheFilename}`;

    if (fs.existsSync(cacheFilePath)) {
      return NextResponse.json({ audioUrl: publicUrl });
    }

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    fs.writeFileSync(cacheFilePath, buffer);

    return NextResponse.json({ audioUrl: publicUrl });
  } catch (error) {
    console.error("TTS error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 },
    );
  }
}
