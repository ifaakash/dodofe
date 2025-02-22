"use client";
import NewButton from "@components/atoms/Button/NewButton";
import Input from "@components/atoms/Input";
import React, { useState } from "react";
import { createBlock } from "api";
import { BLOCKS } from "@utils/constants";
import { ROUTE_CONSTANTS } from "@utils/constants";
import { useRouter } from "next/navigation";

const AddHeading = ({
  dodoPageId,
  userId,
  dodopageUrl,
  mode,
  blockData,
}: {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string | string[];
  mode: "edit" | "add";
  blockData?: any;
}) => {
  const [heading, setHeading] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await createBlock({
      dodoPageId: dodoPageId,
      blockType: "HEADING",
      blockCardSize: "SMALL",
      blockData: {
        title: heading,
      },
      userId: userId,
    });
    if (res.success) {
      router.push("/dodo/" + dodopageUrl);
    }
  };

  return (
    <div className="flex items-center flex-col">
      {mode === "edit" ? (
        <Input
          placeholder="Heading"
          value={blockData?.title}
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
      <div className="bottom-0 fixed mb-4 px-4 w-full">
        <NewButton
          size="large"
          variant={heading ? "primary" : "disabled"}
          onClick={handleSubmit}
          className="w-full"
        >
          {mode === "edit" ? "Update" : "Add"}
        </NewButton>
      </div>
    </div>
  );
};

export default AddHeading;
