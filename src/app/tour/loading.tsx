import { Typography } from "@/components/ui/typography";

import AnimatedScrollingTimeline from "./components/animated-scrolling-timeline";

const TourLoadingPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex min-h-screen flex-col gap-8 p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <Typography variant="h3">Your life simulated</Typography>
          <Typography>
            Let’s dive in to your “soon to be?” neighborhood and see what your life will be like!{" "}
          </Typography>
        </div>
        <AnimatedScrollingTimeline />
        <div className="">cat goes here</div>
      </div>
    </main>
  );
};

export default TourLoadingPage;
