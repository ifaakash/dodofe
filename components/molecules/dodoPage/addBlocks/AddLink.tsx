"use client";
import NewButton from "@components/atoms/Button/NewButton";
import { Input } from "@components/atoms";
import React, { useState, useRef, useEffect } from "react";
import Switcher from "@components/atoms/Switcher/Switcher";
import AddImageIcon from "public/icons/addImage.svg";
import Image from "next/image";
import EditPen from "public/icons/EditPen.svg";
import { useRouter } from "next/navigation";
import { addBlock, updateBlock } from "store/slice/blocksSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { TriangleAlert } from "lucide-react";
import PasteIcon from "public/icons/paste.svg";
import { handlePasteFromClipboard, isEmpty } from "@utils/index";
import { BADGES } from "@utils/constants";

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
    BADGES.find(
      (badge) => badge.text === block?.blockData?.badge?.backgroundColor
    )?.text || null
  );
  const [displayType, setDisplayType] = useState<string>(
    block?.blockData?.blockCardSize || "SMALL"
  );
  const [titleEditing, setTitleEditing] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [link, setLink] = useState<string>(block?.blockData?.url || "");
  const [title, setTitle] = useState<string>(block?.blockData?.title || "");
  const [badgeText, setBadgeText] = useState<string>(
    block?.blockData?.badge?.text || null
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const [previewBlock, setPreviewBlock] = useState<any>({
    id: block?.id || uuidv4(),
    blockType: "LINK",
    blockCardSize: displayType as "SMALL" | "MEDIUM" | "LARGE",
    blockData: {
      title,
      url: link,
      linkDisplayPicture: uploadedImage || block?.blockData?.linkDisplayPicture || null,
      badge: badgeText
        ? {
          text: badgeText,
          backgroundColor: selectedBadgeCategory,
          color: BADGES.find((badge) => badge.text === selectedBadgeCategory)?.color || "",
        }
        : null,
    },
    hasMedia: !!(uploadedImage || block?.blockData?.linkDisplayPicture),
  });

  useEffect(() => {
    if (titleEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [titleEditing]);

  useEffect(() => {
    setPreviewBlock((prev: any) => ({
      ...prev,
      blockCardSize: displayType,
      blockData: {
        ...prev.blockData,
        title,
        url: link,
        linkDisplayPicture: uploadedImage || block?.blockData?.linkDisplayPicture || null,
        badge: badgeText
          ? {
            text: badgeText,
            backgroundColor: selectedBadgeCategory,
            color: BADGES.find((badge) => badge.text === selectedBadgeCategory)?.color || "",
          }
          : null,
      },
    }));
  }, [title, link, uploadedImage, badgeText, selectedBadgeCategory, displayType]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const [titleError, setTitleError] = useState<string>("");
  const [linkError, setLinkError] = useState<string>("");
  const [badgeError, setBadgeError] = useState<string>("");

  const handleBadgeTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setBadgeText(text);

    if (text && !selectedBadgeCategory) {
      // Automatically assign the first badge color if none is selected
      setSelectedBadgeCategory(BADGES[0].text);
    } else if (!text) {
      // Clear the selected badge if the badge text is deleted
      setSelectedBadgeCategory(null);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Reset all errors first
    setTitleError("");
    setLinkError("");
    setBadgeError("");

    if (!title?.trim()) {
      setTitleError("Title is Required");
      isValid = false;
    }

    if (!link?.trim()) {
      setLinkError("Link is Required");
      isValid = false;
    } else if (!isValidUrl(link)) {
      setLinkError("Link is not valid");
      isValid = false;
    }

    if (badgeText?.trim() && !selectedBadgeCategory) {
      setBadgeError("Badge Category is Required when Badge Text is provided");
      isValid = false;
    }

    if (selectedBadgeCategory && !badgeText) {
      setBadgeError("Badge Text is Required");
      isValid = false;
    }

    return isValid;
  };

  const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
      "((([a-z0-9\\-]+\\.)+[a-z]{2,})|" +
      "localhost|" +
      "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
      "\\[?[a-f0-9]*:[a-f0-9:%.~+\\-]*\\]?)" +
      "(\\:\\d+)?(\\/[-a-z0-9+&@#\\/%?=~_|!:,.;]*)*" +
      "(\\?[;&a-z0-9+%#=~_|!:,.;]*)?" +
      "(\\#[-a-z0-9+&@#/%=~_|!:,.;]*)?$",
      "i"
    );
    return !!pattern.test(url);
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
            badge: badgeText
              ? {
                text: badgeText,
                backgroundColor: selectedBadgeCategory,
                color:
                  BADGES.find((badge) => badge.text === selectedBadgeCategory)
                    ?.color || null,
              }
              : null,
          },
          hasMedia: !!(uploadedImage || block?.blockData?.linkDisplayPicture),
          isNew: true,
        })
      );
      router.back();
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    const updatedBlock = {
      id: block?.id,
      blockType: "LINK",
      blockCardSize: displayType as "SMALL" | "MEDIUM" | "LARGE",
      blockData: {
        title,
        url: link,
        linkDisplayPicture:
          uploadedImage || block?.blockData?.linkDisplayPicture || null,
        badge: {
          text: badgeText,
          backgroundColor: selectedBadgeCategory,
          color:
            BADGES.find((badge) => badge.text === selectedBadgeCategory)
              ?.color || "",
        },
      },
      hasMedia: !!(uploadedImage || block?.blockData?.linkDisplayPicture),
      isUpdated: true,
    };

    dispatch(updateBlock(updatedBlock as any));
    router.back();
  };

  const displayImage = () => {
    if (uploadedImage) {
      return URL.createObjectURL(uploadedImage);
    }

    if (block?.blockData?.linkDisplayPicture) {
      if (typeof block?.blockData?.linkDisplayPicture === "string") {
        return block?.blockData?.linkDisplayPicture;
      }
      if (block?.blockData?.linkDisplayPicture instanceof Blob) {
        return URL.createObjectURL(block?.blockData?.linkDisplayPicture);
      }
    }
    return null;
  };


  const checkForImage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (uploadedImage) {
      e.stopPropagation();
    }
  };

  return (
    <div className="py-5 flex flex-col items-center">
      <div className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-3">
          <div
            className={`flex ${displayType === "SMALL" ? "flex-row items-center" : "flex-col"
              } gap-3 p-2 rounded-lg bg-white transition-all duration-300 ease-in-out`}
          >
            <div
              className={`bg-[#979EAD] transition-all duration-300 ease-in-out ${displayType === "SMALL"
                ? "w-10 h-10 rounded-md"
                : "w-full h-32 rounded-[10px]"
                } flex items-center justify-center relative cursor-pointer`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {displayImage() ? (
                <img
                  src={displayImage()}
                  alt="uploaded preview"
                  width={displayType === "SMALL" ? 20 : '100%'}
                  height={displayType === "SMALL" ? 20 : '100%'}
                  className={`transition-all duration-300 ease-in-out ${displayType === "SMALL"
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
                  className=""
                />
              )}
            </div>
            <div className="w-full">
              {mode === "add" ? (
                <div onClick={() => setTitleEditing(true)} className="font-heavy">
                  {titleEditing ? (
                    <Input
                      type="text"
                      placeholder="Add Title...."
                      value={title || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                      }
                      ref={inputRef}
                      className="font-medium"
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

          <div className="relative">
            <Input
              placeholder="Paste your link here....."
              value={link}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLink(e.target.value)
              }
              className="pr-10"
              icon={PasteIcon}
              onIconClick={() => handlePasteFromClipboard(setLink)}
              tooltipText="Tap to paste from clipboard"
            />
          </div>
          {linkError && (
            <div className="text-red-500 flex items-center gap-2">
              <TriangleAlert strokeWidth={2} size={16} />
              <span className="text-sm"> {linkError}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Add Badge Text"
            value={badgeText}
            onChange={handleBadgeTextChange}
          />

          <div className="flex justify-between">
            {BADGES.map((badge) => (
              <div
                key={badge.text}
                style={{
                  backgroundColor: badge.backgroundColor,
                  color: badge.color,
                }}
                className="flex items-center gap-1 py-[6px] px-2 rounded-full"
                onClick={() => setSelectedBadgeCategory(badge.text)}
              >
                <input
                  type="radio"
                  name="badge"
                  value={badge.text}
                  checked={selectedBadgeCategory === badge.text}
                />
                <span
                  className={`text-xs ${selectedBadgeCategory === badge.text ? "font-medium" : ""
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

        {/* Live Preview Section */}
        {/* <div className="mt-5 w-full">
          <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
          <LinkBlock inPreview mode={mode} block={previewBlock} />
        </div> */}
      </div>

      <div className="bottom-0 fixed mb-4 px-4 w-full flex flex-col gap-4 items-center" onClick={checkForImage}>
        <Switcher uploadedImage={uploadedImage} displayType={displayType} setDisplayType={setDisplayType} />
        {mode === "add" ? (
          <NewButton
            size="large"
            variant="primary"
            className="w-full"
            onClick={handleSubmit}
          >
            Add Link to draft
          </NewButton>
        ) : (
          <NewButton
            size="large"
            variant="primary"
            className="w-full"
            onClick={handleUpdate}
          >
            Update Link in draft
          </NewButton>
        )}
      </div>
    </div>
  );
};

export default AddLink;
