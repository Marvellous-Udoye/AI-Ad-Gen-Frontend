"use client";
import type React from "react";
import { Nunito } from "next/font/google";
import clsx from "clsx";
import FeatureCard from "./key-features-card";
// import { AiAnalytics } from "@/components/icons/icon";
import { GeneratedVisual } from "@/components/icons/icon";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const tagData = [
  {
    icon: <GeneratedVisual className="size-[14px] sm:size-[16px]" />,
    text: "CREATE ADS YOURSELF EASILY",
    textColor: "text-[#10509A]",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const videoLink = "https://www.youtube.com/embed/szWGvpaQkVk"; 

  return (
    <section
      ref={sectionRef}
      className={clsx(
        "px-[20px] md:px-[30px] lg:[60px] bg-white flex flex-col items-center gap-10 py-10 lg:py-24",
        nunito.variable
      )}
    >
      <motion.div
        className="w-full lg:max-w-7xl relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center justify-center gap-3 max-w-4xl mx-auto"
          initial={{ y: 50 }}
          animate={isInView ? { y: 0 } : { y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatedTags isInView={isInView} />
          <motion.h1
            className="text-[#121316] text-2xl lg:text-[40px] max-w-[504px] text-center font-medium p-[24px]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Who can benefit from genz.ad
          </motion.h1>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <FeatureCard />
      </motion.div>
      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
          <iframe
            src={videoLink}
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimatedTags = ({ isInView }: any) => {
  return (
    <div className="flex gap-4">
      {tagData.map((tag, index) => (
        <motion.div
          key={index}
          className={`flex items-center gap-[6px] md:gap-4 text-sm md:text-base ${tag.textColor}`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
          }
          transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={isInView ? { rotate: 0 } : { rotate: -10 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
          >
            {tag.icon}
          </motion.div>
          <motion.span
            className="text-[14px] md:text-[18px] text-nowrap font-normal leading-[34.26px]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
          >
            {tag.text}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};
