import TourMap from "../components/tour-map";

export default async function Explore() {
  // Simulate loading time
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="size-full">
      <TourMap />
    </div>
  );
}
