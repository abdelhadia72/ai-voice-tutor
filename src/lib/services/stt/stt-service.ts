// Add type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

declare class SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

export interface STTOptions {
  onResult?: (text: string) => void;
  onEnd?: () => void;
  onError?: (error: SpeechRecognitionErrorEvent) => void;
  language?: string;
}

export interface STTService {
  start(options: STTOptions): Promise<void>;
  stop(): void;
  isListening(): boolean;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

export class BrowserSTTService implements STTService {
  private recognition: SpeechRecognition | null = null;
  private isActive: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error("Speech recognition not supported in this browser");
      }
      this.recognition = new SpeechRecognition();
      if (this.recognition) {
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
      }
    }
  }

  async start(options: STTOptions): Promise<void> {
    if (!this.recognition) {
      throw new Error("Speech recognition not initialized");
    }

    this.recognition.lang = options.language || 'en-US';
    
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join(' ');
      
      options.onResult?.(text);
    };

    this.recognition.onend = () => {
      this.isActive = false;
      options.onEnd?.();
    };

    this.recognition.onerror = (error: SpeechRecognitionErrorEvent) => {
      options.onError?.(error);
    };

    this.recognition.start();
    this.isActive = true;
  }

  stop(): void {
    if (this.isActive && this.recognition) {
      this.recognition.stop();
      this.isActive = false;
    }
  }

  isListening(): boolean {
    return this.isActive;
  }
} 