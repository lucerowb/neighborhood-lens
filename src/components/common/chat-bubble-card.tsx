import { cva } from "class-variance-authority";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Card } from "../ui/card";

type AnchorHorizontalPosition = "left" | "right" | "center";
type AnchorVerticalPosition = "top" | "bottom" | "center";
type AnchorPositionWithCenter =
  | `${AnchorVerticalPosition}-${AnchorHorizontalPosition}`
  | `${AnchorHorizontalPosition}-${AnchorVerticalPosition}`;
type AnchorPosition = Exclude<
  AnchorPositionWithCenter,
  "center-center" | "center-left" | "center-right" | "center-top" | "center-bottom"
>;

const anchorClass = cva<{
  position: Record<AnchorPosition, string>;
  color: Record<AnchorPosition, string>;
  border: Record<AnchorPosition, string>;
}>(
  "absolute z-10 h-4 w-4 rotate-45", // Default anchor shape
  {
    variants: {
      position: {
        "bottom-right": "-bottom-2 right-10",
        "bottom-left": "-bottom-2 left-10",
        "bottom-center": "-bottom-2 left-1/2 -translate-x-1/2",
        "top-right": "-top-2 right-10",
        "top-left": "-top-2 left-10",
        "top-center": "-top-2 left-1/2 -translate-x-1/2",
        "left-top": "-left-2 top-3",
        "left-bottom": "-left-2 bottom-3",
        "left-center": "-left-2 top-1/2 -translate-y-1/2",
        "right-top": "-right-2 top-3",
        "right-bottom": "-right-2 bottom-3",
        "right-center": "-right-2 top-1/2 -translate-y-1/2",
      },
      color: {
        "bottom-right": "bg-[#F8FAFC]",
        "bottom-left": "bg-[#F8FAFC]",
        "bottom-center": "bg-[#F8FAFC]",
        "top-right": "bg-[#E2EBF3]",
        "top-center": "bg-[#E2EBF3]",
        "top-left": "bg-[#E2EBF3]",
        "left-top": "bg-[#ECF1F7]",
        "left-center": "bg-[#F0F5F9]",
        "left-bottom": "bg-[#F8FAFC]",
        "right-top": "bg-[#ECF1F7]",
        "right-center": "bg-[#F0F5F9]",
        "right-bottom": "bg-[#F8FAFC]",
      },
      border: {
        "bottom-right": "border-b border-r",
        "bottom-left": "border-b border-r",
        "bottom-center": "border-b border-r",
        "top-right": "border-l border-t",
        "top-left": "border-l border-t",
        "top-center": "border-l border-t",
        "left-top": "border-b border-l",
        "left-bottom": "border-b border-l",
        "left-center": "border-b border-l",
        "right-top": "border-r border-t",
        "right-bottom": "border-r border-t",
        "right-center": "border-r border-t",
      },
    },
    defaultVariants: {
      position: "bottom-right",
      color: "bottom-right",
      border: "bottom-right",
    },
  }
);

// Create the Anchor component
const Anchor = ({ anchorPosition }: { anchorPosition: AnchorPosition }) => {
  return (
    <div
      className={cn(
        anchorClass({
          position: anchorPosition,
          color: anchorPosition, // Determine color based on vertical position
          border: anchorPosition, // Set border style based on position
        })
      )}
    />
  );
};

// Define the ChatBubbleCardProps
type ChatBubbleCardProps = {
  children: ReactNode;
  className?: string;
  hideAnchor?: boolean;
  anchorPosition?: AnchorPosition;
};

const ChatBubbleCard = ({
  className,
  children,
  hideAnchor = false,
  anchorPosition = "bottom-right",
}: ChatBubbleCardProps) => {
  return (
    <Card
      className={cn(
        "relative max-w-[500px] shadow-xl rounded-xl bg-gradient-to-b from-[#E2EBF3] to-[#F8FAFC] p-3 transition-all",
        className
      )}
    >
      {!hideAnchor && <Anchor anchorPosition={anchorPosition} />}
      {children}
    </Card>
  );
};

export default ChatBubbleCard;
