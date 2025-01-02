"use client";

import Link from "next/link";

import LogoSm from "@/components/icons/logo-sm";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useTourStore } from "@/stores/useTourStore";

import Timeline from "./timeline";

type ReplayProps = {
  propertyId: string;
};

export default function Replay({ propertyId }: ReplayProps) {
  const isTourCompleted = useTourStore((state) => state.isTourCompleted);

  if (!isTourCompleted) return null;

  return (
    <div className="absolute left-0 top-0 z-20 size-full bg-gradient-to-b from-[#FEF9E0] to-white">
      <div className="flex h-full flex-col items-center justify-between gap-4 p-10">
        <LogoSm />

        <div className="flex flex-col items-center gap-4">
          <Typography className="font-dyna-puff font-bold">Replay a different scenario</Typography>
          <Typography variant="p" className="text-center">
            Go back in time and visualize a different scenario or view the map manually.
          </Typography>

          <Timeline isReplay />
        </div>

        <Link href={`/${propertyId}/more`} className={buttonVariants({ size: "lg", className: "mt-2" })}>
          Continue
        </Link>
      </div>
    </div>
  );
}
