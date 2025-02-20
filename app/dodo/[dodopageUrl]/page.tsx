"use client";
import DodoPageHeader from "@components/molecules/dodoPage/DodoPageHeader";
import HeroSection from "@components/molecules/dodoPage/HeroSection";
import SocialLinks from "@components/molecules/dodoPage/SocialLinks";
import React from "react";
import styles from "./mainPage.module.css";
import { useParams, useSearchParams } from "next/navigation";
import ArchiveTab from "@components/molecules/dodoPage/ArchiveTab";
import FooterBar from "@components/molecules/dodoPage/FooterBar";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { loadState } from "@utils/localStorage";
import DodoIcon from "public/icons/dodoIconName.svg";

import { getDodoPageByURL } from "api";
import { useState, useEffect } from "react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSensors, useSensor } from "@dnd-kit/core";
import PollBlock from "@components/molecules/dodoPage/blocks/PollBlock";
import HeadingBlock from "@components/molecules/dodoPage/blocks/HeadingBlock";
import SeparatorBlock from "@components/molecules/dodoPage/blocks/SeparatorBlock";
import ProductBlock from "@components/molecules/dodoPage/blocks/ProductBlock";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import LinkBlock from "@components/molecules/dodoPage/blocks/LinkBlock";
import { Block } from "types";
import { addBlocksToStore, reorderBlocks } from "store/slice/blocksSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { setDodoPageId, setSocialLinks } from "store/slice/dodoPageSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import { reorderBlocks } from "api";

const DodoPageDashboard = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "edit";
  const { dodopageUrl } = useParams();
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
  const [dodoPageDetails, setDodoPageDetails] = useState({} as any);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeId, setActiveId] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const existingBlocks = useSelector((state: RootState) => state.blocks.blocks);
  const isUpdated = useSelector((state: RootState) => state.blocks.isUpdated);

  useEffect(() => {
    const fetchDodoPage = async () => {
      const res = await getDodoPageByURL(dodopageUrl);
      setDodoPageDetails(res?.dodoPage);
      setBlocks(res?.dodoPage?.blocks || []);
      dispatch(addBlocksToStore(res?.dodoPage?.blocks || []));
      dispatch(setDodoPageId(res?.dodoPage?.id));
      dispatch(setSocialLinks(res?.dodoPage?.socialLinks));
    };

    if (existingBlocks.length === 0) {
      fetchDodoPage();
    } else {
      setBlocks(existingBlocks);
    }
  }, [dodopageUrl, dispatch]);

  const url = Array.isArray(dodopageUrl) ? dodopageUrl[0] : dodopageUrl;

  const socialLinks = useSelector((state: RootState) => state.dodoPage.socialLinks); 

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: any) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((item) => item.id === active.id);
      const newIndex = blocks.findIndex((item) => item.id === over.id);

      // Update local state first
      const newBlocks = arrayMove(blocks, oldIndex, newIndex).map(
        (block, index) => ({
          ...block,
          blockPositionalIndex: index,
        })
      );
      setBlocks(newBlocks);

      // Format blocks for the dispatch
      const formattedBlocks = {
        dodoPageId: dodoPageDetails.id,
        blocks: newBlocks
          .filter((block) => block.id !== undefined)
          .map((block, index) => ({
            blockId: block.id as string,
            newIndex: index,
          })),
      };

      try {
        await dispatch(reorderBlocks(formattedBlocks));
      } catch (error) {
        // Revert to original order if the API call fails
        setBlocks(blocks);
        console.error("Error reordering blocks:", error);
        toast.error("Failed to reorder blocks");
      }
    }
  };

  const renderBlock = (block: Block, index: number) => {
    let content;
    const handleBlockClick = (e: React.MouseEvent, block: Block) => {
      if (block.isNew) {
        toast.error("Publish to edit");
        return;
      }
      router.push(`/dodo/${url}/editBlock/${block.id}`);
    };

    switch (block.blockType) {
      case "LINK":
        content =
          mode === "edit" ? (
            <div onClick={(e) => handleBlockClick(e, block)}>
              <LinkBlock
                mode={mode}
                blockData={block.blockData}
                id={block.id}
                blockCardSize={block.blockCardSize}
              />
            </div>
          ) : (
            <LinkBlock
              mode={mode}
              blockData={block.blockData}
              id={block.id}
              blockCardSize={block.blockCardSize}
            />
          );
        break;
      case "POLL":
        content =
          mode === "edit" ? (
            <div onClick={(e) => handleBlockClick(e, block)}>
              <PollBlock
                mode={mode}
                blockData={block.blockData}
                id={block.id as string}
              />
            </div>
          ) : (
            <PollBlock
              mode={mode}
              blockData={block.blockData}
              id={block.id as string}
            />
          );
        break;
      case "HEADING":
        content =
          mode === "edit" ? (
            <div onClick={(e) => handleBlockClick(e, block)}>
              <HeadingBlock
                title={block.blockData?.title}
                mode={mode}
                id={block.id as string}
              />
            </div>
          ) : (
            <HeadingBlock
              title={block.blockData?.title}
              mode={mode}
              id={block.id as string}
            />
          );
        break;
      case "SEPARATOR":
        content =
          mode === "edit" ? (
            <div onClick={(e) => handleBlockClick(e, block)}>
              <SeparatorBlock
                type={block.blockData?.separatorType}
                mode={mode}
                id={block.id as string}
              />
            </div>
          ) : (
            <SeparatorBlock
              type={block.blockData?.separatorType}
              mode={mode}
              id={block.id as string}
            />
          );
        break;
      case "PRODUCT":
        content = (
          <div className="w-full">
            {mode === "edit" ? (
              <div onClick={(e) => handleBlockClick(e, block)}>
                <ProductBlock
                  productData={block.blockData}
                  mode={mode}
                  id={block.id as string}
                />
              </div>
            ) : (
              <ProductBlock
                productData={block.blockData}
                mode={mode}
                id={block.id as string}
              />
            )}
          </div>
        );
        break;
      default:
        return null;
    }
    return content;
  };

  return (
    <div className={`${styles.dodoBackground} ${styles.scrollableContainer}`}>
      <div className="flex flex-col gap-3">
        <DodoPageHeader mode={mode} url={url} />
        <HeroSection
          mode={mode}
          dodoPageId={dodoPageDetails?.id}
          userId={userId}
          dodoPageDetails={dodoPageDetails}
        />
        <SocialLinks
          url={url}
          mode={mode}
          socialLinks={socialLinks as any}
        />

        <div className="flex flex-col gap-4 mb-24">
          {mode !== "preview" && <ArchiveTab />}

          <div
            className="mx-5 flex flex-col gap-3"
            style={{ touchAction: "auto" }}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
            >
              <SortableContext
                items={blocks
                  .map((block) => block.id)
                  .filter((id): id is string => id !== undefined)}
                strategy={verticalListSortingStrategy}
              >
                {blocks.map((block, index) => renderBlock(block, index))}
              </SortableContext>
              <DragOverlay>
                {activeId ? (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <p>Dragging item...</p>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
      {mode === "edit" && (
        <div className="bottom-0 fixed w-full p-4">
          <FooterBar mode={mode} url={url} userId={userId} />
        </div>
      )}

      {mode === "preview" && (
        <div className="flex flex-col gap-3 px-5 items-center mb-20">
          <div className="flex items-center gap-2">
            <div className="text-[#3D4966] text-xs">powered by:</div>
            <Image src={DodoIcon} alt="dodo icon" height={20} />
          </div>
          <div className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white rounded-full px-3 py-1 flex items-center gap-2">
            <div className=" font-semibold text-xs">
              Create your DODOpage now
            </div>
            <div className="bg-[#7A208D] rounded-full p-1 text-white w-fit">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DodoPageDashboard;
