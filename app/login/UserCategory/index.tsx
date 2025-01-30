"use client";
import { Footer, UserInput } from "@components/atoms";
import { useState } from "react";
import cx from "classnames";

import { useRouter } from "next/navigation";

import styles from "./userCategory.module.css";
import { ROUTE_CONSTANTS, socialPlatforms, STORAGE_CONSTANTS } from "@utils/constants";
import { createUserBlock, completeProfile } from "api";
import { loadState, saveState } from "@utils/localStorage";

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
];

export const UserCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("travel");
  const router = useRouter();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e?.target?.value);
  };

  const gotoHome = () => {
    const mobileNumber = loadState(STORAGE_CONSTANTS.MOBILE);
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';

    completeProfile({ userId, name, mobileNumber, interests: [category], socialLinks: [] }).then((res) => {
      router.push(ROUTE_CONSTANTS.HOME, { scroll: false });
    }).catch(() => {
      console.log('error');
    })
  };

  return (
    <div className="mx-4 mt-16">
      <span className="text-xl clr-heading-text mb-2">Enter</span>
      <br></br>
      <span className="text-3xl font-black clr-heading-text">Your Name</span>

      <div
        className={cx(
          "card my-4 px-4 flex items-center flex-col w-full",
          styles.cardDimensions
        )}
      >
        <UserInput
          name="fullName"
          className="clr-light-green w-full"
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
      <br></br>
      <span className="text-3xl font-black clr-heading-text mb-2">
        category
      </span>

      <div className="my-4 flex flex-wrap w-full">
        {categories.map((data) => {
          return (
            <div
              key={data.name}
              style={{ background: "var(--white)" }}
              className="rounded-lg mb-2 mr-2 px-3 h-10 flex justify-start items-center"
              onClick={() => {
                setCategory(data.name);
              }}
            >
              {data?.name}
              <input
                value={data.name}
                checked={category === data.name}
                className="ml-2"
                type="checkbox"
              ></input>
            </div>
          );
        })}
      </div>

      <Footer
        variant="default"
        primaryActionText="Continue"
        primaryAction={gotoHome}
      />
    </div>
  );
};
