import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { z } from "zod";

import env from "@/config/env.config";
import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";
import { apiHandler } from "@/helpers/api-handler";
import { CategoryEnum } from "@/schemas/activity-categorization-schema";

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

export const GET = apiHandler(async (request: NextRequest) => {
  if (!env.freepik.apiKey) {
    throw new Error("Freepik API key not configured");
  }

  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const validatedParams = querySchema.parse(searchParams);

    const { age_range, gender, stage_of_life, place_category } = validatedParams;

    const requestConfig: FreepikRequestConfig = {
      prompt: `A ${age_range.toLowerCase()} ${gender.toLowerCase()} enjoying a ${stage_of_life.toLowerCase()} experience at a ${CategoryEnum[place_category].toLowerCase()}`,
      negative_prompt: "low quality, blurry, overly abstract",
      guidance_scale: 7,
      seed: Math.floor(Math.random() * 1000),
      num_images: 1,
      image: {
        size: "square_1_1",
      },
      styling: {
        style: "surreal",
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
