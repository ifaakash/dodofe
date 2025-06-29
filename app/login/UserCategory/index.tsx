"use client";
import { Footer, UserInput } from "@components/atoms";
import { useState } from "react";
import cx from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./userCategory.module.css";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { completeProfile } from "api";
import { loadState } from "@utils/localStorage";
import NewButton from "@components/atoms/Button/NewButton";

const categories = [
  { name: "tech", code: "#ffffff", emoji: "💻" },
  { name: "entertainment", code: "#d83248", emoji: "🎥" },
  { name: "food", code: "#d83248", emoji: "🍔" },
  { name: "finance", code: "#d83248", emoji: "💰" },
  { name: "comedy", code: "#d83248", emoji: "🤣" },
  { name: "beauty", code: "#d83248", emoji: "💄" },
  { name: "travel", code: "#d83248", emoji: "🌍" },
  { name: "sports", code: "#d83248", emoji: "🏃‍♂️" },
  { name: "gaming", code: "#d83248", emoji: "🎮" },
  { name: "diy", code: "#d83248", emoji: "🔨" },
  { name: "vlogger", code: "#d83248", emoji: "📸" },
  { name: "gym & fitness", code: "#d83248", emoji: "🏋️‍♂️" },
  { name: "educator", code: "#d83248", emoji: "🎓" },
  { name: "dancer", code: "#d83248", emoji: "💃" },
  { name: "singer", code: "#d83248", emoji: "🎤" },
  { name: "doctor", code: "#d83248", emoji: "🩺" },
  { name: "motivational", code: "#d83248", emoji: "💪" },
  { name: "real estate", code: "#d83248", emoji: "🏠" },
  { name: "home design", code: "#d83248", emoji: "🏠" },
  { name: "Other", code: "#d83248", emoji: "👀" },
];

export const UserCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string[]>([]); // Changed from string to array
  const router = useRouter();
  const searchParams = useSearchParams()
  const mediakitRef = searchParams.get('mediakitRef')

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCategorySelection = (selectedCategory: string) => {
    setCategory((prevCategories) => {
      if (prevCategories.includes(selectedCategory)) {
        // If already selected, remove it (uncheck)
        return prevCategories.filter((cat) => cat !== selectedCategory);
      } else {
        // If not selected, add it
        return [...prevCategories, selectedCategory];
      }
    });
  };

  const gotoHome = () => {
    const mobileNumber = loadState(STORAGE_CONSTANTS.MOBILE);
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';

    completeProfile({ userId, name, mobileNumber, interests: category, socialLinks: [] })
      .then(() => {
        if (mediakitRef) {
          router.push(ROUTE_CONSTANTS.MEDIA_KIT + '?mediakitRef=' + mediakitRef)
        } else {
          router.push(ROUTE_CONSTANTS.HOME, { scroll: false });
        }
      })
      .catch(() => {
        console.log('error');
      });
  };


  return (
    <div className="mx-4 mt-16">
      <span className="text-xl clr-heading-text mb-2">Enter</span>
      <br />
      <span className="text-3xl font-black clr-heading-text">Your Name</span>

      {/* <UserInput
          name="fullName"
          className="w-full"
          value={name}
          hasLabel
          placeholder="Enter your first name"
          onChange={handleName}
          errorMsg={"Please enter a valid name"}
          type="text"
          maxLength={16}
        /> */}
      <div className="bg-white pt-6 pb-4 px-4 rounded-xl mb-6">
        <input type="text" className="w-full border-b border-[#C7C6CB] pb-1 focus:outline-none font-semibold text-lg" value={name} onChange={handleName} placeholder="Enter your first name" />
      </div>

      <span className="text-xl clr-heading-text mb-2">Choose</span>
      <br />
      <span className="text-3xl font-black clr-heading-text mb-2">Categories</span>

      <div className="my-4 flex flex-wrap w-full pb-16">
        {categories.map((data) => (
          <div
            key={data.name}
            style={{ background: category.includes(data.name) ? "#d1e7ff" : "var(--white)" }}
            className={cx(
              "rounded-lg mb-2 mr-2 px-3 h-10 flex justify-start items-center cursor-pointer transition",
              {
                "border border-blue-500": category.includes(data.name),
              }
            )}
            onClick={() => handleCategorySelection(data.name)}
          >
            <span className="mr-2">{data.emoji}</span>
            {data.name}
            <input
              value={data.name}
              checked={category.includes(data.name)}
              className="ml-2"
              type="checkbox"
              onChange={() => handleCategorySelection(data.name)}
            />
          </div>
        ))}
      </div>

      <div className={cx(
        "bottom-0 py-4 fixed justify-center w-[90%]"
      )}
      // style={isEmpty(receiverDetails) ? { width: '80%' } : { width: '90%' }
      // }
      >
        <NewButton
          size="large"
          variant={name.length > 0 ? "primary" : "disabled"}
          className="w-full"
          onClick={gotoHome}
        >
          Next
        </NewButton>
      </div>

      {/* <Footer variant="default" primaryActionText="Continue" primaryAction={gotoHome} /> */}
    </div>
  );
};
