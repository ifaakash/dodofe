import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewButton from "@components/atoms/Button/NewButton";
import { createBlock, updateBlock } from "api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addBlock } from "store/slice/blocksSlice";
import { v4 as uuidv4 } from "uuid";

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
  const [selected, setSelected] = useState(blockData?.separatorType);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // const res = await createBlock({
    //   dodoPageId: dodoPageId,
    //   blockType: "SEPARATOR",
    //   blockCardSize: "SMALL",
    //   blockData: {
    //     separatorType: selected,
    //   },
    //   userId: userId,
    // });

    // if(res.success) {
    //   router.push(`/dodo/${dodopageUrl}`);
    // }

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

  console.log("blockData", blockData, selected);

  const handleUpdateBlock = async () => {
    const res = await updateBlock({
      dodoPageId: dodoPageId,
      blockId: blockData.blockId,
      blockData: {
        separatorType: selected,
      },
    });

    console.log("res", res);

    if (res.success) {
      toast.success("Block updated successfully");
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
      <div className="bottom-0 fixed mb-4 px-4 w-full">
        <NewButton
          size="large"
          variant={
            selected &&
            (mode === "add" || selected !== blockData?.separatorType)
              ? "primary"
              : "disabled"
          }
          onClick={mode === "edit" ? handleUpdateBlock : handleSubmit}
          className="w-full"
        >
          {mode === "edit" ? "Update" : "Add"}
        </NewButton>
      </div>
    </div>
  );
};

export default AddSeparator;
