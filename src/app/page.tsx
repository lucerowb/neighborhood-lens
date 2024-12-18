import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col justify-center gap-8 rounded-xl bg-gray-300 p-6">
        <Typography variant="h1">Welcome to Neighborhood lens</Typography>
        <Button>Explore</Button>
      </div>
    </main>
  );
}
