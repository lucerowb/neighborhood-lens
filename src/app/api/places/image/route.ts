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

const generateBackgroundFeaturesAndCharacterAppearance = async (
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
Age Group: ${ageGroup}
Gender: ${gender}
Location: ${CategoryEnum[place]}
Time: ${timeslot}

Format:
[placeholder: gender, e.g., "woman"] sitting at a table with [placeholder: people and scenario]. The scene is set in a cozy [placeholder: type of space, e.g., "café" or "home kitchen"] with [placeholder: amenities, e.g., "modern furniture, potted plants, and soft curtains"]. The characters are enjoying [placeholder: food/drink items, e.g., "breakfast parfaits and coffee"].
The [placeholder: time of day, e.g., "morning, day, evening, or night"] lighting creates a [placeholder: atmosphere, e.g., "golden, sunny glow" for morning or "soft, ambient light" for evening], highlighting the [placeholder: details, e.g., "expressions, clothing textures, and the glassware on the table"]. The background features a [placeholder: specific detail, e.g., "large window letting in natural light" or "cityscape view"].
The characters' expressions reflect [placeholder: emotions, e.g., "happiness and warmth"], and the overall composition emphasizes [placeholder: themes, e.g., "family bonding, relaxation, or simple joys of life"].`,
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
      negative_prompt:
        "Avoid overly exaggerated or distorted anatomy (e.g., unnatural proportions, elongated limbs, or deformed facial features). Exclude flat or overly simplistic shading, harsh or unrealistic lighting, and overly saturated or clashing color palettes. Omit any cluttered or chaotic background elements that distract from the main subjects.\n" +
        "Exclude the inclusion of unnecessary or out-of-context props, such as modern gadgets (e.g., phones or laptops) if not specified, or overly detailed, hyperrealistic textures that break the stylized aesthetic. Avoid low-quality rendering, blurry edges, pixelation, or inconsistent brushwork.\n" +
        "Do not include expressions or poses that feel stiff, unnatural, or exaggerated beyond realism. Exclude styles outside of the intended warm, inviting, slightly stylized look (e.g., hyperrealism, abstract, or cartoonish over-simplification). Avoid dull or overly muted color schemes, poor lighting balance (e.g., shadows too harsh or no dynamic lighting), and disjointed composition.\n" +
        "Focus on maintaining smooth, soft gradients, balanced colors, and well-defined, cohesive characters in harmony with the background.",
      guidance_scale: 2,
      seed: Math.floor(Math.random() * 1000),
      num_images: 1,
      image: {
        size: "widescreen_16_9",
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
