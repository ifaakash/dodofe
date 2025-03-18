import React, { useEffect } from "react";
import { ArchiveRestore, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { handleNativeBackButton, isWebview } from "@utils/index";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@utils/constants";

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
  const router = useRouter();

  const handleBack = (event: MessageEvent) => handleNativeBackButton(event, () => router.push(ROUTE_CONSTANTS.DODOPAGE + ROUTE_CONSTANTS.SLASH + dodopageUrl));

  useEffect(() => {
    if (isWebview()) {
      document.addEventListener("message", handleBack);
    }

    return () => {
      if (isWebview()) {
        document.removeEventListener("message", handleBack);
      }
    }
  })

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
