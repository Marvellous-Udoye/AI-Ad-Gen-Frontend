"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps {
  fallbackUrl?: string;
  className?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  fallbackUrl = "/",
  className = "",
  label = "Back",
}) => {
  const router = useRouter();

  const handleBack = () => {
    try {
      // Set a flag in sessionStorage to indicate we're navigating back
      sessionStorage.setItem("navigatingBack", "true");
      router.back();
    } catch {
      // If back navigation fails, go to fallback URL
      router.push(fallbackUrl);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer p-0"
        type="button"
      >
<<<<<<< HEAD
        <ArrowLeft className="text-[#650065]" />
        <span className="text-[#650065] font-medium text-base leading-6">
=======
        <ArrowLeft size={20} color="#650065" />
        <span className="text-[#650065] font-medium text-base leading-6 ml-2">
>>>>>>> b308a78e130cfe7891e7e41f1ff9e60edd758749
          {label}
        </span>
      </button>
    </div>
  );
};

export default BackButton;
