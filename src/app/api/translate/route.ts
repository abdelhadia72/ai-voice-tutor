import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("No env key found");
}

const genAI = new GoogleGenerativeAI(apiKey);

const languageNames: { [key: string]: string } = {
  en: "English",
  es: "Spanish",
  de: "German",
  fr: "French",
  ar: "Arabic",
};

export async function POST(req: Request) {
  try {
    const { text, targetLanguage } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const languageName = languageNames[targetLanguage] || targetLanguage;

    const prompt = `You are a professional translator specializing in translation to ${languageName}.
Please translate the following text to ${languageName}.
Maintain the same tone and formality level as the original text.
Provide ONLY the translation, no explanations or additional text:

${text}`;

    const result = await model.generateContent(prompt);
    const translation = result.response.text();

    return NextResponse.json({
      translation: translation.trim(),
      original: text,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Failed to translate text" },
      { status: 500 },
    );
  }
}
