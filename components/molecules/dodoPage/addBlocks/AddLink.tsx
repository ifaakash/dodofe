"use client";
import NewButton from "@components/atoms/Button/NewButton";
import { Input } from "@components/atoms";
import React, { useState } from "react";
import Switcher from "@components/atoms/Switcher/Switcher";
import AddImageIcon from "public/icons/addImage.svg";
import Image from "next/image";
import EditPen from "public/icons/EditPen.svg";
import { createBlockWithFormData, updateBlockWithFormData } from "api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  blockCardSize,
}: {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string;
  mode: "add" | "edit";
  blockData?: any;
  blockCardSize?: string;
}) => {
  const router = useRouter();
  const [selectedBadgeCategory, setSelectedBadgeCategory] = useState<string>(
    badges.find(
      (badge) => badge.backgroundColor === blockData?.badge?.backgroundColor
    )?.text || ""
  );
  const [displayType, setDisplayType] = useState<string>(
    blockCardSize || "SMALL"
  );
  const [titleEditing, setTitleEditing] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [link, setLink] = useState<string>(blockData?.url || "");
  const [title, setTitle] = useState<string>(blockData?.title || "");
  const [badgeText, setBadgeText] = useState<string>(
    blockData?.badge?.text || ""
  );

  const [linkDisplayPicture, setLinkDisplayPicture] = useState<string>(
    blockData?.linkDisplayPicture || ""
  );

  console.log("blockData LIN", blockData);
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
      formData.append("blockData[title]", title);
      formData.append("blockData[url]", dodopageUrl);

      if (badgeText && selectedBadgeCategory) {
        formData.append("blockData[badge][text]", badgeText);

        const selectedBadge = badges.find(
          (badge) => badge.text === selectedBadgeCategory
        );
        if (selectedBadge) {
          formData.append(
            "blockData[badge][backgroundColor]",
            selectedBadge.backgroundColor
          );
          formData.append("blockData[badge][color]", selectedBadge.color);
        }
      }

      if (uploadedImage) {
        formData.append("linkDisplayPicture", uploadedImage);
      }

      const res = await createBlockWithFormData(formData, {
        dodoPageId,
        userId,
        dodopageUrl,
        blockCardSize: displayType,
      });
      if (res?.success) {
        toast.success("Link added successfully");
        router.push(`/dodo/${dodopageUrl}`);
      }
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("blockType", "LINK");
      formData.append("blockData[title]", title);
      formData.append("blockData[url]", link);
      formData.append("blockId", blockData?.blockId);
      formData.append("userId", userId);
      formData.append("blockCardSize", displayType);

      if (badgeText && selectedBadgeCategory) {
        formData.append("blockData[badge][text]", badgeText);

        const selectedBadge = badges.find(
          (badge) => badge.text === selectedBadgeCategory
        );
        if (selectedBadge) {
          formData.append(
            "blockData[badge][backgroundColor]",
            selectedBadge.backgroundColor
          );
          formData.append("blockData[badge][color]", selectedBadge.color);
        }
      }

      if (uploadedImage) {
        formData.append("linkDisplayPicture", uploadedImage);
      }

      const res = await updateBlockWithFormData(formData);

      if (res?.success) {
        toast.success("Link updated successfully");
        router.back();
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  console.log("displayType", displayType);
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
                uploadedImage ? "" : " "
              } rounded-[10px] ${
                displayType === "SMALL" ? "w-[50px] h-[50px]" : "w-full h-32"
              } flex items-center justify-center relative cursor-pointer`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="w-full h-full flex items-center justify-center">
                {mode === "add" ? (
                  <div className="w-full h-full flex items-center justify-center">
                    {uploadedImage ? (
                      <img
                        src={URL.createObjectURL(uploadedImage)}
                        alt="uploaded preview"
                        className={`${
                          displayType === "SMALL"
                            ? "w-[50px] h-[50px] object-cover rounded-[6px]"
                            : "w-full h-full object-cover rounded-[6px]"
                        }`}
                      />
                    ) : (
                      <Image
                        src={AddImageIcon}
                        width={20}
                        height={20}
                        alt="add image"
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {uploadedImage ? (
                      <img
                        src={URL.createObjectURL(uploadedImage)}
                        alt="uploaded preview"
                        className={`${
                          displayType === "SMALL"
                            ? "w-[50px] h-[50px] object-cover rounded-[6px]"
                            : "w-full h-full object-cover rounded-[6px]"
                        }`}
                      />
                    ) : (
                      <Image
                        src={linkDisplayPicture || AddImageIcon}
                        fill
                        alt="add image"
                        className={
                          linkDisplayPicture
                            ? "aspect-video rounded-md object-cover"
                            : ""
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              {mode === "add" ? (
                <div onClick={() => setTitleEditing(true)} className="w-full">
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
                      <div className="text-[#3D4966] font-medium">
                        Add Title
                      </div>
                      <Image src={EditPen} width={20} height={20} alt="edit" />
                    </div>
                  )}
                </div>
              ) : (
                <Input
                  type="text"
                  placeholder="Add Title...."
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
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
        {/* {(mode === "add" || mode === "edit") && ( */}
        <Switcher displayType={displayType} setDisplayType={setDisplayType} />
        {/* )} */}
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
          <NewButton
            size="large"
            variant="primary"
            className="w-full"
            onClick={handleUpdate}
          >
            Update Link
          </NewButton>
        )}
      </div>
    </div>
  );
};

export default AddLink;
