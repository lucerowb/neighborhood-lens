"use client";
import Image from "next/image";
import { PropsWithChildren, useMemo } from "react";

import CloudImage1 from "@/assets/img/cloud/cloud-1.webp";
import CloudImage2 from "@/assets/img/cloud/cloud-2.webp";
import CloudImage3 from "@/assets/img/cloud/cloud-3.webp";

const cloudImages = [CloudImage1, CloudImage2, CloudImage3];

// Predefined edge positions to ensure clouds are exactly where we want them
const edgePositions = [
  // Top edge
  { left: "15%", top: "-5%" },
  { left: "85%", top: "2%" },
  // Bottom edge
  { left: "20%", top: "85%" },
  { left: "75%", top: "80%" },
  // Left edge
  { left: "-5%", top: "30%" },
  { left: "5%", top: "60%" },
  // Right edge
  { left: "85%", top: "25%" },
  { left: "90%", top: "70%" },
];

const TourTemplate = ({ children }: PropsWithChildren) => {
  const clouds = useMemo(() => {
    return edgePositions.map((position, index) => ({
      id: index + 1,
      src: cloudImages[index % 3],
      left: position.left,
      top: position.top,
      scale: 0.7 + Math.random() * 0.6, // More consistent scaling
      delay: Math.random() * 6,
      zIndex: Math.floor(Math.random() * 10),
    }));
  }, []);
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f5f0e6]">
      <div className="pointer-events-none fixed inset-0">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="absolute animate-float"
            style={{
              left: cloud.left,
              top: cloud.top,
              transform: `scale(${cloud.scale})`,
              animationDelay: `${cloud.delay}s`,
              zIndex: cloud.zIndex,
            }}
          >
            <Image src={cloud.src} alt={`Cloud ${cloud.id}`} width={300} height={400} className="opacity-90" />
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default TourTemplate;
