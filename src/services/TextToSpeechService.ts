import OpenAI from 'openai';

export class TextToSpeechService {
  private openai: OpenAI;
  
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Commented out browser TTS for later use
  // async browserTTS(text: string): Promise<void> {
  //   if (!window.speechSynthesis) {
  //     throw new Error('Browser TTS not supported');
  //   }

  //   const utterance = new SpeechSynthesisUtterance(text);
  //   window.speechSynthesis.speak(utterance);
  // }

  async openAITTS(text: string): Promise<ArrayBuffer> {
    const response = await this.openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  }

  async speak(text: string, forceBrowser?: boolean): Promise<ArrayBuffer> {
    // Temporarily using only OpenAI TTS
    return this.openAITTS(text);
    
    // Original environment-based logic (commented out)
    // if (process.env.NODE_ENV === 'development' || forceBrowser) {
    //   return this.browserTTS(text);
    // }
    // return this.openAITTS(text);
  }
} 