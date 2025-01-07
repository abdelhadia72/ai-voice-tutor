export interface TTSService {
  speak(text: string): Promise<void>;
  stop(): void;
  isPlaying(): boolean;
}

export class BrowserTTSService implements TTSService {
  private utterance: SpeechSynthesisUtterance | null = null;

  async speak(text: string): Promise<void> {
    if (typeof window === "undefined") return;
    
    this.stop();
    this.utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(this.utterance);
    
    return new Promise((resolve) => {
      if (this.utterance) {
        this.utterance.onend = () => resolve();
      }
    });
  }

  stop(): void {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
  }

  isPlaying(): boolean {
    if (typeof window === "undefined") return false;
    return window.speechSynthesis.speaking;
  }
}

export class OpenAITTSService implements TTSService {
  private audio: HTMLAudioElement | null = null;

  async speak(text: string): Promise<void> {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      this.stop();
      this.audio = new Audio(audioUrl);
      
      return new Promise((resolve) => {
        if (this.audio) {
          this.audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            resolve();
          };
          this.audio.play();
        }
      });
    } catch (error) {
      console.error('TTS error:', error);
      throw error;
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  isPlaying(): boolean {
    return this.audio ? !this.audio.paused : false;
  }
} 