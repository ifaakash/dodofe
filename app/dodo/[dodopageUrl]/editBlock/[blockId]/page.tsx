"use client";
import HeadingBlock from "@components/molecules/dodoPage/blocks/HeadingBlock";
import PollBlock from "@components/molecules/dodoPage/blocks/PollBlock";
import ProductBlock from "@components/molecules/dodoPage/blocks/ProductBlock";
import SeparatorBlock from "@components/molecules/dodoPage/blocks/SeparatorBlock";
import { SortableBlock } from "@components/molecules/dodoPage/SortableBlock";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { loadState } from "@utils/localStorage";
import { archiveBlock, getBlockById } from "api";
import { ArchiveRestore, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddBlock from "../../addBlock/page";
import AddHeading from "@components/molecules/dodoPage/addBlocks/AddHeading";
import BlockHeader from "@components/atoms/Header/BlockHeader";
import AddSeparator from "@components/molecules/dodoPage/addBlocks/AddSeparator";
import AddPoll from "@components/molecules/dodoPage/addBlocks/AddPoll";
import AddProduct from "@components/molecules/dodoPage/addBlocks/AddProduct";
import AddLink from "@components/molecules/dodoPage/addBlocks/AddLink";

const EditBlock = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { blockId } = useParams();
  const router = useRouter();
  const { dodopageUrl } = useParams();
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
  const [blockDetails, setBlockDetails] = useState<any>(null);

  const handleArchive = async () => {
    const res = await archiveBlock({
      blockId: blockId,
      userId: userId,
    });

    if (res?.success) {
      toast.success("Block Archived");
      router.push(`/dodo/${dodopageUrl}`);
    }
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  useEffect(() => {
    const getBlockDetails = async () => {
      const res = await getBlockById(blockId);
      if (res.success) {
        setBlockDetails(res?.data);
      }
    };

    getBlockDetails();
  }, []);

  const renderBlock = () => {
    switch (blockDetails?.blockType) {
      case "HEADING":
        return (
          <AddHeading
            dodoPageId={blockDetails.dodoPageId}
            userId={userId}
            blockData={blockDetails.blockData}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        );
      case "SEPARATOR":
        return (
          <AddSeparator
            dodoPageId={blockDetails.dodoPageId}
            userId={userId}
            blockData={blockDetails.blockData}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        );
      case "POLL":
        return (
          <AddPoll
            dodoPageId={blockDetails.dodoPageId}
            userId={userId}
            blockData={blockDetails.blockData}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        )
      case "LINK":
        console.log("LINK BLOCK", blockDetails);
        return (
          <AddLink
            dodoPageId={blockDetails.dodoPageId}
            userId={userId}
            blockData={blockDetails.blockData}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        )
        case "PRODUCT":
        return (
          <AddProduct
            dodoPageId={blockDetails.dodoPageId}
            userId={userId}
            blockData={blockDetails.blockData}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        )
      default:
        return null;
    }
  };

  return (
    <div className="">
      <BlockHeader
        dodopageUrl={dodopageUrl as string}
        handleArchive={handleArchive}
        handleDelete={handleDelete}
        mode={"edit"}
      />

      <div className="px-5">{renderBlock()}</div>
    </div>
  );
};

export default EditBlock;
