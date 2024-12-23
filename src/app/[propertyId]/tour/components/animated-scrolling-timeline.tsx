const AnimatedScrollingTimeline = () => {
  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden p-8">
      <div className="relative min-h-[400px]">
        {/* Fixed boxes */}
        <div className="absolute inset-0">
          <div
            className="absolute left-1/4 top-20 h-16 w-16 animate-spin rounded-lg bg-gray-200 "
            style={{
              animationDuration: "5000ms",
            }}
          />
          <div
            className="absolute right-5 top-20 h-16 w-16 animate-spin rounded-lg bg-gray-200"
            style={{
              animationDuration: "5500ms",
            }}
          />
          <div
            className="absolute bottom-28 left-[6%] h-16 w-16 animate-spin rounded-lg bg-gray-200"
            style={{
              animationDuration: "6000ms",
            }}
          />
          <div
            className="absolute bottom-28 right-[20%] h-16 w-16 animate-spin rounded-lg bg-gray-200"
            style={{
              animationDuration: "7000ms",
            }}
          />
        </div>

        {/* Timeline line with ticks */}
        <div className="absolute left-0 right-0 top-1/2 w-full -translate-y-1/2">
          <div className="h-px w-[1000vw] animate-scroll bg-primary" />
          <div className="absolute inset-0 flex w-[80vw] animate-scroll gap-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="relative">
                <div className="absolute top-1 h-4 w-px bg-primary" />
                <div className="absolute right-2 top-1 flex gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-2 w-px bg-gray-300" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling years */}
        <div className="absolute bottom-16 left-0 right-0 overflow-hidden">
          <div className="flex animate-scroll">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-[200px] flex-none text-center text-2xl font-light text-gray-400">
                {2024 + i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedScrollingTimeline;
