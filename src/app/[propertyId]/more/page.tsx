import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import FutureOfTheNeighborhood from "@/assets/img/more/future-of-the-neighborhood.webp";
import HomeValuePrediction from "@/assets/img/more/home-value-prediction.webp";
import ChatBubbleCard from "@/components/common/chat-bubble-card";
import StreamTextAudio from "@/components/StreamTextAudio";
import { Button, buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { getCatImage } from "@/utils/cat.util";

const morePagesData = [
  {
    title: "Future of the neighborhood",
    img: FutureOfTheNeighborhood.src,
    slug: "future-of-the-neighborhood",
  },
  {
    title: "Home value prediction",
    img: HomeValuePrediction.src,
    slug: "home-value-prediction",
  },
];

type MorePageProps = {
  params: Promise<{
    propertyId: string;
  }>;
};

const MorePage = async ({ params }: MorePageProps) => {
  const propertyId = (await params).propertyId;
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-10 p-8">
      <Link
        href={`/`}
        className={buttonVariants({ variant: "secondary", size: "icon", className: "absolute top-2 left-2" })}
      >
        <ChevronLeft />
      </Link>
      <Typography className="font-dyna-puff" variant="h3">
        There&apos;s more
      </Typography>
      <div className="flex w-full flex-1 flex-col items-center justify-between gap-10">
        <div className="flex w-full flex-col gap-10">
          <div className="relative flex h-full w-full flex-col items-center">
            <Image src={getCatImage(7)} alt="cat-img" />
            <ChatBubbleCard hideAnchor className="absolute top-24 min-h-16 w-full max-w-sm text-center">
              <Typography>
                <StreamTextAudio text="Our neighborhood is growing. Some notable developments you might like." />
              </Typography>
            </ChatBubbleCard>
          </div>
          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-center">
            {morePagesData?.map((item, index) => (
              <div key={index} className="relative flex h-56 w-full max-w-sm flex-col items-center gap-4 rounded-xl">
                <Image src={item.img} alt={item.title} fill className="rounded-xl object-cover" />
                <Link
                  href={`/${propertyId}/more/${item.slug}`}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "icon",
                    className: "absolute top-2 z-10 right-2",
                  })}
                >
                  <ChevronRight />
                </Link>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent from-50% to-black/50" />
                <Typography
                  variant="pUi"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 text-nowrap font-bold text-white"
                >
                  {item.title}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <Link href={`/${propertyId}`}>
          <Button variant="default" size="xl">
            Complete Visualization
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default MorePage;
