"use client";
import HeadingBlock from "@components/molecules/dodoPage/blocks/HeadingBlock";
import PollBlock from "@components/molecules/dodoPage/blocks/PollBlock";
import ProductBlock from "@components/molecules/dodoPage/blocks/ProductBlock";
import SeparatorBlock from "@components/molecules/dodoPage/blocks/SeparatorBlock";
import { SortableBlock } from "@components/molecules/dodoPage/SortableBlock";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { loadState } from "@utils/localStorage";
import { deleteBlock, getBlockById } from "api";
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
import { useDispatch, useSelector } from "react-redux";
import { removeBlock, archiveBlock } from "store/slice/blocksSlice";
import Modal from "@components/molecules/Modal";

const EditBlock = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const { blockId } = useParams();
  const router = useRouter();
  const { dodopageUrl } = useParams();
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
  const [blockDetails, setBlockDetails] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const dispatch = useDispatch();

  const confirmArchive = async () => {
    dispatch(archiveBlock({ blockId: blockId as string }));
    router.back();
  };

  const handleArchive = () => {
    setShowArchiveConfirm(true);
  };

  const confirmDelete = async () => {
    dispatch(removeBlock(blockId as string));
    router.back();
  }

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const state = useSelector((state: any) => state.blocks);

  useEffect(() => {
    const getBlockDetails = async () => {
      const block = state.blocks.find((block: any) => block.id === blockId);
      setBlockDetails(block);
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
            block={blockDetails}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        );
      case "SEPARATOR":
        return (
          <AddSeparator
            dodoPageId={blockDetails.dodoPageId}
            userId={userId}
            block={blockDetails}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        );
      case "POLL":
        return (
          <AddPoll
            dodoPageId={blockDetails.dodoPageId}
            userId={userId}
            block={blockDetails}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        );
      case "LINK":
        return (
          <AddLink
            dodoPageId={blockDetails.dodoPageId}
            userId={userId}
            block={blockDetails}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        );
      case "PRODUCT":
        console.log(blockDetails)
        return (
          <AddProduct
            dodoPageId={blockDetails.dodoPageId}
            userId={userId}
            block={blockDetails}
            dodopageUrl={dodopageUrl as string}
            mode={"edit"}
          />
        );
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

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">Are you sure you want to delete this block?</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {(
        <Modal visible={showArchiveConfirm} onCloseIconClick={() => setShowArchiveConfirm(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="mb-4">Are you sure you want to archive this block?</p>
              <button
                className="bg-brandPrimary text-white px-4 py-2 rounded mr-2"
                onClick={confirmArchive}
              >
                Archive
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowArchiveConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditBlock;
