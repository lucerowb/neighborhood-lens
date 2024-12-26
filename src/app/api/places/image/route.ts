import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { OpenAI } from "openai";
import { z } from "zod";

import env from "@/config/env.config";
import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";
import { apiHandler } from "@/helpers/api-handler";
import { CategoryEnum } from "@/schemas/activity-categorization-schema";

const client = new OpenAI({
  apiKey: env.openai.apiKey,
});

interface FreepikImageData {
  base64: string;
  has_nsfw: boolean;
}

interface FreepikMetadata {
  image: {
    size: string;
    width: number;
    height: number;
  };
  seed: number;
  guidance_scale: number;
  prompt: string;
  num_inference_steps: number;
}

interface FreepikResponse {
  data: FreepikImageData[];
  meta: FreepikMetadata;
}

interface FreepikRequestConfig {
  prompt: string;
  negative_prompt: string;
  guidance_scale: number;
  seed: number;
  num_images: number;
  image: {
    size: string;
  };
  styling: {
    style: string;
    color: string;
    lightning: string;
    framing: string;
  };
}

const querySchema = z.object({
  age_range: z.nativeEnum(AgeRangeEnum),
  gender: z.nativeEnum(GenderEnum),
  stage_of_life: z.nativeEnum(StageOfLifeEnum),
  place_category: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.nativeEnum(CategoryEnum)),
});

export const generateBackgroundFeatures = async (place: CategoryEnum): Promise<string> => {
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that specializes in generating detailed background features for various places to be used in illustrations.",
      },
      {
        role: "user",
        content: `Provide a concise list of background features typical for a ${CategoryEnum[place]}. Include key elements that distinctly represent this place without unrelated details. Start with "The background includes" and write in a sentence`,
      },
    ],
    temperature: 0.7,
    max_tokens: 150,
  });

  const backgroundFeatures = response.choices[0]?.message?.content?.trim();

  if (!backgroundFeatures) {
    throw new Error("Failed to generate background features.");
  }

  return backgroundFeatures;
};

export const GET = apiHandler(async (request: NextRequest) => {
  if (!env.freepik.apiKey) {
    throw new Error("Freepik API key not configured");
  }

  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const validatedParams = querySchema.parse(searchParams);

    const { age_range, gender, stage_of_life, place_category } = validatedParams;

    const backgroundFeatures = await generateBackgroundFeatures(place_category);

    const prompt = `A full-body illustration of a  ${age_range} ${gender} who is ${stage_of_life} with a cheerful smile, wearing a casual T-shirt, denim shorts, and sneakers, holding a balloon at an amusement park. ${backgroundFeatures}. The vibrant cartoon mascot style emphasizes bold outlines, smooth shading, and a lively morning atmosphere.`;

    const requestConfig: FreepikRequestConfig = {
      prompt: prompt,
      negative_prompt: "low quality, blurry, overly abstract",
      guidance_scale: 7,
      seed: Math.floor(Math.random() * 1000),
      num_images: 1,
      image: {
        size: "widescreen_16_9",
      },
      styling: {
        style: "anime",
        color: "vibrant",
        lightning: "cinematic",
        framing: "portrait",
      },
    };

    const response = await axios.post<FreepikResponse>("https://api.freepik.com/v1/ai/text-to-image", requestConfig, {
      headers: {
        "Content-Type": "application/json",
        "x-freepik-api-key": env.freepik.apiKey,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid query parameters", details: error.errors }, { status: 400 });
    }

    if (error instanceof AxiosError) {
      console.error("Freepik API Response:", error.response?.data);
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "API request failed";
      return Response.json({ error: message, details: error.response?.data }, { status });
    }

    console.error("Unexpected error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
});
