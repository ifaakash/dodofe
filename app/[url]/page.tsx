"use client";
// this is the public page for the dodo page
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getDodoPageByURL } from "api";
import HeroSection from "@components/molecules/dodoPage/HeroSection";
import SocialLinks from "@components/molecules/dodoPage/SocialLinks";
import ProductBlock from "@components/molecules/dodoPage/blocks/ProductBlock";
import HeadingBlock from "@components/molecules/dodoPage/blocks/HeadingBlock";
import SeparatorBlock from "@components/molecules/dodoPage/blocks/SeparatorBlock";
import PollBlock from "@components/molecules/dodoPage/blocks/PollBlock";
import DodoIcon from "public/icons/dodoIconName.svg";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./dodoPage.module.css";
import LinkBlock from "@components/molecules/dodoPage/blocks/LinkBlock";
import Link from "next/link";
import { useDodoPageAnalytics } from "hooks/useDodoPageAnalytics";
import { Block } from "types";
import MetaData from "@components/molecules/MetaData";

const DodoPage = () => {
    const { url } = useParams();
    const [dodoPageDetails, setDodoPageDetails] = useState<any>(null);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [mode] = useState("public");
    const hasFetchedRef = useRef(false);
    const hasRecordedViewRef = useRef(false);

    // Add analytics hook
    const { trackBlockInteraction, recordPageView } = useDodoPageAnalytics(
        dodoPageDetails?.id
    );

    useEffect(() => {
        if (url && !hasFetchedRef.current) {
            hasFetchedRef.current = true;
            getDodoPageByURL(url as string).then((res) => {
                if (res.success) {
                    const reversedBlocks = res.dodoPage.blocks.reverse();

                    setDodoPageDetails(res.dodoPage);
                    setBlocks(reversedBlocks || []);

                    // Record page view immediately after getting dodo page details
                    if (!hasRecordedViewRef.current) {
                        hasRecordedViewRef.current = true;
                        recordPageView(res.dodoPage.id);
                    }
                }
            });
        }
    }, [url, recordPageView]);

    // Track block interactions
    const handleBlockInteraction = (
        blockId: string,
        interactionType: "click" | "view" | "scroll"
    ) => {
        if (dodoPageDetails?.id) {
            trackBlockInteraction(blockId, interactionType);
        }
    };

    const renderBlock = (block: any, index: number) => {
        let content;
        switch (block.blockType) {
            case "LINK":
                content = (
                    <a
                        href={block.blockData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            handleBlockInteraction(block.id, "click");
                            // Prevent default to ensure analytics is recorded before navigation
                            e.preventDefault();
                            // Navigate after a small delay to ensure analytics is sent
                            setTimeout(() => {
                                window.open(block.blockData.url, "_blank");
                            }, 100);
                        }}
                    >
                        <LinkBlock key={block.id} mode={mode} block={block} />
                    </a>
                );
                break;
            case "POLL":
                content = (
                    <PollBlock
                        mode={mode}
                        blockData={{
                            ...block.blockData,
                            blockId: block.id,
                            onVote: () =>
                                handleBlockInteraction(block.id, "click"),
                        }}
                        id={block.id}
                    />
                );
                break;
            case "HEADING":
                content = (
                    <HeadingBlock title={block.blockData.title} mode={mode} />
                );
                break;
            case "SEPARATOR":
                content = (
                    <SeparatorBlock
                        type={block.blockData.separatorType}
                        mode={mode}
                    />
                );
                break;
            case "PRODUCT":
                if (
                    index > 0 &&
                    blocks[index - 1]?.blockType === "PRODUCT"
                ) {
                    return null;
                }
                const nextBlock = blocks[index + 1];

                if (nextBlock?.blockType === "PRODUCT") {
                    content = (
                        <div className="grid grid-cols-2 gap-[10px] w-full">
                            <div
                                onClick={() =>
                                    handleBlockInteraction(block.id, "click")
                                }
                            >
                                <Link href={`${block.blockData.link}`}>
                                    <ProductBlock block={block} mode={mode} />
                                </Link>
                            </div>
                            <div
                                onClick={() =>
                                    handleBlockInteraction(
                                        nextBlock.id,
                                        "click"
                                    )
                                }
                            >
                                <Link href={`${nextBlock.blockData.link}`}>
                                    <ProductBlock
                                        block={nextBlock}
                                        mode={mode}
                                    />
                                </Link>
                            </div>
                        </div>
                    );
                } else {
                    content = (
                        <div
                            onClick={() =>
                                handleBlockInteraction(block.id, "click")
                            }
                        >
                            <Link href={`${block.blockData.link}`}>
                                <ProductBlock block={block} mode={mode} />
                            </Link>
                        </div>
                    );
                }
                break;
            default:
                return null;
        }

        return content;
    };

    return (
        <>
            <MetaData
                title={dodoPageDetails?.seoTitle || dodoPageDetails?.title || "DodoPage"}
                description={dodoPageDetails?.seoDescription || dodoPageDetails?.description || "Explore this DodoPage"}
                keywords={dodoPageDetails?.seoKeywords || "DodoPage, influencer tools"}
                url={`https://dodoclub.in/${url}`}
                image={dodoPageDetails?.seoImage || dodoPageDetails?.image}
            />
            <div className={`flex flex-col gap-3 pt-10 ${styles.dodoBackground}`}>
                <HeroSection
                    mode={"public"}
                    dodoPageId={dodoPageDetails?.id}
                    dodoPageDetails={dodoPageDetails}
                />
                <SocialLinks
                    socialLinks={dodoPageDetails?.socialLinks}
                    url={url as string}
                    mode={"public"}
                />
                <div className="flex flex-col gap-3 px-5">
                    {blocks?.map((block: any, index: number) =>
                        renderBlock(block, index)
                    )}
                </div>

                <div className="flex flex-col gap-3 px-5 items-center my-20">
                    <div className="flex items-center gap-2">
                        <div className="text-[#3D4966] text-xs">powered by:</div>
                        <Image src={DodoIcon} alt="dodo icon" height={20} />
                    </div>
                    <Link
                        href={`https://dodoclub.in/`}
                        target="_blank"
                        className="bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white rounded-full px-3 py-1 flex items-center gap-2"
                    >
                        <div className="font-semibold text-xs">
                            Create your DODOpage now
                        </div>
                        <div className="bg-[#7A208D] rounded-full p-1 text-white w-fit">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default DodoPage;