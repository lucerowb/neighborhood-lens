import { Redis } from "@upstash/redis";
import { ElevenLabsClient } from "elevenlabs";

import env from "@/config/env.config";
import { apiHandler } from "@/helpers/api-handler";
import { parseJSONIfPossible } from "@/utils/json.util";

const redis = new Redis({
  url: "https://light-woodcock-24856.upstash.io",
  token: "AWEYAAIjcDFkYWEyOWFkZjdlZTQ0NTgyOWE4NTEyMWQ3NTBjNGY5YnAxMA",
});

const client = new ElevenLabsClient({
  apiKey: env.elevenLabs.apiKey,
});

export const POST = apiHandler(async (req: Request) => {
  const body: { text?: string } = await req.json();
  if (!body.text) {
    return new Response("Please send text to process ttl.", { status: 400 });
  }
  const text = body.text;

  const key = `tts:${text}`;

  const value = (await redis.get(key)) as string;

  if (value) {
    return Response.json(parseJSONIfPossible(value));
  }

  const response = await client.textToSpeech.convertWithTimestamps("pbufn2IIcaA9SVLS6d0k", {
    output_format: "mp3_44100_128",
    text: text,
    model_id: "eleven_multilingual_v2",
  });

  await redis.set(key, JSON.stringify(response));

  return Response.json(response);
});
