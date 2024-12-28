"use client";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

function PredictionSlider({ appreciationRate, currentValue }: { appreciationRate: number; currentValue: number }) {
  const [value, setValue] = useState(0);

  const growth = useMemo(() => {
    // 10 years from now
    const predictions = [];

    for (let i = 0; i < 11; i++) {
      predictions.push(currentValue * ((1 + appreciationRate / 100) ^ i));
    }

    return predictions;
  }, [currentValue, appreciationRate]);

  return (
    <div className="relative">
      <div
        className={cn("absolute -top-12 flex flex-col items-center gap-1")}
        style={{
          left: `calc(${value * 9.8}% - 10px)`,
        }}
      >
        <Typography className="">{2024 + value}</Typography>
        <ChevronDown className="-m-2 size-4" />
      </div>
      <Slider
        defaultValue={[0]}
        value={[value]}
        step={1}
        min={0}
        max={10}
        onValueChange={([value]) => setValue(value)}
      />
      <div
        className="absolute -bottom-24 flex w-fit max-w-max flex-col items-center rounded-md bg-gradient-to-b from-[#E2EBF3] to-[#F8FAFC] p-3 shadow-xl transition-all"
        style={{
          left: `calc(${value * 9.8}% - 50px)`,
        }}
      >
        <Typography className="break-before-avoid text-base text-slate-500">Current Value</Typography>
        <Typography className="text-lg font-semibold text-slate-800">
          ${growth[value]?.toLocaleString("en-US")}
        </Typography>
      </div>
    </div>
  );
}

export default PredictionSlider;
