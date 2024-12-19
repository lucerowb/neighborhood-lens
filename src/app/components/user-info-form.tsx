"use client";
import { SubmitHandler } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Typography, typographyVariants } from "@/components/ui/typography";
import { AgeRangeEnum, GenderEnum, StageOfLifeEnum } from "@/enums/app.enum";
import { useAppContext } from "@/hooks/useApp";
import { cn } from "@/lib/utils";
import { UserInfoFormType } from "@/schemas/user-info.schema";

type UserInfoFormProps = {
  className?: string;
};

const UserInfoForm = ({ className }: UserInfoFormProps) => {
  const { userInfoForm } = useAppContext();

  const selectedGender = userInfoForm.watch("gender");

  const onSubmit: SubmitHandler<UserInfoFormType> = (data) => {
    console.log(data);
  };

  return (
    <Form {...userInfoForm}>
      <form
        onSubmit={userInfoForm.handleSubmit(onSubmit)}
        className={cn("flex flex-col justify-between gap-8 p-4", className)}
      >
        <div className="flex flex-col gap-2">
          <Typography variant="h3">Let&apos;s Make this Tour Yours!</Typography>
          <Typography>To show you the purr-fect spots in the neighborhood, I need to know a bit about you</Typography>
        </div>

        <div className="flex flex-col gap-[45px]">
          <FormField
            name="ageRange"
            control={userInfoForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={typographyVariants({
                    variant: "h4",
                  })}
                >
                  What age range do you fall under?
                </FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 gap-2"
                >
                  {Object.values(AgeRangeEnum)?.map((ageRange) => (
                    <FormItem key={ageRange}>
                      <FormControl>
                        <RadioGroupItem id={`age-${ageRange}`} className="peer sr-only" value={ageRange} />
                      </FormControl>
                      <FormLabel
                        htmlFor={`age-${ageRange}`}
                        className={buttonVariants({
                          variant: ageRange === field.value ? "default" : "outline",
                          className: "w-full",
                        })}
                      >
                        {ageRange}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <FormField
              name="gender"
              control={userInfoForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={typographyVariants({
                      variant: "h4",
                    })}
                  >
                    What&apos;s your gender?
                  </FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-2"
                  >
                    {Object.values(GenderEnum)?.map((gender) => (
                      <FormItem key={gender}>
                        <FormControl>
                          <RadioGroupItem id={`gender-${gender}`} className="peer sr-only" value={gender} />
                        </FormControl>
                        <FormLabel
                          htmlFor={`gender-${gender}`}
                          className={buttonVariants({
                            variant: gender === field.value ? "default" : "outline",
                            className: "w-full",
                          })}
                        >
                          {gender}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
            {selectedGender === GenderEnum.OTHER && (
              <FormField
                name="genderSpecify"
                control={userInfoForm.control}
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="Specify your gender" className="w-full" {...field} />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            name="stageOfLife"
            control={userInfoForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={typographyVariants({
                    variant: "h4",
                  })}
                >
                  What&apos;s your current stage of life?
                </FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 gap-2"
                >
                  {Object.values(StageOfLifeEnum)?.map((stageOfLife) => (
                    <FormItem key={stageOfLife}>
                      <FormControl>
                        <RadioGroupItem
                          id={`stage-of-life-${stageOfLife}`}
                          className="peer sr-only"
                          value={stageOfLife}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={`stage-of-life-${stageOfLife}`}
                        className={buttonVariants({
                          variant: stageOfLife === field.value ? "default" : "outline",
                          className: "w-full",
                        })}
                      >
                        {stageOfLife}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Let&apos;s Get Started</Button>
      </form>
    </Form>
  );
};

export default UserInfoForm;
