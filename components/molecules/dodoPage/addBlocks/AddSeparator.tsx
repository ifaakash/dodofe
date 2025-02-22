import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewButton from "@components/atoms/Button/NewButton";
import { createBlock } from "api";
import { useRouter } from "next/navigation";

const AddSeparator = ({
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
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await createBlock({
      dodoPageId: dodoPageId,
      blockType: "SEPARATOR",
      blockCardSize: "SMALL",
      blockData: {
        separatorType: selected,
      },
      userId: userId,
    });

    if(res.success) {
      router.push(`/dodo/${dodopageUrl}`);
    }
  };
  return (
    <div className="flex items-center flex-col">
      <div className="flex flex-col gap-3 mt-6 w-full">
        {[
          {
            id: "dashed-line",
            label: "Dashed Line",
            className: "border-dashed",
          },
          { id: "solid-line", label: "Solid Line", className: "" },
          { id: "or", label: "Or", isOr: true },
        ].map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item.id)}
            className="bg-white py-4 px-3 rounded-xl flex flex-col gap-3"
          >
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="separator"
                checked={mode === "edit" ? blockData?.separatorType === item.id : selected === item.id}
              />
              <div className="text-xs font-medium">{item.label}</div>
            </div>
            {item.isOr ? (
              <div className="flex items-center gap-1">
                <div className="w-full h-[1px] bg-black" />
                <div className="text-[8px] bg-black text-white rounded-full p-1">
                  OR
                </div>
                <div className="w-full h-[1px] bg-black" />
              </div>
            ) : (
              <div
                className={`border-b-[1px] border-black ${item.className}`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="bottom-0 fixed mb-4 px-4 w-full">
        <NewButton
          size="large"
          variant={selected ? "primary" : "disabled"}
          onClick={handleSubmit}
          className="w-full"
        >
          {mode === "edit" ? "Update" : "Add"}
        </NewButton>
      </div>
    </div>
  );
};

export default AddSeparator;
