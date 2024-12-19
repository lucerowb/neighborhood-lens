import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";

export const userInfoFormSchema = z.object({
  ageRange: z.nativeEnum(AgeRangeEnum),
  gender: z.nativeEnum(GenderEnum),
  genderSpecify: z.string().optional(),
  stageOfLife: z.nativeEnum(StageOfLifeEnum),
});

export type UserInfoFormType = z.infer<typeof userInfoFormSchema>;
export const userInfoFormValidator = zodResolver(userInfoFormSchema);
