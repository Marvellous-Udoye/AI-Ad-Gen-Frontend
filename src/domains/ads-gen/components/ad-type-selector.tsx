"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/ui/loader";

const AdSelectorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAdType, setSelectedAdType] = useState<string | null>(
    searchParams.get("type") || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleAdTypeSelect = (type: string) => {
    if (type === "image") {
      setSelectedAdType(type);
    }
  };

  const handleContinue = () => {
    if (selectedAdType) {
      setIsLoading(true);
      console.log(`Selected ad type: ${selectedAdType}`);

      setTimeout(() => {
        router.push(`/ad-form?type=${selectedAdType}`);
      }, 2000);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader fullscreen={false} />
      ) : (
        <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center p-6">
          <div className="w-full max-w-lg md:max-w-3xl bg-white border rounded-md p-6 md:p-14">
            <div className="mb-6">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer p-0"
              >
                <Image
                  src="/arrow-left.svg"
                  alt="Back"
                  className="w-5 h-5 mr-2"
                  width={10}
                  height={10}
                />
                <span>Back</span>
              </Link>
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Select Ad Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                className={`border p-6 rounded-lg cursor-pointer transition-all flex justify-between  ${
                  selectedAdType === "image"
                    ? "border-[#B800B8] bg-[#F3E8F3]"
                    : "border-gray-300 hover:border-[#B800B8]/50"
                }`}
                onClick={() => handleAdTypeSelect("image")}
              >
                <div className="flex flex-col items-start justify-center mb-4 ">
                  <Image
                    src="/image-icon.svg"
                    alt="image svg"
                    className="max-w-full max-h-full object-contain"
                    quality={100}
                    width={20}
                    height={20}
                  />
                  <div className="mt-4">
                    <h3 className="font-semibold text-base mb-1">Image Ad</h3>
                    <p className="text-sm text-gray-600 max-w-[250px]">
                      Static image ads for social media, websites, and print
                    </p>
                  </div>
                </div>

                <div
                  className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                    selectedAdType === "image"
                      ? "border-[#B800B8] bg-[#B800B8]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedAdType === "image" && (
                    <Image
                      src="/check.svg"
                      alt="image svg"
                      className="max-w-full max-h-full object-contain"
                      quality={100}
                      width={20}
                      height={20}
                    />
                  )}
                </div>
              </div>
              {/* 
        <div
          className={`border-1 w-[371px] p-6 rounded-lg cursor-pointer transition-all flex items-start justify-between ${
            selectedAdType === "image"
              ? "border-[#B800B8] bg-[#F3E8F3]"
              : "border-gray-300 hover:border-[#B800B8]/50"
          }`}
          onClick={() => handleAdTypeSelect("image")}
        >
          <div className="flex flex-col items-start justify-center mb-4 ">
            <Image
              src="/image-icon.svg"
              alt="image svg"
              className="max-w-full max-h-full object-contain"
              quality={100}
              width={20}
              height={20}
            />
            <div className="mt-4">
              <h3 className="font-semibold text-base mb-1">Image Ad</h3>
              <p className="text-sm text-gray-600 max-w-[250px]">
                Static image ads for social media, websites, and print
              </p>
            </div>
          </div>

          <div
            className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
              selectedAdType === "image"
                ? "border-[#B800B8] bg-[#B800B8]"
                : "border-gray-300"
            }`}
          >
            {selectedAdType === "image" && (
              <Image
                src="/check.svg"
                alt="image svg"
                className="max-w-full max-h-full object-contain"
                quality={100}
                width={20}
                height={20}
              />
            )}
          </div>
        </div> */}

              <div className="border p-6 rounded-lg flex flex-col border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed">
                <Image
                  src="/video.svg"
                  alt="Video svg"
                  width={30}
                  height={30}
                />
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-base">Video Ad</h3>
                  <span className="text-xs bg-gray-300 text-gray-600 px-2 py-1 rounded-md ml-auto">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Animated ads with motion and sound.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className={`px-6 py-3 rounded-md transition-colors cursor-pointer ${
                  selectedAdType
                    ? "bg-[#B800B8] text-white hover:bg-[#960096]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!selectedAdType}
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdSelectorPage;
