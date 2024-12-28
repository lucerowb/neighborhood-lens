"use client";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

import useCatMessages, { Message, Option } from "@/hooks/useCatMessages";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { cn } from "@/lib/utils";
import { useTourStore } from "@/stores/useTourStore";
import { PropertyFeatures } from "@/types/properties.type";

import ChatBubbleCard from "./common/chat-bubble-card";
import StreamTextAudio from "./StreamTextAudio";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";

type CatChatWidgetProps = {
  propertyFeatures: PropertyFeatures;
  className?: string;
};

export default function CatChatWidget({ propertyFeatures, className }: CatChatWidgetProps) {
  const [isCatSpeaking, setIsCatSpeaking] = useState(true);
  const [catReply, setCatReply] = useState<NonNullable<Message["replies"]>[string] | null>(null);
  const { messages } = useCatMessages(propertyFeatures);
  const [loadingOption, setLoadingOption] = useState<string | null>(null);
  const { rive, RiveComponent } = useRive({
    src: "/cat-animation.riv",
    stateMachines: "State Machine 3",
    autoplay: true,
  });
  const silentStepMachine = useStateMachineInput(rive, "State Machine 3", "Silent", true);

  const { currentMessageIndex, setCurrentMessageIndex } = useTourStore((state) => state);

  const currentMessage = messages[currentMessageIndex];

  const {
    catImageNumber,
    text,
    id,
    content,
    options,
    replies,
    catClassName,
    catCharacterClassName,
    anchorPosition,
    tapToContinue,
    continueButtonText,
    continueButtonVariant,
  } = currentMessage;

  const incrementCurrentMessageIndex = () => {
    let nextIndex = currentMessageIndex + 1;

    while (nextIndex < messages.length && messages[nextIndex].skip) {
      nextIndex++;
    }

    if (nextIndex < messages.length) {
      setCurrentMessageIndex(nextIndex);
    }
  };

  const handleAnswer = async (option: Option) => {
    const loadingKey = option.value || option.text; // Fallback to text if value is absent
    setLoadingOption(loadingKey); // Mark this option as loading
    try {
      const { action, value } = option;
      if (replies && value && replies[value]) {
        await action?.();
        setCatReply(replies[value]);
      } else {
        await action?.();
        incrementCurrentMessageIndex();
      }
    } finally {
      setLoadingOption(null); // Reset loading state after completion
    }
  };

  const handleAudioEnd = useCallback(() => {
    setIsCatSpeaking(false);
    if (silentStepMachine) {
      silentStepMachine.value = true;
      silentStepMachine.fire();
    }
  }, [silentStepMachine]);

  const handleAudioStart = useCallback(() => {
    setIsCatSpeaking(true);

    if (silentStepMachine) {
      silentStepMachine.value = false;
      silentStepMachine.fire();
    }
  }, [silentStepMachine]);

  return (
    <>
      <div className={cn("absolute bottom-2 right-2 flex flex-col items-end m-2 ", className, catClassName)}>
        {silentStepMachine && (
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
                            {options?.map((option) => {
                              const loadingKey = option.value || option.text;
                              return (
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
                                  <Button
                                    key={loadingKey}
                                    loading={loadingOption === loadingKey}
                                    className="w-full text-wrap"
                                    variant="outline"
                                    disabled={!!loadingOption}
                                    onClick={() => handleAnswer(option)}
                                  >
                                    {option.text}
                                  </Button>
                                </motion.div>
                              );
                            })}
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
        )}
        <AnimatePresence mode="wait">
          <motion.div
            id={catReply ? String(catReply?.catImageNumber) : String(catImageNumber)}
            className="relative z-10"
          >
            <RiveComponent className={cn("-my-12 h-[300px] w-[300px] -mr-20", catCharacterClassName)} />
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
