"use client";
import { ElevenLabsClient } from "elevenlabs";
import React, { useCallback, useRef, useState } from "react";

import env from "@/config/env.config";

const client = new ElevenLabsClient({
  apiKey: env.elevenLabs.apiKey,
});

const StreamTextAudio = ({ text }: { text: string }) => {
  const [renderText, setRenderText] = useState("");
  const audioRef = useRef(new Audio());
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const startTimeRef = useRef(0);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  };

  const startPlayback = useCallback(async () => {
    try {
      console.info("Starting playback");
      clearTimeouts();
      audioRef?.current?.pause();
      audioRef.current = new Audio();

      const response = await client.textToSpeech.convertWithTimestamps("pbufn2IIcaA9SVLS6d0k", {
        output_format: "mp3_44100_128",
        text: text,
        model_id: "eleven_multilingual_v2",
      });

      const processItem = async (item) => {
        if (item.audio_base64) {
          // Convert base64 to audio blob
          const audioData = atob(item.audio_base64);
          const arrayBuffer = new ArrayBuffer(audioData.length);
          const uint8Array = new Uint8Array(arrayBuffer);
          for (let i = 0; i < audioData.length; i++) {
            uint8Array[i] = audioData.charCodeAt(i);
          }
          const blob = new Blob([uint8Array], { type: "audio/mp3" });
          const audioUrl = URL.createObjectURL(blob);

          console.info("Audio URL:", audioUrl);

          const audio = new Audio(audioUrl);
          audioRef.current = audio;
          audioRef.current.currentTime = 0;
        }

        if (item.normalized_alignment) {
          const { characters, character_start_times_seconds } = item.normalized_alignment;

          startTimeRef.current = Date.now();

          characters.forEach((char: string, index: number) => {
            const startTime = character_start_times_seconds[index] * 1000;
            const timeout = setTimeout(() => {
              setRenderText((prev) => prev + char);
            }, startTime);
            timeoutsRef.current.push(timeout);
          });

          await audioRef.current
            .play()
            .then(() => {})
            .catch((error) => {
              console.error("Error starting playback:", error);
            });
        }
      };

      await processItem(response);
    } catch (error) {
      console.error("Error starting playback:", error);
    }
  }, [text]);

  React.useEffect(() => {
    startPlayback();

    return () => {
      clearTimeouts();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = "";
      }
    };
  }, [startPlayback]);

  return renderText;
};

export default StreamTextAudio;
