"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import Cat1 from "@/assets/img/cat/cat-1.png";
import Cat2 from "@/assets/img/cat/cat-2.png";
import Cat3 from "@/assets/img/cat/cat-3.png";
import Cat4 from "@/assets/img/cat/cat-4.png";
import Cat5 from "@/assets/img/cat/cat-5.png";
import Cat6 from "@/assets/img/cat/cat-6.png";
import Cat7 from "@/assets/img/cat/cat-7.png";
import { Button } from "@/components/ui/button";

import ChatBubbleCard from "./common/chat-bubble-card";
import { Typography } from "./ui/typography";

const getCatImage = (index: number) => {
  switch (index) {
    case 1:
      return Cat1;
    case 2:
      return Cat2;
    case 3:
      return Cat3;
    case 4:
      return Cat4;
    case 5:
      return Cat5;
    case 6:
      return Cat6;
    case 7:
      return Cat7;
    default:
      return Cat1;
  }
};

interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    value: string;
  }[];
  catImageNumber: number;
  replies: {
    [key: string]: {
      reply: string;
      catImageNumber: number;
    };
  };
}

interface Answer {
  questionId: string;
  value: string;
}

const questions: Question[] = [
  {
    id: "gender",
    text: "Before we get started, could you mention your gender?",
    options: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    catImageNumber: 1,
    replies: {
      male: { reply: "Meow! Nice to meet you, sir!", catImageNumber: 7 },
      female: { reply: "Purr! Lovely to meet you, madam!", catImageNumber: 7 },
    },
  },
  {
    id: "coffee_preference",
    text: "Do you prefer your coffee with milk or black?",
    options: [
      { text: "With Milk", value: "milk" },
      { text: "Black", value: "black" },
    ],
    catImageNumber: 2,
    replies: {
      milk: { reply: "Mrow! I love a good latte too!", catImageNumber: 7 },
      black: { reply: "Meow! You like it strong, just like me!", catImageNumber: 7 },
    },
  },
  {
    id: "atmosphere",
    text: "What kind of atmosphere do you prefer?",
    options: [
      { text: "Quiet & Cozy", value: "cozy" },
      { text: "Lively & Social", value: "social" },
    ],
    catImageNumber: 3,
    replies: {
      cozy: { reply: "Purr... I love a cozy nap spot too!", catImageNumber: 7 },
      social: { reply: "Meow! Let's mingle and have fun!", catImageNumber: 7 },
    },
  },
];

export default function CatChatWidget() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [catReply, setCatReply] = useState<Question["replies"][string] | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, { questionId: currentQuestion.id, value }];
    setAnswers(newAnswers);
    setCatReply(currentQuestion.replies[value]);

    setTimeout(() => {
      setCatReply(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        resetChat();
      }
    }, 3000); // Show reply for 3 seconds
  };

  const resetChat = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCatReply(null);
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-4"
          >
            <ChatBubbleCard>
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
                      key={currentQuestion.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography variant="pUiMedium">{currentQuestion.text}</Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {!catReply && (
                    <motion.div
                      key={currentQuestion.id}
                      className="grid grid-cols-2 gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      // exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {currentQuestion.options.map((option) => (
                        <Button key={option.value} variant="outline" onClick={() => handleAnswer(option.value)}>
                          {option.text}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ChatBubbleCard>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          id={catReply ? String(catReply?.catImageNumber) : String(currentQuestion.catImageNumber)}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10"
          onClick={() => (!isOpen ? setIsOpen(true) : resetChat())}
        >
          <Image
            src={getCatImage((catReply ? catReply?.catImageNumber : currentQuestion.catImageNumber) || 1)}
            alt="Cat"
            width={100}
            height={100}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
