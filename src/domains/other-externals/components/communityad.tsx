"use client";
import Image from "next/image";
import createadImg from "@/components/images/createadsImg.svg";
import circle from "@/components/icons/circle.svg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const notes = [
  {
    name: "Publish to Community",
    description:
      "Publish your generated ad to Genz.ad community by simply clicking save and publish.",
  },
  {
    name: "Explore Community",
    description:
      "Dive into the Genz.ad community to discover, engage with, and be inspired by ads created by others.",
  },
];

const CreateAds = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="flex flex-col w-full lg:flex-row justify-between gap-10 lg:gap-[80px] md:px-[30px]  py-10 lg:py-28 bg-[#FCFCFC]"
    >
      <motion.div
        className="w-full h-auto lg:max-w-[596px] mx-auto items-center justify-center flex bg-[#E5EEFF] xl:p-12 xl:py-12 px-8 py-25"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, x: -50 }}
      >
        <Image src="/customize.svg" alt="customize" height={552} width={542} />
      </motion.div>

      <motion.div
        className="flex flex-col text-left px-[10px]"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <motion.p
          className="text-[#10509A] text-sm md:text-base font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          HOW IT WORKS
        </motion.p>
        <motion.h2
          className="text-[28px] md:text-[36px] lg:text-[48px] font-medium leading-tight text-nowrap"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          How to use Genz.ad <br /> community
        </motion.h2>

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
              transition={{ duration: 0.3, delay: 0.4 + index * 0.2 }}
              whileHover={{ x: 5 }}
            >
              <motion.h3
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
              </motion.h3>
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
