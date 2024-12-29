"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import Cloud1 from "@/assets/img/cloud/cloud-1.webp";
import Cloud2 from "@/assets/img/cloud/cloud-2.webp";
import Cloud3 from "@/assets/img/cloud/cloud-3.webp";
import ReplayImage from "@/assets/img/more/replay.png";
import LogoSm from "@/components/icons/logo-sm";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function Replay() {
  const { propertyId } = useParams<{ propertyId: string }>();

  return (
    <div className="flex h-screen flex-col items-center justify-between pb-10">
      <div className="flex -translate-y-20 [&>*]:-m-20">
        <Image src={Cloud1} alt="cloud" />
        <Image src={Cloud2} alt="cloud" />
        <Image src={Cloud3} alt="cloud" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <LogoSm />

        <Typography className="font-dyna-puff font-bold">Replay a different scenario</Typography>
        <Typography variant="p" className="text-center">
          Go back in time and visualize a different scenario or view the map manually.
        </Typography>

        <Image src={ReplayImage} alt="replay" height={100} className="object-cover" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <Link href={`/${propertyId}/tour`} className={buttonVariants({ variant: "default", className: "w-60" })}>
          <Typography>Explore map</Typography>
        </Link>
        <Link href="/">
          <Typography variant="bodyMedium">Go back home</Typography>
        </Link>
      </div>
    </div>
  );
}
