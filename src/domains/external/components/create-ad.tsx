"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const notes = [
  {
    title: "AI-Powered Ad Creation",
    description:
      "Effortless ad copy & visuals, perfectly tailored to your brand and audience.",
<<<<<<< HEAD
    img: "/feature-card1.spng",
=======
    img: "/feature-card1.svg",
    href: "/ad-generation",
>>>>>>> adc25c39a6883547276bbbc69103f8228bf34c04
  },
  {
    title: "Share Your Ad",
    description:
<<<<<<< HEAD
      " Post your ad, reach your audience, and get results instantly.",
    img: "/feature-card2.png",
=======
      "Post your ad, reach your audience, and get results instantly.",
    img: "/feature-card2.svg",
    href: "/share-ads",
>>>>>>> adc25c39a6883547276bbbc69103f8228bf34c04
  },
  {
    title: "Community Inspiration",
    description:
      "See how businesses are transforming ads with AI—get inspired by their success!",
<<<<<<< HEAD
    img: "/feature-card3.png",
=======
    img: "/feature-card3.svg",
    href: "/community",
>>>>>>> adc25c39a6883547276bbbc69103f8228bf34c04
  },
];

const CreateAd = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className=" flex flex-col justify-between gap-10 lg:gap-[80px] px-[40px] md:px-[60px] lg:px-[80px] py-10 md:py-20"
    >
      <motion.div
        className="flex flex-col text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <motion.p
          className="text-[#10509A] text-center text-sm md:text-base font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          KEY FEATURES
        </motion.p>
        <motion.h2
          className="text-[28px] md:text-[36px] lg:text-[48px] font-medium leading-tight max-w-[767px] m-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Effortless AI-Powered Ad Creation for Maximum Impact
        </motion.h2>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row font-${nunito.variable}  gap-11 bg-white w-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {notes.map((note, index) => (
          <Card
            key={index}
            className="rounded-[6px] flex flex-col gap-2 w-full flex-[1] border-none bg-[#FBFBFB] border border-[#ECECEC]"
          >
            <picture className="w-full h-fit cursor-pointer">
              <Link href={note.href}>
                <Image
                  src={note.img}
                  height={306}
                  width={373}
                  alt="card picture"
                  className="w-full h-auto"
                />
              </Link>
            </picture>
            <div className="p-4 pb-9">
              <CardHeader className="p-0">
                <CardTitle className="text-[#121316] p-0 text-[24px] font-bold leading-normal">
                  <h3>{note.title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription
                  className={`text-[#787878] p-0 text-[16px] font-normal leading-[24px]`}
                >
                  {note.description}
                </CardDescription>
              </CardContent>
            </div>
          </Card>
        ))}
      </motion.div>
    </section>
  );
};

export default CreateAd;
