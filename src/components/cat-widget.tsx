"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import useCatMessages, { Message, Option } from "@/hooks/useCatMessages";
import { cn } from "@/lib/utils";
import { PropertyFeatures } from "@/types/properties.type";
import { getCatImage } from "@/utils/cat.util";

import ChatBubbleCard from "./common/chat-bubble-card";
import { Typography } from "./ui/typography";

type CatChatWidgetProps = {
  propertyFeatures: PropertyFeatures;
  className?: string;
};

export default function CatChatWidget({ propertyFeatures, className }: CatChatWidgetProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [catReply, setCatReply] = useState<NonNullable<Message["replies"]>[string] | null>(null);
  const { messages } = useCatMessages(propertyFeatures);

  const currentMessage = messages[currentMessageIndex];

  const { catImageNumber, text, id, content, options, replies, catClassName, anchorPosition } = currentMessage;

  const handleAnswer = (option: Option) => {
    const { action, text } = option;
    action?.();
    setCatReply(replies ? replies[text] : null);

    setTimeout(() => {
      setCatReply(null);
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex(currentMessageIndex + 1);
      } else {
        resetChat();
      }
    }, 2000);
  };

  const resetChat = () => {
    setCurrentMessageIndex(0);
    setCatReply(null);
  };

  return (
    <div className={cn("fixed bottom-4 right-4 flex flex-col items-end", className, catClassName)}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mb-4"
        >
          <ChatBubbleCard anchorPosition={anchorPosition}>
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {catReply ? (
                  <motion.div
                    key="cat-reply"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="pUiMedium">{catReply?.reply}</Typography>
                  </motion.div>
                ) : (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="pUiMedium">{text}</Typography>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {!catReply && (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {options ? (
                      <div className="grid grid-cols-2 gap-2">
                        {options?.map(({ text, action }) => (
                          <Button key={text} variant="outline" onClick={() => handleAnswer({ text, action })}>
                            {text}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {content}
                        <Button
                          onClick={() => {
                            if (currentMessageIndex < messages.length - 1) {
                              setCurrentMessageIndex(currentMessageIndex + 1);
                            } else {
                              resetChat();
                            }
                          }}
                        >
                          Continue
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ChatBubbleCard>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          id={catReply ? String(catReply?.catImageNumber) : String(catImageNumber)}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          <Image
            src={getCatImage((catReply ? catReply?.catImageNumber : catImageNumber) || 1)}
            alt="Cat"
            width={100}
            height={100}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
