import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getPropertyDetail } from "@/api/properties.api";
import HomeValueInsideImage from "@/assets/img/more/home-value-inside.webp";
import ChatBubbleCard from "@/components/common/chat-bubble-card";
import StreamTextAudio from "@/components/StreamTextAudio";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { getCatImage } from "@/utils/cat.util";

import PredictionSlider from "./components/PredictionSlider";

const appreciationRate: Record<string, number> = {
  "7f9487edad7d0f3f1d1b0d6e65f5375e": 0.5,
  e5d14b3cd9cc92be11ae6aecc8e1843e: 8,
  dbc74ffe0223d31fa189df377ab7e58c: 6,
  "1095253908": 6,
  "39a05f577077f2f45fffbddfca4318c0": 6,
  d7b0b45b40ea8746b68dfdf982ed36fa: 0.5,
  "5faa65b3ae34c6615f5420f2522656e4": 5,
  "052543df0005553a8f25cc503adbd89f": 7,
  "7a96fe68738d9408d63582e962fbc062": 4,
  "15e0156eff5c593d423473b0d661918d": 6.5,
};

type HomeValuePredictionPageProps = {
  params: Promise<{
    propertyId: string;
  }>;
};

const HomeValuePredictionPage = async ({ params }: HomeValuePredictionPageProps) => {
  const propertyId = (await params).propertyId;
  const propertyDetails = await getPropertyDetail(propertyId);
  // const [value, setValue] = useState(50);

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-10 p-8">
      <Link
        href={`/${propertyId}/more`}
        className={buttonVariants({ variant: "secondary", size: "icon", className: "absolute top-2 left-2" })}
      >
        <ChevronLeft />
      </Link>
      <Typography className="font-dyna-puff" variant="h3">
        Home value prediction{" "}
      </Typography>
      <div className="flex w-full flex-col items-center gap-10">
        <Image src={HomeValueInsideImage.src} alt="home-value-inside" width={400} height={400} className="rounded-xl" />
        <div className="w-full max-w-xl">
          <PredictionSlider
            appreciationRate={appreciationRate[propertyId]}
            currentValue={propertyDetails.properties?.list_price}
          />
        </div>
      </div>

      <div className="relative mt-16 flex h-full w-full flex-col items-center">
        <Image src={getCatImage(7)} alt="cat-img" />
        <ChatBubbleCard hideAnchor className="absolute top-24 min-h-16 w-full max-w-sm text-center">
          <Typography>
            <StreamTextAudio text="As the neighborhood grows, the value of your house grows. That’s why its important to understand the future of the neighborhood" />
          </Typography>
        </ChatBubbleCard>
      </div>
    </main>
  );
};

export default HomeValuePredictionPage;
