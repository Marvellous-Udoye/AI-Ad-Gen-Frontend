"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import React, { Suspense } from "react";
import { useSubmitCampaign } from "@/domains/ads-gen/api/use-submit-campaign";
import { useCampaignImage } from "@/domains/ads-gen/api/use-campaign-image";
import { useParams } from "next/navigation";
import { DesktopAdPreviewNavigation } from "@/domains/external/components/desktop-ad-preview-navigation";
import { MobileGenerateButton } from "@/domains/external/components/mobile-generate-button";
import SinglePreview from "@/domains/ads-gen/components/single-image-preview";
import { ImageAdFormData } from "@/domains/ads-gen/types";

export default function Page() {
  const { imageId } = useParams();
  const mutation = useSubmitCampaign();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const {
    data: imageData,
    isLoading,
    error,
  } = useCampaignImage(imageId as string);

  const handleGenerateNewAd = (data: ImageAdFormData) => {
    setIsGenerating(true);
    try {
      localStorage.getItem("imageAdData");

      const formatPayload = (formData: ImageAdFormData) => ({
        product_name: formData.productName,
        ad_goal: formData.adGoal,
        ad_size: formData.adSize,
        target_region: formData.region,
        demographic: formData.demographics,
        target_age_groups: formData.ageGroup,
        ad_language: formData.language,
      });

      const payload = formatPayload(data);

      mutation.mutate(payload, {
        onSuccess: (response) => {
          console.log("Response:", response);
          setIsGenerating(false);
        },
        onError: (error) => {
          console.error("Error generating new ad:", error);
          setIsGenerating(false);
        },
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      }
    >
      <section className="flex flex-col items-center justify-center gap-8 w-full max-w-[879px] mx-auto rounded-[20px] pt-10 pb-[103px] px-6">
        <Card className="w-full max-w-[890px] border-none shadow-none py-0">
          <CardContent className="py-6 px-4 md:px-8">
            <DesktopAdPreviewNavigation
              className="my-10"
              onGenerateNewAd={handleGenerateNewAd}
              isLoading={isGenerating}
            />

            <CardHeader className="mb-6 md:mb-8 text-left md:text-center px-0">
              <CardTitle className="text-[28px] leading-[36px] text-[#121316] font-semibold">
                Let&apos;s set up your Image Ad
              </CardTitle>
              <p className="text-[#667185] text-[18px] font-normal mt-1">
                Fill in the details below, then AI generates your ad instantly.
              </p>
            </CardHeader>

            <div className="mb-6 md:mb-8">
              <div className="flex justify-around items-center max-md:mr-4">
                <div className="text-center">
                  <p className="text-xs font-semibold leading-4 text-[#121316]">
                    STEP 1
                  </p>
                  <p className="text-sm mt-[3px] font-bold leading-5 text-[#121316]">
                    Set Ad goals
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold leading-4 text-[#121316]">
                    STEP 2
                  </p>
                  <p className="text-sm mt-[3px] font-bold leading-5 text-[#121316]">
                    Preview
                  </p>
                </div>
              </div>

              <div className="relative w-full h-2.5 bg-white-200 rounded-full mt-6">
                <div className="absolute left-0 h-2 bg-[#1467C5] rounded-full w-[47%] md:w-[49%]"></div>

                <div className="absolute right-0 h-2 bg-[#1467c5] rounded-full w-[47%] md:w-[49%]"></div>
              </div>
            </div>

            {isLoading || isGenerating ? (
              <div className="flex items-center justify-center p-10">
                <Loader fullscreen={false} />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">
                Error loading image: {(error as Error).message}
              </div>
            ) : (
              <SinglePreview imageData={imageData} isLoading={isGenerating} />
            )}
            <MobileGenerateButton onGenerateNewAd={handleGenerateNewAd} />
          </CardContent>
        </Card>
      </section>
    </Suspense>
  );
}
