"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PollBlock from "@components/molecules/dodoPage/blocks/PollBlock";
import HeadingBlock from "@components/molecules/dodoPage/blocks/HeadingBlock";
import ProductBlock from "@components/molecules/dodoPage/blocks/ProductBlock";
import SeparatorBlock from "@components/molecules/dodoPage/blocks/SeparatorBlock";
import { getArchivedBlocks, reorderBlocks } from "api/services";
import { SortableBlock } from "@components/molecules/dodoPage/SortableBlock";
import LinkBlock from "@components/molecules/dodoPage/blocks/LinkBlock";
import { useSelector } from "react-redux";

const ArchivedBlocks = () => {
  const { dodopageUrl } = useParams();
  const [isDragging, setIsDragging] = useState(false);
  const blocks = useSelector((state: any) => state.blocks.blocks);
  const archivedBlocks = useSelector((state: any) => state.blocks.blocks.filter((block: any) => block.toArchive && block.isActive));



  const renderBlock = (block: {
    id: string;
    blockType: string;
    blockData: any;
  }) => {
    let content;
    switch (block.blockType) {
      case "POLL":
        content = <PollBlock mode="edit" blockData={block.blockData} />;
        break;
      case "HEADING":
        content = (
          <HeadingBlock title={block.blockData.title} mode="edit" />
        );
        break;
      case "PRODUCTS":
        content = (
          <div className="flex gap-[10px]">
            <ProductBlock block={block} mode="edit" />
            <ProductBlock block={block} mode="edit" />
          </div>
        );
        break;
      case "SEPARATOR":
        content = (
          <SeparatorBlock
            type={block.blockData.separatorType}
            mode="edit"
          />
        );
        break;
      case "LINK":
        content = <LinkBlock block={block} mode="edit" />;
        break;
      default:
        return null;
    }

    return (
      <SortableBlock key={block.id} id={block.id}>
        <Link
          href={`/dodo/${dodopageUrl}/editBlock/${block.id}`}
          onClick={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
          }}
        >
          {content}
        </Link>
      </SortableBlock>
    );
  };

  return (
    <div className="px-5 py-4 flex flex-col gap-4">
      <div className="flex gap-2 items-center font-semibold">
        <Link href={`/dodo/${dodopageUrl}`}>
          <ArrowLeft size={20} />
        </Link>
        <span> Archived </span>
      </div>
      <div>
        {archivedBlocks.length === 0 ? (
          <div>No archived blocks</div>
        ) : (
          // to be fixed
          archivedBlocks.map((block: any) => (
            <div key={block.id} className="mt-4">
              {renderBlock(block)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArchivedBlocks;
