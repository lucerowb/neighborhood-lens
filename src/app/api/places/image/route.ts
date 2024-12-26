import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { OpenAI } from "openai";
import { z } from "zod";

import env from "@/config/env.config";
import { AgeRangeEnum, GenderEnum, TimeSlots } from "@/enums/app.enum";
import { apiHandler } from "@/helpers/api-handler";
import { CategoryEnum } from "@/schemas/activity-categorization-schema";
import { FreepikRequestConfig, FreepikResponse } from "@/types/freepik.type";

const client = new OpenAI({
  apiKey: env.openai.apiKey,
});

const querySchema = z.object({
  age_range: z.nativeEnum(AgeRangeEnum),
  gender: z.nativeEnum(GenderEnum),
  place_category: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.nativeEnum(CategoryEnum)),
  time_slot: z.nativeEnum(TimeSlots),
});

export const generateBackgroundFeaturesAndCharacterAppearance = async (
  place: CategoryEnum,
  ageGroup: AgeRangeEnum,
  gender: GenderEnum,
  timeslot: TimeSlots
): Promise<string> => {
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You generate concise scene descriptions for full-body illustrations, focusing on expression, basic outfit, and key background elements.",
      },
      {
        role: "user",
        content: `Create a full-body illustration description with:
Age: ${ageGroup}
Gender: ${gender}
Location: ${CategoryEnum[place]}
Time: ${timeslot}

Format:
"A full-body illustration of a [age]-year-old [gender] with [expression], wearing [simple outfit], [action] at/in [location]. The background includes [three key setting elements separated by commas]. The vibrant cartoon mascot style emphasizes [atmosphere/mood]."`,
      },
    ],
    temperature: 0.7,
    max_tokens: 150,
  });

  const prompt = response.choices[0]?.message?.content?.trim();

  if (!prompt) {
    throw new Error("Failed to generate background features.");
  }

  return prompt;
};

export const GET = apiHandler(async (request: NextRequest) => {
  if (!env.freepik.apiKey) {
    throw new Error("Freepik API key not configured");
  }

  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const validatedParams = querySchema.parse(searchParams);

    const { age_range, gender, place_category, time_slot } = validatedParams;

    const prompt = await generateBackgroundFeaturesAndCharacterAppearance(place_category, age_range, gender, time_slot);

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
        color: "pastel",
        lightning: "warm",
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
