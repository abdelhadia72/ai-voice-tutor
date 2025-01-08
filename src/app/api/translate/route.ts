import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("No env key found");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a professional translator specializing in English to Arabic translation.
Please translate the following English text to Modern Standard Arabic (MSA).
Maintain the same tone and formality level as the original text.
Provide ONLY the Arabic translation, no explanations or additional text:

${text}`;

    const result = await model.generateContent(prompt);
    const translation = result.response.text();
    
    return NextResponse.json({
      translation: translation.trim(),
      original: text
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to translate text' },
      { status: 500 }
    );
  }
} 