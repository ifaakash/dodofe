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
import { CATEGORIES } from "@utils/index";
import { toast } from "react-hot-toast";

const MAX_CATEGORIES = 3;

export const UserCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [otherCategory, setOtherCategory] = useState("");
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
        if (selectedCategory === 'Other') {
          setOtherCategory(''); // Clear other category input when unchecked
        }
        return prevCategories.filter((cat) => cat !== selectedCategory);
      } else {
        // If not selected, check if we can add more
        if (prevCategories.length >= MAX_CATEGORIES) {
          toast.error(`You can only select up to ${MAX_CATEGORIES} categories`);
          return prevCategories;
        }
        return [...prevCategories, selectedCategory];
      }
    });
  };

  const gotoHome = () => {
    const mobileNumber = loadState(STORAGE_CONSTANTS.MOBILE);
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';

    // Replace 'Other' with the custom category if provided
    const finalCategories = category.map(cat =>
      cat === 'Other' && otherCategory ? otherCategory : cat
    );

    completeProfile({ userId, name, mobileNumber, interests: finalCategories, socialLinks: [] })
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

      <div className="bg-white pt-6 pb-4 px-4 rounded-xl mb-6">
        <input type="text" className="w-full border-b border-[#C7C6CB] pb-1 focus:outline-none font-semibold text-lg" value={name} onChange={handleName} placeholder="Enter your first name" />
      </div>

      <span className="text-xl clr-heading-text mb-2">Choose</span>
      <br />
      <span className="text-3xl font-black clr-heading-text mb-2">Categories</span>
      <div className="text-sm text-gray-500 mt-1 mb-4">Select up to {MAX_CATEGORIES} categories</div>

      <div className="my-4 flex flex-wrap w-full pb-16">
        {CATEGORIES.map((data) => {
          const isSelected = category.includes(data.name);
          const isDisabled = !isSelected && category.length >= MAX_CATEGORIES;

          return (
            <div key={data.name}>
              <div
                style={{
                  background: isSelected ? "#d1e7ff" : "var(--white)",
                  opacity: isDisabled ? 0.5 : 1,
                  cursor: isDisabled ? 'not-allowed' : 'pointer'
                }}
                className={cx(
                  "rounded-lg mb-2 mr-2 px-3 h-10 flex justify-start items-center transition",
                  {
                    "border border-blue-500": isSelected,
                  }
                )}
                onClick={() => !isDisabled && handleCategorySelection(data.name)}
              >
                <span className="mr-2">{data.emoji}</span>
                {data.name}
                <input
                  value={data.name}
                  checked={isSelected}
                  className="ml-2"
                  type="checkbox"
                  onChange={() => !isDisabled && handleCategorySelection(data.name)}
                  disabled={isDisabled}
                />
              </div>
              {/* Show input field when Other is selected */}
              {isSelected && data.name === 'Other' && (
                <div className="w-full bg-white pt-2 pb-4 px-4 rounded-xl mb-4">
                  <div className="text-lg font-semibold bg-gradient-to-r from-transparent via-[#3D4966] to-transparent animate-shimmer">
                    <input
                      type="text"
                      value={otherCategory}
                      onChange={(e) => setOtherCategory(e.target.value)}
                      placeholder="Enter your category"
                      className="w-full border-b border-[#C7C6CB] pb-1 focus:outline-none font-semibold text-lg bg-transparent"
                      maxLength={20}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={cx(
        "bottom-0 py-4 fixed justify-center w-[90%]"
      )}>
        <NewButton
          size="large"
          variant={name.length > 0 && (!category.includes('Other') || (category.includes('Other') && otherCategory.length > 0)) ? "primary" : "disabled"}
          className="w-full"
          onClick={gotoHome}
        >
          Next
        </NewButton>
      </div>
    </div>
  );
};
