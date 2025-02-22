"use client";
import NewButton from "@components/atoms/Button/NewButton";
import { Input } from "@components/atoms";
import React, { useState } from "react";
import Switcher from "@components/atoms/Switcher/Switcher";
import AddImageIcon from "public/icons/addImage.svg";
import Image from "next/image";
import EditPen from "public/icons/EditPen.svg";
import { createBlock, createBlockWithFormData } from "api";

const badges = [
  {
    text: "Sunflower",
    backgroundColor: "#FFCF58",
    color: "#000000",
  },
  {
    text: "Grapefruit",
    backgroundColor: "#FB7053",
    color: "#FFFFFF",
  },
  {
    text: "Aqua",
    backgroundColor: "#51C0EB",
    color: "#FFFFFF",
  },
  {
    text: "Plum",
    backgroundColor: "#8066BE",
    color: "#FFFFFF",
  },
];

const AddLink = ({
  dodoPageId,
  userId,
  dodopageUrl,
  mode,
  blockData,
}: {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string;
  mode: "add" | "edit";
  blockData: any;
}) => {
  const [selectedBadgeCategory, setSelectedBadgeCategory] =
    useState<string>("");
  const [displayType, setDisplayType] = useState<string>("SMALL");
  const [titleEditing, setTitleEditing] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [link, setLink] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [badgeText, setBadgeText] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Add all required fields to formData
      formData.append("blockType", "LINK");
      formData.append("blockCardSize", displayType); // Use the actual display type instead of hardcoded "LARGE"
      formData.append("blockData[title]", title);
      formData.append("blockData[url]", link);
      formData.append("blockData[badge][text]", badgeText);

      const selectedBadge = badges.find(
        (badge) => badge.text === selectedBadgeCategory
      );
      formData.append(
        "blockData[badge][backgroundColor]",
        selectedBadge?.backgroundColor || ""
      );
      formData.append("blockData[badge][color]", selectedBadge?.color || "");

      if (uploadedImage) {
        formData.append("linkDisplayPicture", uploadedImage);
      }

      const res = await createBlockWithFormData(formData, {
        dodoPageId,
        userId,
        dodopageUrl,
      });
      console.log("res", res);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div className="py-5 flex flex-col items-center">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-3">
          <div
            className={`flex ${
              displayType === "SMALL" ? "flex-row items-center" : "flex-col"
            } gap-3 p-2 rounded-lg bg-white transition-all duration-300 ease-in-out`}
          >
            <div
              className={`bg-[#979EAD] ${
                uploadedImage ? "" : "p-[15px]"
              } rounded-[10px] ${
                displayType === "SMALL" ? "" : "w-full h-32"
              } flex items-center justify-center relative cursor-pointer`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {uploadedImage ? (
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="uploaded preview"
                  className={`${
                    displayType === "SMALL"
                      ? "w-full object-cover rounded-[6px] max-w-[50px] h-[50px]"
                      : "w-full h-full object-cover rounded-[6px]"
                  }`}
                />
              ) : (
                <Image
                  src={AddImageIcon}
                  width={20}
                  height={20}
                  alt="add image"
                  className=""
                />
              )}
            </div>
            <div onClick={() => setTitleEditing(true)}>
              {titleEditing ? (
                <Input
                  type="text"
                  placeholder="Add Title...."
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="text-[#3D4966] font-medium"> Add Title </div>
                  <Image src={EditPen} width={20} height={20} alt="edit" />
                </div>
              )}
            </div>
          </div>

          <Input
            placeholder="Paste your link here....."
            value={link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold"> Add text badge </div>
          <Input
            placeholder="Add Badge Text"
            value={badgeText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBadgeText(e.target.value)
            }
          />
          <div className="flex justify-between">
            {badges.map((badge) => (
              <div
                key={badge.text}
                style={{
                  backgroundColor: badge.backgroundColor,
                  color: badge.color,
                }}
                className="flex items-center gap-2 py-[6px] px-2 rounded-full"
                onClick={() => setSelectedBadgeCategory(badge.text)}
              >
                <input
                  type="radio"
                  name="badge"
                  value={badge.text}
                  checked={selectedBadgeCategory === badge.text}
                />
                <span
                  className={`text-xs ${
                    selectedBadgeCategory === badge.text ? "font-medium" : ""
                  }`}
                >
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-0 fixed mb-4 px-4 w-full flex flex-col gap-4 items-center">
        {mode === "add" && (
          <Switcher displayType={displayType} setDisplayType={setDisplayType} />
        )}
        {mode === "add" ? (
          <NewButton
            size="large"
            variant="primary"
            className="w-full"
            onClick={handleSubmit}
          >
            Add Link
          </NewButton>
        ) : (
          <NewButton size="large" variant="primary" className="w-full">
            Update Link
          </NewButton>
        )}
      </div>
    </div>
  );
};

export default AddLink;
