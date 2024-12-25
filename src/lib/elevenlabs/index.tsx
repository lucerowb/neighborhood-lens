"use client";
import { ElevenLabsClient, play } from "elevenlabs";

import env from "@/config/env.config";

const client = new ElevenLabsClient({
  apiKey: env.elevenLabs.apiKey,
});

// TODO: maybe implement with timing to sync with the text
// FIXME: doesn't work currently need pro tier, unusual activity detected on free tier
export const textToSpeech = async (text: string) => {
  try {
    const audio = await client.generate({
      voice: "Rachel",
      model_id: "eleven_turbo_v2_5",
      text,
    });

    await play(audio);
  } catch {
    console.error("Error while converting text to speech");
  }
};
