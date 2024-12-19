import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "./skeleton";

const defClassName = "font-sans text-text-primary";

const typographyVariants = cva(defClassName, {
  variants: {
    variant: {
      heroTitle: "text-5xl font-extrabold leading-[3.5rem] tracking-[-0.075rem]",
      displayText:
        "text-4xl font-bold leading-10 tracking-[-0.036rem] lg:text-[2.5rem] lg:font-bold lg:leading-[3rem] lg:tracking-[-0.05rem]",
      h1: "text-3xl font-bold not-italic leading-9 tracking-[-0.01406rem] md:text-4xl md:font-bold md:leading-10 md:tracking-[-0.036rem]",
      h2: "text-2xl font-bold not-italic leading-8 tracking-[-0.009rem] md:text-3xl md:font-bold md:leading-9 md:tracking-[-0.01406rem]",
      h3: "text-xl font-semibold not-italic leading-7 tracking-[-0.00625rem] md:text-2xl md:leading-8 md:tracking-[-0.009rem]",
      h4: "text-lg font-semibold not-italic leading-7 tracking-[-0.00345rem] md:text-xl md:leading-7 md:tracking-[-0.00625rem]",
      h5: "text-base font-semibold not-italic leading-6 md:text-lg md:leading-7 md:tracking-[-0.00345rem]",
      header: "text-xl font-medium not-italic leading-7 md:text-2xl md:leading-8",
      subheadingRegular: "text-lg font-normal not-italic leading-7 md:text-xl",
      subheadingMedium: "text-lg font-medium not-italic leading-7 md:text-xl",
      titleRegular: "text-base font-normal not-italic leading-6 md:text-lg md:leading-7",
      titleMedium: "text-base font-medium not-italic leading-6 md:text-lg md:leading-7",
      p: "text-base font-normal not-italic leading-6",
      pMedium: "text-base font-medium not-italic leading-6",
      pSemibold: "text-base font-semibold not-italic leading-6",
      pBold: "text-base font-bold not-italic leading-6",
      pUi: "text-base font-normal not-italic leading-6",
      pUiMedium: "text-base font-medium not-italic leading-6",
      blockquote: "text-base font-normal italic leading-6",
      list: "text-base font-normal not-italic leading-6",
      inlineCode: "flex items-start gap-2.5 px-1 py-[0.1875rem]",
      lead: "text-xl font-normal not-italic leading-7",
      large: "text-lg font-semibold not-italic leading-7",
      small: "text-sm font-medium not-italic leading-[0.875rem]",
      subtle: "text-sm font-normal not-italic leading-5",
      subtleMedium: "text-sm font-medium not-italic leading-5",
      subtleSemibold: "text-sm font-semibold not-italic leading-5",
      subtleUnderline: "text-sm font-normal not-italic leading-5 underline",
      body: "text-sm font-normal not-italic leading-6",
      bodyMedium: "text-sm font-medium not-italic leading-6",
      bodySemibold: "text-sm font-semibold not-italic leading-6",
      detail: "text-xs font-normal not-italic leading-5",
      detailMedium: "text-xs font-medium not-italic leading-5",
      detailSemibold: "text-xs font-semibold leading-5",
      detailUnderline: "text-xs font-normal not-italic leading-5 underline",
      tableHead: "text-base font-bold not-italic leading-6",
      tableItem: "text-base font-normal not-italic leading-6",
      subheading: "text-xl font-medium not-italic text-slate-700",
      disclaimer: "text-xs font-normal uppercase leading-5 text-black/70",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type TypographyElement = HTMLHeadingElement | HTMLParagraphElement;

export interface TypographyProps
  extends React.HTMLAttributes<TypographyElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const getComponent = (variant: VariantProps<typeof typographyVariants>["variant"]) => {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    default:
      return "p";
  }
};
const getSkeletonSize = (variant: VariantProps<typeof typographyVariants>["variant"]) => {
  switch (variant) {
    case "h1":
      return "h-10";
    case "h2":
      return "h-9";
    case "h3":
      return "h-8";
    case "h4":
      return "h-7";
    case "h5":
      return "h-6";
    default:
      return "h-4";
  }
};

const Typography = React.forwardRef<TypographyElement, TypographyProps>(
  ({ className, variant, asChild = false, loading = false, ...props }, ref) => {
    if (loading) return <Skeleton className={cn("my-0.5 w-full", getSkeletonSize(variant), className)} />;
    const Comp = asChild ? Slot : getComponent(variant);
    return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
