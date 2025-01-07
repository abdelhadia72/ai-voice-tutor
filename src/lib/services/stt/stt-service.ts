export interface STTOptions {
  onResult?: (text: string) => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
  language?: string;
}

export interface STTService {
  start(options: STTOptions): Promise<void>;
  stop(): void;
  isListening(): boolean;
}

export class BrowserSTTService implements STTService {
  private recognition: any;
  private isActive: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error("Speech recognition not supported in this browser");
      }
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
    }
  }

  async start(options: STTOptions): Promise<void> {
    this.recognition.lang = options.language || 'en-US';
    
    this.recognition.onresult = (event: any) => {
      const text = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join(' ');
      
      options.onResult?.(text);
    };

    this.recognition.onend = () => {
      this.isActive = false;
      options.onEnd?.();
    };

    this.recognition.onerror = (error: any) => {
      options.onError?.(error);
    };

    this.recognition.start();
    this.isActive = true;
  }

  stop(): void {
    if (this.isActive) {
      this.recognition.stop();
      this.isActive = false;
    }
  }

  isListening(): boolean {
    return this.isActive;
  }
} 