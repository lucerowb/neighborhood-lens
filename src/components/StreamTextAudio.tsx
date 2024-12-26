"use client";
import { ElevenLabsClient } from "elevenlabs";
import React, { useCallback, useRef, useState } from "react";

import env, { isDev } from "@/config/env.config";

const client = new ElevenLabsClient({
  apiKey: env.elevenLabs.apiKey,
});

export interface TextAudioProps {
  text: string;
  onAudioStart?: () => void;
  onAudioEnd?: () => void;
}

const StreamTextAudio = ({ text, onAudioEnd, onAudioStart }: TextAudioProps) => {
  const [renderText, setRenderText] = useState(isDev ? text : "");
  const audioRef = useRef(new Audio());
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const startTimeRef = useRef(0);
  const isPlaybackActive = useRef(false);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  };

  const startPlayback = useCallback(async () => {
    if (isPlaybackActive.current) {
      return;
    }
    try {
      onAudioStart?.();

      clearTimeouts();

      isPlaybackActive.current = true;

      const response = await client.textToSpeech.convertWithTimestamps("pbufn2IIcaA9SVLS6d0k", {
        output_format: "mp3_44100_128",
        text: text,
        model_id: "eleven_multilingual_v2",
      });

      const processItem = async (item: any) => {
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

          const audio = new Audio(audioUrl);

          audio.onended = () => {
            onAudioEnd?.();
          };
          audioRef.current = audio;
          audioRef.current.muted = true;
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
            .then(() => {
              console.info("Playback started");
            })
            .catch((error) => {
              console.error("Error starting playback:", error);
            });

          audioRef.current.muted = false;
        }
      };

      await processItem(response);
    } catch (error) {
      console.error("Error starting playback:", error);
    } finally {
      isPlaybackActive.current = false;
    }
  }, [text, onAudioEnd, onAudioStart]);

  React.useEffect(() => {
    if (!isDev) {
      startPlayback();
    } else {
      onAudioEnd?.();
    }

    return () => {
      clearTimeouts();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [startPlayback, onAudioEnd]);

  return <>{renderText}</>;
};

export default React.memo(StreamTextAudio);
