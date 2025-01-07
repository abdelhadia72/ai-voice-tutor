"use client";

import { useState, useRef } from "react";
import { Mic, Square } from "lucide-react";
import { STTService } from "@/lib/services/stt/stt-service";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  onRecordingComplete: (blob: Blob, transcript: string) => void;
  sttService: STTService;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function VoiceRecorder({
  onTranscript,
  onRecordingComplete,
  sttService,
  isRecording,
  onStartRecording,
  onStopRecording,
}: VoiceRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");

  const startRecording = async () => {
    try {
      // Reset state
      audioChunksRef.current = [];
      setCurrentTranscript("");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Start STT before recording
      await sttService.start({
        onResult: (text) => {
          setCurrentTranscript(text);
          onTranscript(text);
        },
        onError: console.error,
      });

      // each 100ms get data from client
      recorder.start(100);
      onStartRecording();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      // get the current transcript
      const finalTranscript = currentTranscript;

      // promise resolves when recording stopped
      const recordingStopped = new Promise<void>((resolve) => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/webm;codecs=opus",
            });
            if (finalTranscript.trim()) {
              onRecordingComplete(audioBlob, finalTranscript);
            }
            resolve();
          };
        }
      });

      // Stop recording and clean up
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      sttService.stop();

      // Wait for recording to finish before resetting state
      await recordingStopped;
      onStopRecording();
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`p-2 rounded-full transition-colors ${
        isRecording
          ? "bg-red-500 hover:bg-red-600"
          : "bg-teal-500 hover:bg-teal-600"
      } text-white`}
    >
      {isRecording ? (
        <Square className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
}
