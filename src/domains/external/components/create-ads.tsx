"use client";
import Image from "next/image";
import createadImg from "@/components/images/createadsImg.svg";
import circle from "@/components/icons/circle.svg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const notes = [
  {
    name: "AI-Powered Generation",
    description:
      "Create high-quality image ads instantly with AI—no design skills needed.",
  },
  {
    name: "Simple Campaign Input",
    description:
      "Enter product details, target audience, language, and ad goal to create your ad.",
  },
  {
    name: "Instant Ad Preview",
    description:
      "See your AI-generated ad in real-time before taking the next step.",
  },
];

const CreateAds = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="flex flex-col-reverse lg:flex-row justify-between gap-10 lg:gap-[80px] px-[40px] md:px-[60px] lg:px-[80px] py-10 md:py-28 bg-[#FCFCFC]"
    >
      <motion.div
        className="w-full h-auto lg:max-w-[596px] bg-[#E5EEFF] pt-[105px]"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.8 }}
        exit={{ opacity: 0, x: -50 }}
      >
        <Image
          src={createadImg}
          alt="createads"
          height={552}
          width={542}
          className="m-auto"
        />
      </motion.div>

      <motion.div
        className="flex flex-col text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <motion.p
          className="text-[#10509A] text-sm md:text-base font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          HOW TO USE
        </motion.p>
        <motion.p
          className="text-[28px] md:text-[36px] lg:text-[48px] font-medium leading-tight"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          How to Make Ads Using <br className="hidden md:block" /> genz.ad
        </motion.p>

        <motion.div
          className="mt-6 md:mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {notes.map((note, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 md:gap-[30px] mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
              whileHover={{ x: 5 }}
            >
              <motion.span
                className="text-rich-black flex justify-center items-center relative w-8 h-8 md:w-10 md:h-10"
                whileHover={{ rotate: 10 }}
              >
                <Image
                  src={circle}
                  alt="circle"
                  className="absolute w-full h-full"
                />
                <p className="relative text-sm md:text-base font-bold">
                  {index + 1}
                </p>
              </motion.span>
              <div className="flex flex-col items-start text-start">
                <p className="text-rich-black font-bold text-[18px] md:text-[22px] lg:text-[24px]">
                  {note.name}
                </p>
                <p className="text-gray-500 w-full lg:max-w-md font-medium text-[14px] md:text-[16px] lg:text-[18px] text-start md:text-left">
                  {note.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CreateAds;
