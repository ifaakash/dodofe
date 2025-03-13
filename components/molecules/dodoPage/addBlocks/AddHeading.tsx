"use client";
import NewButton from "@components/atoms/Button/NewButton";
import Input from "@components/atoms/Input";
import React, { useState } from "react";
import { createBlock } from "api";
import { BLOCKS } from "@utils/constants";
import { ROUTE_CONSTANTS } from "@utils/constants";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addBlock } from "store/slice/blocksSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { TriangleAlert } from "lucide-react";
import { updateBlock } from "store/slice/blocksSlice";

const AddHeading = ({
  dodoPageId,
  userId,
  dodopageUrl,
  mode,
  block,
}: {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string | string[];
  mode: "edit" | "add";
  block?: any;
}) => {
  const [heading, setHeading] = useState(block?.blockData?.title || "");
  const router = useRouter();
  const dispatch = useDispatch();
  const [headingError, setHeadingError] = useState("");

  const validateForm = (): boolean => {
    let isValid = true;
    setHeadingError("");
    if (!heading) {
      setHeadingError("Heading is Required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    dispatch(
      addBlock({
        id: uuidv4(),
        blockType: "HEADING",
        blockCardSize: "SMALL",
        blockData: {
          title: heading,
        },
        userId: userId,
        dodoPageId: dodoPageId,
        isNew: true,
      })
    );
    router.back();
  };

  console.log("Block", block);

  const handleUpdateBlock = async () => {
    if (!validateForm()) {
      return;
    }
    // const res = await updateBlock({
    //   dodoPageId: dodoPageId,
    //   blockId: block.blockId,
    //   blockData: {
    //     title: heading,
    //   },
    // });
    // if (res.success) {
    //   toast.success("Block updated successfully");
    //   router.push("/dodo/" + dodopageUrl);
    // }
    const updatedBlock = {
      id: block.id,
      blockType: "HEADING",
      blockCardSize: "SMALL",
      blockData: {
        title: heading,
      },
      isUpdated: true,
    };
    console.log("Updated Block", updatedBlock);
    dispatch(updateBlock(updatedBlock as any));
    router.back();
  };

  return (
    <div className="flex items-center flex-col">
      <div className="w-full">
        {mode === "edit" ? (
          <Input
            placeholder="Heading"
            value={heading}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHeading(e.target.value)
            }
          />
        ) : (
          <Input
            placeholder="Heading"
            value={heading}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHeading(e.target.value)
            }
          />
        )}
        {headingError && (
          <div className="text-red-500 flex items-center gap-2 pt-2">
            <TriangleAlert strokeWidth={2} size={16} />
            <span className="text-sm"> {headingError}</span>
          </div>
        )}
      </div>
      <div className="bottom-0 fixed mb-4 px-4 w-full">
        <NewButton
          size="large"
          variant={"primary"}
          onClick={mode === "edit" ? handleUpdateBlock : handleSubmit}
          className="w-full"
        >
          {mode === "edit" ? "Update" : "Add"} to draft
        </NewButton>
      </div>
    </div>
  );
};

export default AddHeading;
