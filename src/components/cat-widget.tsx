"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import Cat1 from "@/assets/img/cat/cat-1.png";
import Cat7 from "@/assets/img/cat/cat-7.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Typography } from "./ui/typography";

export default function CatChatWidget() {
  const [isAnswered, setIsAnswered] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      <AnimatePresence>
        {!isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-4"
          >
            <Card className="relative max-w-[300px] rounded-xl bg-gradient-to-b from-[#E2EBF3] to-[#F8FAFC] p-4">
              <div className="absolute bottom-0 right-[40px] translate-y-[100%] transform">
                <div className="h-4 w-4 -translate-y-2 rotate-45 transform border-b border-r bg-background" />
              </div>
              <div className="space-y-4">
                <Typography variant="pUiMedium">Before we get started, could you mention your gender?</Typography>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => setIsAnswered(true)}>
                    Male
                  </Button>
                  <Button variant="outline" onClick={() => setIsAnswered(true)}>
                    Female
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
        onClick={() => setIsAnswered(false)}
      >
        <Image src={isAnswered ? Cat7 : Cat1} alt="Cat" width={100} height={100} />
      </motion.div>
    </div>
  );
}
