import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAdsContext } from "../context/AdsContext";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

const DashboardContent = () => {
  const [filter, setFilter] = useState<"user" | "community">("user");
  const [sortOption, setSortOption] = useState("Most Popular");

  const [publishedImages, setPublishedImages] = useState<Ad[]>([]);
  const [userImages, setUserImages] = useState<Ad[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { adData, setAdData } = useAdsContext();
  const router = useRouter();

  const [publishedImages, setPublishedImages] = useState([]);
  const [isPublishedLoading, setIsPublishedLoading] = useState(true);

  const [userImages, setUserImages] = useState<Ad[]>([]);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const [isLoaded, setIsLoaded] = useState(false);

  // interface Ad {
  //   image_url: string;
  //   prompt: string;
  // }

  interface Ad {
    id: string;
    prompt: string;
    target_audience: string;
    ad_description: string;
    is_published: boolean;
    image_url: string;
    final_url: string;
    created_at: string;
    updated_at: string;
    author_info: {
      name: string;
      avatar: string;
    };
  }
  interface Ads {
    user: Ad[];
    community: Ad[];
  }
  const ads: Ads = {
    // user: [
    //   {
    //     // type: "image",
    //     image_url: "/images/my-ad-1.png",
    //     prompt: "Soft Drinks Ad",
    //     // authorInfo: "5 days ago",
    //   },
    //   {
    //     // type: "image",
    //     image_url: "/images/my-ad-2.png",
    //     prompt: "Soft Drinks Ad",
    //     // authorInfo: "1 week ago",
    //   },
    //   {
    //     // type: "image",
    //     image_url: "/images/my-ad-3.png",
    //     prompt: "Soft Drinks Ad",
    //     // authorInfo: "2 weeks ago",
    //   },
    //   {
    //     // type: "video",
    //     image_url: "/images/hng-wig-1.png",
    //     prompt: "Soft Drinks Ad",
    //     // authorInfo: "3 days ago",
    //   },
    //   {
    //     // type: "image",
    //     image_url: "/images/hng-wig-2.png",
    //     prompt: "Soft Drinks Ad",
    //     // authorInfo: "2 days ago",
    //   },
    //   {
    //     // type: "image",
    //     image_url: "/images/hng-wig-3.png",
    //     prompt: "Soft Drinks Ad",
    //     // authorInfo: "1 day ago",
    //   },
    // ],
    // {
    // type: "image",
    //   image_url: "/images/hng-wig-1.png",
    //   title: "HNG Wigs Ad",
    //   authorInfo: {
    //     name: "FaithJames",
    //     avatar: "/images/avatar-1.png",
    //   },

    user: userImages,
    community: publishedImages,

    // [
    //   {
    //     // type: "image",
    //     image_url: "/images/hng-wig-1.png",
    //     title: "HNG Wigs Ad",
    //     authorInfo: {
    //       name: "FaithJames",
    //       avatar: "/images/avatar-1.png",
    //     },
    //   },
    //   {
    //     // type: "image",
    //     image_url: "/images/hng-wig-2.png",
    //     title: "HNG Wigs Ad",
    //     authorInfo: {
    //       name: "FaithJames",
    //       avatar: "/images/avatar-2.png",
    //     },
    //   },
    //   {
    //     type: "video",
    //     image_url: "/images/hng-wig-3.png",
    //     title: "HNG Wigs Ad",
    //     authorInfo: {
    //       name: "FaithJames",
    //       avatar: "/images/avatar-3.png",
    //     },
    //   },
    //   {
    //     // type: "image",
    //     image_url: "/images/my-ad-1.png",
    //     title: "HNG Wigs Ad",
    //     authorInfo: {
    //       name: "FaithJames",
    //       avatar: "/images/avatar-4.png",
    //     },
    //   },
    //   {
    //     // type: "image",
    //     image_url: "/images/my-ad-2.png",
    //     title: "HNG Wigs Ad",
    //     authorInfo: {
    //       name: "FaithJames",
    //       avatar: "/images/avatar-5.png",
    //     },
    //   },
    //   {
    //     // type: "image",
    //     image_url: "/images/my-ad-3.png",
    //     title: "HNG Wigs Ad",
    //     authorInfo: {
    //       name: "FaithJames",
    //       avatar: "/images/avatar-1.png",
    //     },
    //   },
    // ],
  };

  interface Ad {
    ad_description: string;
    author_info: { name: string; avatar: string };
    created_at: string;
    final_url: string;
    id: string;
    image_url: string;
    is_published: boolean;
    prompt: string;
    target_audience: string;
    updated_at: string;
  }

  useEffect(
    () =>
      setAdData({
        user: userImages,
        community: publishedImages,
      }),
    [userImages, publishedImages]
  );

  const getRequest = async (endpoint: string) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      console.error("No access token found. User might not be authenticated.");
      throw new Error("Unauthorized: No token found.");
    }

    // Check if token is expired
    if (isTokenExpired(token)) {
      console.warn("Access token expired. Consider refreshing the token.");
      throw new Error("Unauthorized: Token expired.");
    }

    try {
      const response = await fetch(
        `https://staging.api.genz.ad/api/v1${endpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData.data.images);

      if (!response.ok) {
        if (response.status === 401) {
          console.error(
            "Unauthorized request. Token might be invalid or expired."
          );
        }
        throw new Error(responseData.message || "Something went wrong");
      }

      return responseData;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  };

  // Function to check token expiration
  const isTokenExpired = (token: string) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      return Date.now() > decoded.exp * 1000; // Compare current time with expiry
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true; // Assume expired if decoding fails
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const token = useAuthStore.getState().token;
      console.log("Token in useEffect:", token); // Check if token is present
      if (!token) {
        console.warn("No token found, skipping API request.");
        return;
      }

      try {
        const [publishedResponse, userResponse] = await Promise.all([
          getRequest("/image/all/published"),
          getRequest("/image/"),
        ]);

        if (publishedResponse?.status === "success") {
          setPublishedImages(publishedResponse.data.images);
        }

        if (userResponse?.status === "success") {
          setUserImages(userResponse.data.images);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchImages();
  }, []);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      boxShadow: "0 2px 2px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <>
      {adData?.user.length == 0 && adData?.community.length == 0 ? (
        <div className="flex flex-col items-center gap-4 my-32">
          <Image
            src="/get-started.png"
            width={401}
            height={333}
            alt="Let's get started."
          />
        </div>
      ) : (
        <section
          className={`bg-white rounded-[20px] px-4 py-6 md:p-6 flex flex-col gap-10 mt-10 transition-all duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-between flex-col sm:flex-row gap-4">
            <div className="flex gap-3 md:gap-5">
              {(["user", "community"] as const).map((category) => (
                <motion.button
                  key={category}
                  className={`rounded-[8px] p-2 text-[14px] font-semibold cursor-pointer ${
                    filter === category
                      ? "text-[#7D7D7D] bg-[#ECECEC] border border-[#ECECEC]"
                      : "text-[#7D7D7D]"
                  }`}
                  onClick={() => setFilter(category as keyof Ads)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {category === "user" ? "Recent Ads" : "Community"}
                </motion.button>
              ))}
            </div>
            {filter === "community" && (
              <motion.div
                className="flex gap-2.5 items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[#121316] text-[14px] font-semibold">
                  Sort by:{" "}
                </p>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[140px] cursor-pointer">
                    <SelectValue placeholder="Most Popular" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Most Popular">Most Popular</SelectItem>
                      <SelectItem value="Most Recent">Most Recent</SelectItem>
                      <SelectItem value="Most Viewed">Date Created</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            animate="show"
            key={filter}
          >
            
            {(ads[filter] || []).map((ad, i) => (
              <motion.div
                key={ad.id}
                className="border-[#ECECEC] border bg-[#FCFCFC] rounded-[8px] overflow-hidden"
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="relative group h-[294px] overflow-hidden">
                  <div className="absolute inset-0 bg-slate-100"></div>
                  <Image
                    src={ad.image_url}
                    fill={true}
                    alt="ad"
                    priority={i < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ height: "100%" }}
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#00000066] transition-opacity duration-300 group-hover:opacity-40"></div>
                  <span className="absolute top-4 left-4 bg-white rounded-[40px] px-3 py-1 text-sm font-medium z-10">
                    {/* {ad.type === "image" ? "Image ad" : "Video ad"} */}
                    image
                  </span>
                </div>
                <motion.div
                  key={i}
                  className="border-[#ECECEC] border bg-[#FCFCFC] rounded-[8px] overflow-hidden"
                  variants={itemVariants}
                  whileHover="hover"
                  onClick={() =>
                    router.push(`/dashboard/details?type=${filter}&id=${i}`)
                  }
                >
                  <div className="relative group h-[294px] overflow-hidden">
                    <Image
                      src={ad.image_url}
                      fill
                      alt="ad"
                      priority={i < 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ height: "100%" }}
                    />
                  </div>
                  <motion.div className="flex flex-col gap-[10px] mt-2.5 ml-4 mb-3">
                    <span className="font-semibold">{"Title"}</span>
                    {filter === "community" && (
                      <div className="flex gap-2.5 items-center">
                        <div className="w-5 h-5 rounded-full overflow-hidden relative">
                          <div className="bg-[#2C2C2C] size-6 rounded-3xl text-[#F5F5F5] font-semibold text-center">
                            {ad.author_info.name[0].toUpperCase()}
                          </div>
                        </div>
                        <span className="text-[#7D7D7D]">
                          {ad.author_info.name}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </section>
      )}
    </>
  );
};

export default DashboardContent;
