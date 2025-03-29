"use client";
import { Footer, UserInput } from "@components/atoms";
import { useState } from "react";
import cx from "classnames";
import { useRouter } from "next/navigation";
import styles from "./userCategory.module.css";
import { ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import { completeProfile } from "api";
import { loadState } from "@utils/localStorage";
import NewButton from "@components/atoms/Button/NewButton";

const categories = [
  { name: "tech", code: "#ffffff" },
  { name: "entertainment", code: "#d83248" },
  { name: "food", code: "#d83248" },
  { name: "finance", code: "#d83248" },
  { name: "comedy", code: "#d83248" },
  { name: "beauty", code: "#d83248" },
  { name: "travel", code: "#d83248" },
  { name: "sports", code: "#d83248" },
  { name: "gaming", code: "#d83248" },
  { name: "diy", code: "#d83248" },
  { name: "vlogger", code: "#d83248" },
  { name: "gym & fitness", code: "#d83248" },
  { name: "educator", code: "#d83248" },
  { name: "dancer", code: "#d83248" },
  { name: "singer", code: "#d83248" },
  { name: "doctor", code: "#d83248" },
  { name: "motivational", code: "#d83248" },
  { name: "real estate", code: "#d83248" },
  { name: "home design", code: "#d83248" },
  { name: "Other", code: "#d83248" },
];

export const UserCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string[]>([]); // Changed from string to array
  const router = useRouter();

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
        router.push(ROUTE_CONSTANTS.HOME, { scroll: false });
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

      <div className={cx("card my-4 px-4 flex items-center flex-col w-full", styles.cardDimensions)}>
        <UserInput
          name="fullName"
          className="w-full"
          value={name}
          hasLabel
          placeholder="Enter your first name"
          onChange={handleName}
          errorMsg={"Please enter a valid name"}
          type="text"
          maxLength={16}
        />
      </div>

      <span className="text-xl clr-heading-text mb-2">Choose</span>
      <br />
      <span className="text-3xl font-black clr-heading-text mb-2">Categories</span>

      <div className="my-4 flex flex-wrap w-full">
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
          variant="primary"
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
