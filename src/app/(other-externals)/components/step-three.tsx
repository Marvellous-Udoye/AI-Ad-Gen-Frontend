import React from "react";
import Image from "next/image";

const TryItNow: React.FC = () => {
  return (
    <section
      className="
        relative
        py-16
        bg-[#FFF4FF]
        overflow-hidden
      "
    >
      
      <div
        className="
          absolute
          text-[10rem]
          font-light
          text-pink-100
          top-20
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          pointer-events-none
          select-none
          hidden
          lg:block
        "
        aria-hidden="true"
      >
        3
      </div>

      <div
        className="
          container
          mx-auto
          px-4
          grid
          grid-cols-1
          md:grid-cols-2
          items-center
          gap-8
          relative
        "
      >
        
        <div className="pl-8">
          <h3 className="text-2xl font-bold mb-4">Click &ldquo;Try it Now&rdquo;</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 leading-relaxed">
            <li>Test how genz.ad works instantly</li>
            <li>No payment is required - just explore and create</li>
          </ul>
        </div>

        
        <div className="flex items-end justify-end overflow-hidden">
          <Image
            src="/hiw3.svg"
            alt="Step 1 illustration"
            width={1200}  
            height={800}   
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default TryItNow;
