"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import HomeValueInsideImage from "@/assets/img/more/home-value-inside.webp";
import ChatBubbleCard from "@/components/common/chat-bubble-card";
import { buttonVariants } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Typography } from "@/components/ui/typography";
import { getCatImage } from "@/utils/cat.util";

const HomeValuePredictionPage = () => {
  const [value, setValue] = useState(50);
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-10 p-8">
      <Link
        href={`/more`}
        className={buttonVariants({ variant: "secondary", size: "icon", className: "absolute top-2 left-2" })}
      >
        <ChevronLeft />
      </Link>
      <Typography className="font-dyna-puff" variant="h3">
        Home value prediction{" "}
      </Typography>
      <div className="flex w-full flex-col items-center gap-10">
        <Image src={HomeValueInsideImage.src} alt="home-value-inside" width={500} height={500} className="rounded-xl" />
        <div className="w-full max-w-xl">
          <Slider defaultValue={[50]} value={[value]} onValueChange={([value]) => setValue(value)} />
        </div>
      </div>

      <div className="relative flex h-full w-full flex-col items-center">
        <Image src={getCatImage(7)} alt="cat-img" />
        <ChatBubbleCard hideAnchor className="absolute top-24 w-full max-w-sm text-center">
          <Typography>
            As the neighborhood grows, the value of your house grows. That’s why its important to understand the future
            of the neighborhood
          </Typography>
        </ChatBubbleCard>
      </div>
    </main>
  );
};

export default HomeValuePredictionPage;
