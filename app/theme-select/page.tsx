"use client";

import styles from "./themeSelect.module.css";
import cx from "classnames";
import Image from "next/image";
import leftArrow from "public/icons/leftArrow.svg";

import { useState } from "react";

import ThemeWheel from "./themeWheel";
import DodoUrlMini from "@components/templates/dodoUrlMini";
import { Button } from "@components/atoms";
import { useRouter } from "next/navigation";

const solidColors = [
  { name: "Light", code: "#ffffff" },
  { name: "Ruby", code: "#d83248" },
  { name: "Grapeful", code: "#d83248" },
  { name: "Sunflower", code: "#d83248" },
  { name: "Gross", code: "#d83248" },
  { name: "Basil", code: "#d83248" },
  { name: "Mint", code: "#d83248" },
  { name: "Aqua", code: "#d83248" },
  { name: "Plum", code: "#d83248" },
  { name: "Pink rose", code: "#d83248" },
  { name: "Beaver", code: "#d83248" },
];

const gradientColors = [
  { name: "Prism", code: "#FF5733" },
  { name: "Chroma", code: "#33FF57" },
  { name: "Spectrum", code: "#3357FF" },
  { name: "Aurora", code: "#FF33A1" },
  { name: "Vivid", code: "#33FFA1" },
  { name: "Radiance", code: "#A133FF" },
  { name: "Ember", code: "#FFA133" },
  { name: "Azure", code: "#FF3333" },
];

const colorsArr = [
  "#000000",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#33FFA1",
  "#A133FF",
  "#FFA133",
  "#FF3333",
  "#33FF33",
  "#3333FF",
];

export default function ThemeSelect() {
  const [theme, setTheme] = useState("Light");
  const [themeType, setThemeType] = useState(0);
  const [currentColor, setCurrentColor] = useState(0);
  const router = useRouter();

  const numArcs = 8;
  const colors = ["red", "blue", "green", "yellow"];

  const getHeader = () => {
    return (
      <div className="flex flex-row justify-between items-center w-full">
        <Image
          height={16}
          width={16}
          src={leftArrow}
          alt="user profile"
          className="my-4"
          onClick={() => router.back()}
        />

        <div className="flex flex-row items-center">
          <span className="text-sm ml-8 clr-grey font-bold">choose theme</span>
        </div>

        <Button text="SAVE" className="bg-white text-xs my-2 py-1" />
      </div>
    );
  };

  return (
    <div className="mx-4 mt-16 overflow-hidden absolute-center flex-col">
      {getHeader()}

      <div className="absolute-center mb-4">
        <Button
          text="Solid"
          onClick={() => {
            setThemeType(0);
          }}
          className={cx(
            "bg-white text-xs my-2 py-1",
            themeType === 0 && "border"
          )}
        />

        <Button
          text="Gradient"
          onClick={() => {
            setThemeType(1);
          }}
          className={cx(
            "bg-white text-xs my-2 py-1 ml-3",
            themeType === 0 && "border"
          )}
        />
      </div>

      <div
        className={cx(
          styles.dodoContainer,
          "relative rounded-lg overflow-hidden"
        )}
      >
        <DodoUrlMini
          className={cx(styles.dodoUrlPage, "px-4 rounded-lg ")}
          mainBgTheme={colorsArr[currentColor]}
        />
      </div>

      <div
        className={cx("absolute-center h-8 w-20 bg-white", styles.themeName)}
      >
        "theme"
      </div>

      <div
        className="absolute bottom-0 overflow-y-hidden"
        style={{ transform: "translate(0,50%)" }}
      >
        <ThemeWheel
          colors={colorsArr}
          numArcs={numArcs}
          setCurrentColor={setCurrentColor}
          currentColor={currentColor}
        />
      </div>
    </div>
  );
}
