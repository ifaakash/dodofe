import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import NewButton from "@components/atoms/Button/NewButton";
import { createBlock } from "api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addBlock, updateBlock } from "store/slice/blocksSlice";
import { v4 as uuidv4 } from "uuid";

const AddSeparator = ({
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
  const [selected, setSelected] = useState(block?.blockData?.separatorType || "");
  const router = useRouter();
  const dispatch = useDispatch();
  const [separatorError, setSeparatorError] = useState("");

  const validateForm = (): boolean => {
    setSeparatorError("");
    if (!selected) {
      setSeparatorError("Please select a separator type");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    dispatch(
      addBlock({
        id: uuidv4(),
        blockType: "SEPARATOR",
        blockCardSize: "SMALL",
        blockData: {
          separatorType: selected,
        },
        userId: userId,
        dodoPageId: dodoPageId,
        isNew: true,
      })
    );
    router.back();
  };

  const handleUpdateBlock = async () => {
    // const res = await updateBlock({
    //   dodoPageId: dodoPageId,
    //   blockId: block.id,
    //   blockData: {
    //     separatorType: selected,
    //   },
    // });

    // if (res.success) {
    //   toast.success("Block updated successfully");
    //   router.push(`/dodo/${dodopageUrl}`);
    // }

    dispatch(
      updateBlock({
        id: block.id,
        blockType: "SEPARATOR",
        blockCardSize: "SMALL",
        blockData: {
          separatorType: selected,
        },
        isUpdated: true,
      })
    );
    router.back();
  };

  console.log("Separator block", block);

  return (
    <div className="flex items-center flex-col">
      <div className="flex flex-col gap-2 w-full">
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
                  checked={selected === item.id}
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

        {separatorError && (
          <div className="text-red-500 flex items-center gap-2 pt-2">
            <TriangleAlert strokeWidth={2} size={16} />
            <span className="text-sm"> {separatorError}</span>
          </div>
        )}
      </div>
      <div className="bottom-0 fixed mb-4 px-4 w-full">
        {mode === "add" ? (
          <NewButton
            size="large"
            variant="primary"
            onClick={handleSubmit}
            className="w-full"
          >
            Add
          </NewButton>
        ) : (
          <NewButton
            size="large"
            variant="primary"
            onClick={handleUpdateBlock}
            className="w-full"
          >
            Update
          </NewButton>
        )}
      </div>
    </div>
  );
};

export default AddSeparator;
