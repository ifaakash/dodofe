"use client";
import NewButton from "@components/atoms/Button/NewButton";
import { Input } from "@components/atoms";
import React, { useState } from "react";
import Switcher from "@components/atoms/Switcher/Switcher";
import AddImageIcon from "public/icons/addImage.svg";
import Image from "next/image";
import EditPen from "public/icons/EditPen.svg";
import { useRouter } from "next/navigation";
import { addBlock } from "store/slice/blocksSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { TriangleAlert } from "lucide-react";

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
  block,
}: {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string;
  mode: "add" | "edit";
  block?: any;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedBadgeCategory, setSelectedBadgeCategory] = useState<string>(
    badges.find(
      (badge) => badge.backgroundColor === block?.blockData?.badge?.backgroundColor
    )?.text || ""
  );
  const [displayType, setDisplayType] = useState<string>(
    block?.blockData?.blockCardSize || "SMALL"
  );
  const [titleEditing, setTitleEditing] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [link, setLink] = useState<string>(block?.blockData?.url || "");
  const [title, setTitle] = useState<string>(block?.blockData?.title || "");
  const [badgeText, setBadgeText] = useState<string>(
    block?.blockData?.badge?.text || ""
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const [titleError, setTitleError] = useState<string>("");
  const [linkError, setLinkError] = useState<string>("");
  const [badgeError, setBadgeError] = useState<string>("");

  const validateForm = (): boolean => {
    let isValid = true;

    // Reset all errors first
    setTitleError("");
    setLinkError("");
    setBadgeError("");

    if (!title.trim()) {
      setTitleError("Title is Required");
      isValid = false;
    }

    if (!link.trim()) {
      setLinkError("Link is Required");
      isValid = false;
    }

    if (badgeText.trim() && !selectedBadgeCategory) {
      setBadgeError("Badge Category is Required when Badge Text is provided");
      isValid = false;
    }

    if (selectedBadgeCategory && !badgeText) {
      setBadgeError("Badge Text is Required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      dispatch(
        addBlock({
          id: uuidv4(),
          blockType: "LINK",
          blockCardSize: displayType as "SMALL" | "MEDIUM" | "LARGE",
          blockData: {
            title,
            url: link,
            linkDisplayPicture: uploadedImage as File,
            badge: {
              text: badgeText,
              backgroundColor: selectedBadgeCategory,
              color:
                badges.find((badge) => badge.text === selectedBadgeCategory)
                  ?.color || "",
            },
          },
          hasMedia: uploadedImage ? true : false,
          isNew: true,
        })
      );
      router.back();
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const handleUpdate = async () => {
    console.log("handleUpdate");
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
                      ? "w-full object-cover rounded-[6px] max-w-[50px] h-[50px] aspect-square"
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
            <div>
              {mode === "add" ? (
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
                      <div className="text-[#3D4966] font-medium">
                        {" "}
                        Add Title{" "}
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
          {titleError && (
            <div className="text-red-500 flex items-center gap-2">
              <TriangleAlert strokeWidth={2} size={16} />
              <span className="text-sm"> {titleError}</span>
            </div>
          )}

          <Input
            placeholder="Paste your link here....."
            value={link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
          />
          {linkError && (
            <div className="text-red-500 flex items-center gap-2">
              <TriangleAlert strokeWidth={2} size={16} />
              <span className="text-sm"> {linkError}</span>
            </div>
          )}
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
          {badgeError && (
            <div className="text-red-500 flex items-center gap-2">
              <TriangleAlert strokeWidth={2} size={16} />
              <span className="text-sm"> {badgeError}</span>
            </div>
          )}
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
