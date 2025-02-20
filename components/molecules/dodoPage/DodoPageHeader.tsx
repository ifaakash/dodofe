import Button from "@components/atoms/Button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import EyeIcon from "../../../public/icons/greenEye.svg";
import PenIcon from "../../../public/icons/EditPen.svg";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const DodoPageHeader = ({ mode, url }: { mode: string; url: string }) => {
  const blockChanges = useSelector((state: RootState) => state.blocks);
  const isUpdated = useSelector((state: RootState) => state.blocks.isUpdated);
  
  const hasUnsavedChanges = 
    blockChanges.isBlockUpdated ||
    blockChanges.isBlockArchived ||
    blockChanges.isBlockRemoved ||
    blockChanges.isPositionChanged ||
    blockChanges.isNewBlocksAdded ||
    isUpdated;

  return (
    <div className="px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <div>
            {hasUnsavedChanges && (
              <div className="text-xs font-semibold text-brandPrimary">
                Unsaved Changes
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {mode === "edit" ? (
          <Link href={`/dodo/${url}?mode=preview`}>
            <div className="flex items-center py-2 px-3 rounded-md bg-white gap-1">
              <div className="text-[#3D4966] text-xs font-semibold ">
                Preview
              </div>
              <Image src={EyeIcon} alt="pen" width={16} height={16} />
            </div>
          </Link>
        ) : (
          <Link href={`/dodo/${url}`}>
            <div className="flex items-center py-2 px-3 rounded-md bg-white gap-1">
              <div className="text-[#3D4966] text-xs font-semibold ">Edit</div>
              <Image src={PenIcon} alt="pen" width={16} height={16} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DodoPageHeader;
