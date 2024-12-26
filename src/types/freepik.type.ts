type FreepikMetadata = {
  image: {
    size: string;
    width: number;
    height: number;
  };
  seed: number;
  guidance_scale: number;
  prompt: string;
  num_inference_steps: number;
};

type FreepikImageData = {
  base64: string;
  has_nsfw: boolean;
};

export type FreepikResponse = {
  data: FreepikImageData[];
  meta: FreepikMetadata;
};

export type FreepikRequestConfig = {
  prompt: string;
  negative_prompt: string;
  guidance_scale: number;
  seed: number;
  num_images: number;
  image: {
    size: string;
  };
  styling?: {
    style?: string;
    color?: string;
    lightning?: string;
    framing?: string;
  };
};
