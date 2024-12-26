"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import useCatMessages, { Message, Option } from "@/hooks/useCatMessages";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { cn } from "@/lib/utils";
import { PropertyFeatures } from "@/types/properties.type";
import { getCatImage } from "@/utils/cat.util";

import ChatBubbleCard from "./common/chat-bubble-card";
import StreamTextAudio from "./StreamTextAudio";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";

type CatChatWidgetProps = {
  propertyFeatures: PropertyFeatures;
  className?: string;
};

export default function CatChatWidget({ propertyFeatures, className }: CatChatWidgetProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isCatSpeaking, setIsCatSpeaking] = useState(true);
  const [catReply, setCatReply] = useState<NonNullable<Message["replies"]>[string] | null>(null);
  const { messages } = useCatMessages(propertyFeatures);

  const currentMessage = messages[currentMessageIndex];

  const {
    catImageNumber,
    text,
    id,
    content,
    options,
    replies,
    catClassName,
    anchorPosition,
    tapToContinue,
    continueButtonText,
    continueButtonVariant,
  } = currentMessage;

  const incrementCurrentMessageIndex = () => {
    if (currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
  };

  const handleAnswer = (option: Option) => {
    const { action, value } = option;
    setCatReply(replies && value ? replies[value] : null);
    action?.();
  };

  const handleAudioEnd = useCallback(() => {
    setIsCatSpeaking(false);
  }, []);

  const handleAudioStart = useCallback(() => {
    setIsCatSpeaking(true);
  }, []);

  // const resetChat = () => {
  //   setCurrentMessageIndex(0);
  //   setCatReply(null);
  // };

  return (
    <>
      <div className={cn("absolute bottom-4 right-4 flex flex-col items-end", className, catClassName)}>
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
                      <Typography variant="pUiMedium">
                        <StreamTextAudio
                          text={catReply?.reply}
                          onAudioEnd={() => {
                            setCatReply(null);
                            incrementCurrentMessageIndex();
                            handleAudioEnd();
                          }}
                          onAudioStart={handleAudioStart}
                        />
                      </Typography>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography variant="pUiMedium">
                        <StreamTextAudio text={text} onAudioEnd={handleAudioEnd} onAudioStart={handleAudioStart} />
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {!isCatSpeaking && !catReply && (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {options ? (
                        <div className="grid grid-cols-2 gap-2">
                          {options?.map((option) => (
                            <motion.div
                              className="w-full"
                              key={option.text}
                              initial="hidden"
                              animate="visible"
                              variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: (index) => ({
                                  opacity: 1,
                                  y: 0,
                                  transition: {
                                    delay: index * 0.2,
                                    duration: 0.5,
                                  },
                                }),
                              }}
                            >
                              <Button className="w-full" variant="outline" onClick={() => handleAnswer(option)}>
                                {option.text}
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {content}
                          {!tapToContinue && (
                            <Button
                              variant={continueButtonVariant}
                              className="w-full"
                              onClick={incrementCurrentMessageIndex}
                            >
                              {continueButtonText || "Continue"}
                            </Button>
                          )}
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
      {tapToContinue && (
        <TapToContinue onClick={incrementCurrentMessageIndex} continueButtonText={continueButtonText} />
      )}
    </>
  );
}

const TapToContinue = ({ onClick, continueButtonText }: { onClick: () => void; continueButtonText?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => onClick());
  return (
    <div
      ref={ref}
      className="absolute -bottom-20 -right-16 flex size-60 items-center justify-center rounded-full p-4 text-white md:-bottom-32 md:-right-32 md:size-96"
      style={{
        background: "radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 69%)",
      }}
      onClick={onClick}
    >
      {continueButtonText || "Tap to continue"}
    </div>
  );
};
