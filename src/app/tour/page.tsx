import CatChatWidget from "@/components/cat-widget";

import TourMap from "../components/tour-map";

export default async function Explore() {
  // Simulate loading time
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <main className="relative size-full">
      <TourMap />
      <CatChatWidget />
    </main>
  );
}
