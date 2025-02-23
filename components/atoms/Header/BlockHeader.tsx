import React from "react";
import { ArchiveRestore, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

const BlockHeader = ({
  dodopageUrl,
  handleArchive,
  handleDelete,
  mode,
}: {
  dodopageUrl: string;
  handleArchive: () => void;
  handleDelete: () => void;
  mode: "edit" | "add";
}) => {
  return (
    <div className="flex justify-between px-5 py-4 ">
      <Link href={`/dodo/${dodopageUrl}`}>
        <ArrowLeft size={20} />
      </Link>

      {mode === "edit" && (
        <div className="flex gap-10 items-center">
          {/* <div onClick={handleArchive}>
            <ArchiveRestore size={20} className="" />{" "}
          </div> */}
          <div onClick={handleDelete}>
            <Trash2 size={20} className="text-red-500" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockHeader;
