"use client";

import styles from "./basicDetails.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import userDetailImg from "public/assets/userDetails.png";
import { Footer, UserInput } from "@components/atoms";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@utils/constants";
import Screen from "@components/molecules/Screen";

export default function BasicDetails() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const router = useRouter();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value);
  };

  const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e?.target?.value);
  };

  const handleOnClick = () => {
    router.push(ROUTE_CONSTANTS.LINKS, { scroll: false });
  };

  return (
    <Screen>
      <div className="mx-4 mt-16">
        <span className="text-2xl clr-light-green mb-2">Enter your</span>
        <br></br>
        <span className="text-3xl font-black ">Basic Details</span>
        <div
          className={cx(
            "card mt-4 px-4 flex items-center flex-col w-full",
            styles.cardDimensions
          )}
        >
          <Image
            height={100}
            width={100}
            src={userDetailImg}
            alt="user profile"
            className="my-4"
          />{" "}
          <UserInput
            name="fullName"
            className="clr-light-green w-full"
            value={title}
            hasLabel
            placeholder="Title"
            onChange={handleTitle}
            errorMsg={"Please enter a valid title"}
            type="text"
            maxLength={16}
          />
          <UserInput
            name="city"
            className="clr-light-green fs-16"
            value={desc}
            hasLabel
            placeholder="Short Description"
            onChange={handleDesc}
            errorMsg={"Please enter a valid desc"}
            type="text"
            maxLength={40}
          />{" "}
        </div>
        <Footer
          variant="default"
          primaryActionText="Continue"
          primaryAction={handleOnClick}
        />
      </div>
    </Screen>
  );
}
