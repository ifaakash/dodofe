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

import {
  getUserDetails,
  getDodoPageByURL,
  registerUser,
  reorderBlocks,
} from "api";
import { useState, useEffect } from "react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { useSensors, useSensor } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

import PollBlock from "@components/molecules/dodoPage/blocks/PollBlock";
import HeadingBlock from "@components/molecules/dodoPage/blocks/HeadingBlock";
import SeparatorBlock from "@components/molecules/dodoPage/blocks/SeparatorBlock";
import ProductBlock from "@components/molecules/dodoPage/blocks/ProductBlock";
import { SortableBlock } from "@components/molecules/dodoPage/SortableBlock";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import LinkBlock from "@components/molecules/dodoPage/blocks/LinkBlock";
import SortableItem from "@components/molecules/dodoPage/SortableItem";

const DodoPageDashboard = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "edit";
  const { dodopageUrl } = useParams();
  const [userDetails, setUserDetails] = useState({} as any);
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
  const [dodoPageDetails, setDodoPageDetails] = useState({} as any);
  const [isDragging, setIsDragging] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [activeId, setActiveId] = useState(null);

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

  useEffect(() => {
    getUserDetails(userId).then((res) => {
      setUserDetails(res?.user);
    });
  }, []);

  useEffect(() => {
    getDodoPageByURL(dodopageUrl).then((res) => {
      setDodoPageDetails(res?.dodoPage);
      setBlocks(res?.dodoPage?.blocks);
    });
  }, []);

  const url = Array.isArray(dodopageUrl) ? dodopageUrl[0] : dodopageUrl;

  const handleDragStart = (event: any) => {
    setIsDragging(true);
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: any) => {
    setIsDragging(false);
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((item) => item.id === active.id);
      const newIndex = blocks.findIndex((item) => item.id === over.id);

      // Create new array with updated positions
      const updatedBlocks = arrayMove(blocks, oldIndex, newIndex).map(
        (block, index) => ({
          ...block,
          blockPositionalIndex: index,
        })
      );

      // Format blocks for API call
      const formattedBlocks = {
        dodoPageId: dodoPageDetails.id,
        blocks: updatedBlocks.map((block, index) => ({
          blockId: block.id,
          newIndex: index,
        })),
      };

      // Make API call and update state
      try {
        const res = await reorderBlocks(formattedBlocks);
        if (res?.success) {
          setBlocks(updatedBlocks);
        }
      } catch (error) {
        console.error("Error reordering blocks:", error);
      }
    }
  };

  const renderBlock = (
    block: {
      id: string;
      blockType: string;
      blockData: any;
    },
    index: number
  ) => {
    let content;
    switch (block.blockType) {
      case "LINK":
        content =
          mode === "edit" ? (
            <Link href={`/dodo/${url}/editBlock/${block.id}`}>
              <LinkBlock
                mode={mode}
                blockData={block.blockData}
                id={block.id}
                blockCardSize={block.blockCardSize}
              />
            </Link>
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
            <Link href={`/dodo/${url}/editBlock/${block.id}`}>
              <PollBlock
                mode={mode}
                blockData={block.blockData}
                id={block.id}
              />
            </Link>
          ) : (
            <PollBlock mode={mode} blockData={block.blockData} id={block.id} />
          );
        break;
      case "HEADING":
        content =
          mode === "edit" ? (
            <Link href={`/dodo/${url}/editBlock/${block.id}`}>
              <HeadingBlock
                title={block.blockData?.title}
                mode={mode}
                id={block.id}
              />
            </Link>
          ) : (
            <HeadingBlock
              title={block.blockData?.title}
              mode={mode}
              id={block.id}
            />
          );
        break;
      case "SEPARATOR":
        content =
          mode === "edit" ? (
            <Link href={`/dodo/${url}/editBlock/${block.id}`}>
              <SeparatorBlock
                type={block.blockData?.separatorType}
                mode={mode}
                id={block.id}
              />
            </Link>
          ) : (
            <SeparatorBlock
              type={block.blockData?.separatorType}
              mode={mode}
              id={block.id}
            />
          );
        break;
      case "PRODUCT":
        if (index > 0 && blocks[index - 1]?.blockType === "PRODUCT") {
          return null;
        }
        const nextBlock = blocks[index + 1];
        if (nextBlock?.blockType === "PRODUCT") {
          content = (
            <div className="grid grid-cols-2 gap-[10px] w-full">
              {mode === "edit" ? (
                <Link href={`/dodo/${url}/editBlock/${block.id}`}>
                  <ProductBlock
                    productData={block.blockData}
                    mode={mode}
                    id={block.id}
                  />
                </Link>
              ) : (
                <div>
                  <ProductBlock
                    productData={block.blockData}
                    mode={mode}
                    id={block.id}
                  />
                </div>
              )}
              {mode === "edit" ? (
                <Link href={`/dodo/${url}/editBlock/${nextBlock.id}`}>
                  <ProductBlock
                    productData={nextBlock.blockData}
                    id={nextBlock.id}
                    mode={mode}
                  />
                </Link>
              ) : (
                <div>
                  <ProductBlock
                    productData={nextBlock.blockData}
                    mode={mode}
                    id={nextBlock.id}
                  />
                </div>
              )}
            </div>
          );
        } else {
          content = (
            <div className="w-full">
              {mode === "edit" ? (
                <Link href={`/dodo/${url}/editBlock/${block.id}`}>
                  <ProductBlock
                    productData={block.blockData}
                    mode={mode}
                    id={block.id}
                  />
                </Link>
              ) : (
                <ProductBlock
                  productData={block.blockData}
                  mode={mode}
                  id={block.id}
                />
              )}
            </div>
          );
        }
        break;
      default:
        return null;
    }
    return content;
  };

  console.log("blocks", blocks);

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
          socialLinks={dodoPageDetails?.socialLinks}
          url={url}
          mode={mode}
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
                items={blocks.map((block) => block.id)}
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
          <FooterBar
            mode={mode}
            url={url}
            userId={userId}
            dodoPageId={dodoPageDetails?.id}
          />
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
