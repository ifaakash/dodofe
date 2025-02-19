import React from "react";
import ArchiveIcon from "public/icons/archive.svg";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ArchiveTab = () => {
  const { dodopageUrl } = useParams();
  return (
    <Link
      href={"/dodo/" + dodopageUrl + "/archives"}
      className="flex items-center gap-2 bg-[rgba(253,251,255,0.35)] px-[10px] py-3 rounded-[10px] justify-between mx-4"
    >
      <div className="flex items-center gap-2">
        <Image src={ArchiveIcon} alt="Archive" height={16} width={16} />
        <div className="text-xs font-medium text-[#3D4966]">Archive</div>
      </div>
      <MoveUpRight size={12} />
    </Link>
  );
};

export default ArchiveTab;
