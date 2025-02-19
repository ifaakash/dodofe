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
import LinkBlock from "@components/molecules/dodoPage/blocks/LinkBlock";
import SortableBlock from "@components/molecules/dodoPage/SortableBlock";
const ArchivedBlocks = () => {
  const { dodopageUrl } = useParams();
  const [archivedBlocks, setArchivedBlocks] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchArchivedBlocks = async () => {
      const res = await getArchivedBlocks(dodopageUrl);

      console.log("res", res);
      if (res.success) {
        setArchivedBlocks(res.archivedBlocks);
      }
    };
    fetchArchivedBlocks();
  }, []);

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
        content = <HeadingBlock title={block.blockData.title} mode="edit" />;
        break;
      case "PRODUCTS":
        content = (
          <div className="flex gap-[10px]">
            <ProductBlock productData={block.blockData} mode="edit" />
            <ProductBlock productData={block.blockData} mode="edit" />
          </div>
        );
        break;
      case "SEPARATOR":
        content = (
          <SeparatorBlock type={block.blockData.separatorType} mode="edit" />
        );
        break;
      case "LINK":
        content = (
          <LinkBlock
            blockData={block.blockData}
            mode="edit"
            blockCardSize={block?.blockData?.blockCardSize}
          />
        );
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
          archivedBlocks.map((block) => (
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
