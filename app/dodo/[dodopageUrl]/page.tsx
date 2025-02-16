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
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PollBlock from "@components/molecules/dodoPage/blocks/PollBlock";
import HeadingBlock from "@components/molecules/dodoPage/blocks/HeadingBlock";
import SeparatorBlock from "@components/molecules/dodoPage/blocks/SeparatorBlock";
import ProductBlock from "@components/molecules/dodoPage/blocks/ProductBlock";
import { SortableBlock } from "@components/molecules/dodoPage/SortableBlock";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import LinkBlock from "@components/molecules/dodoPage/blocks/LinkBlock";
const DodoPageDashboard = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "edit";
  const { dodopageUrl } = useParams();
  const [userDetails, setUserDetails] = useState({} as any);
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
  const [dodoPageDetails, setDodoPageDetails] = useState({} as any);
  const [isDragging, setIsDragging] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
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

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async (event: any) => {
    setIsDragging(false);
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
      case "POLL":
        content = <PollBlock mode={mode} blockData={block.blockData} />;
        break;
      case "HEADING":
        content = <HeadingBlock title={block.blockData?.title} mode={mode} />;
        break;
      case "LINK":
        content = <LinkBlock mode={mode} blockData={block.blockData} blockCardSize={block.blockData?.blockCardSize}
        />;
        break;
      case "PRODUCT":
        if (index > 0 && blocks[index - 1]?.blockType === "PRODUCT") {
          return null;
        }
        const nextBlock = blocks[index + 1];
        if (nextBlock?.blockType === "PRODUCT") {
          content = (
            <div className="grid grid-cols-2 gap-[10px] w-full">
              <SortableBlock id={block.id}>
                {mode === "edit" ? (
                  <div>
                    <ProductBlock productData={block.blockData} mode={mode} />
                  </div>
                ) : (
                  <Link href={`/dodo/${url}/editBlock/${block.id}`}>
                    <ProductBlock productData={block.blockData} mode={mode} />
                  </Link>
                )}
              </SortableBlock>
              <SortableBlock id={nextBlock.id}>
                {mode === "edit" ? (
                  <div>
                    <ProductBlock productData={nextBlock.blockData} mode={mode} />
                  </div>
                ) : (
                  <Link href={`/dodo/${url}/editBlock/${nextBlock.id}`}>
                    <ProductBlock productData={nextBlock.blockData} mode={mode} />
                  </Link>
                )}
              </SortableBlock>
            </div>
          );
        } else {
          content = (
            <div className="w-full">
              <SortableBlock id={block.id}>
                {mode === "edit" ? (
                  <div>
                    <ProductBlock productData={block.blockData} mode={mode} />
                  </div>
                ) : (
                  <Link href={`/dodo/${url}/editBlock/${block.id}`}>
                    <ProductBlock productData={block.blockData} mode={mode} />
                  </Link>
                )}
              </SortableBlock>
            </div>
          );
        }
        return content;
      case "SEPARATOR":
        content = (
          <SeparatorBlock type={block.blockData?.separatorType} mode={mode} />
        );
        break;
      default:
        return null;
    }

    // For non-PRODUCT blocks, wrap with SortableBlock
    if (block.blockType !== "PRODUCT") {
      return (
        <SortableBlock key={block.id} id={block.id}>
          {mode === "edit" ? (
            <div>{content}</div>
          ) : (
            <Link href={`/dodo/${url}/editBlock/${block.id}`}>
              {content}
            </Link>
          )}
        </SortableBlock>
      );
    }

    return content; 
  };

  return (
    <div className={styles.dodoBackground}>
      <div className="flex flex-col gap-3">
        <DodoPageHeader mode={mode} url={url} />
        <HeroSection
          mode={mode}
          dodoPageId={dodoPageDetails?.id}
          userId={userId}
          dodoPageDetails={dodoPageDetails}
        />
        <SocialLinks socialLinks={dodoPageDetails?.socialLinks} url={url} mode={mode} />

        <div className="flex flex-col gap-4 mb-24">
          {mode !== "preview" && <ArchiveTab />}

          <div className="mx-5 flex flex-col gap-3" style={{ touchAction: "none" }}>
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
            </DndContext>
          </div>
        </div>
      </div>
      {mode === "edit" && (
        <div className="bottom-0 fixed w-full p-4">
          <FooterBar mode={mode} url={url} userId={userId} dodoPageId={dodoPageDetails?.id}/>
        </div>
      )}

      {
        mode === "preview" && (
          <div className="flex flex-col gap-3 px-5 items-center mb-20">
        <div className="flex items-center gap-2">
          <div className="text-[#3D4966] text-xs">powered by:</div>
          <Image  src={DodoIcon} alt="dodo icon" height={20} />
        </div>
        <div className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white rounded-full px-3 py-1 flex items-center gap-2">
          <div className=" font-semibold text-xs">Create your DODOpage now</div>
            <div className="bg-[#7A208D] rounded-full p-1 text-white w-fit">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default DodoPageDashboard;
