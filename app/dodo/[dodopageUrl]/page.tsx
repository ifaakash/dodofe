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
import { addBlocksToStore } from "store/slice/blocksSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
// import { reorderBlocks } from "api";
import { reorderBlocks } from "store/slice/blocksSlice";
import { dodoStoreInitialisation } from "store/slice/dodoPageSlice";

const DodoPageDashboard = () => {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") || "edit";
    const { dodopageUrl } = useParams();
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
    const [dodoPageDetails, setDodoPageDetails] = useState({} as any);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [activeId, setActiveId] = useState(null);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

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
    const dodoPageFromStore = useSelector((state: RootState & { dodoPage: any }) => state.dodoPage);
    const existingBlocks = useSelector(
        (state: any) => state.blocks.blocks
    );

    useEffect(() => {
        const shouldFetchData =
            !dodoPageFromStore.dodoPageName || existingBlocks.length === 0;

        if (shouldFetchData && !isLoading) {
            setIsLoading(true);
            getDodoPageByURL(dodopageUrl)
                .then((res) => {
                    if (!res?.dodoPage) return; // Add error handling

                    // Batch the state updates
                    setDodoPageDetails(res.dodoPage);
                    setBlocks(res.dodoPage.blocks || []);

                    // Batch the dispatch actions
                    dispatch(addBlocksToStore(res.dodoPage.blocks || []));
                    dispatch(
                        dodoStoreInitialisation({
                            dodoPageId: res.dodoPage.id,
                            dodoPageImage: res.dodoPage.profilePicture,
                            dodoPageName: res.dodoPage.name,
                            dodoPageThought: res.dodoPage.thoughts,
                            socialLinks: res.dodoPage.socialLinks,
                            audioBio: res.dodoPage.audioBio,
                        })
                    );
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            // Only update if the values have changed
            setDodoPageDetails((prevDetails: any) => {
                const newDetails = {
                    id: dodoPageFromStore.dodoPageId,
                    profilePicture: dodoPageFromStore.dodoPageImage,
                    name: dodoPageFromStore.dodoPageName,
                    thoughts: dodoPageFromStore.dodoPageThought,
                    socialLinks: dodoPageFromStore.socialLinks,
                    audioBio: dodoPageFromStore.audioBio,
                };
                return JSON.stringify(prevDetails) ===
                    JSON.stringify(newDetails)
                    ? prevDetails
                    : newDetails;
            });

            setBlocks((prevBlocks) =>
                JSON.stringify(prevBlocks) === JSON.stringify(existingBlocks)
                    ? prevBlocks
                    : existingBlocks
            );
        }
    }, [dodopageUrl, existingBlocks]); // Remove other dependencies that cause unnecessary rerenders

    const url = Array.isArray(dodopageUrl) ? dodopageUrl[0] : dodopageUrl;

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event: any) => {
        setActiveId(null);
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = blocks.findIndex((item) => item.id === active.id);
            const newIndex = blocks.findIndex((item) => item.id === over.id);

            const updatedBlocks = arrayMove(blocks, oldIndex, newIndex).map(
                (block, index) => ({
                    ...block,
                    blockPositionalIndex: index,
                })
            );

            const formattedBlocks = {
                dodoPageId: dodoPageDetails.id,
                blocks: updatedBlocks
                    .filter((block) => block.id !== undefined)
                    .map((block, index) => ({
                        blockId: block.id as string,
                        newIndex: index,
                    })),
            };

            try {
                dispatch(reorderBlocks(formattedBlocks));
            } catch (error) {
                console.error("Error reordering blocks:", error);
            }
        }
    };

    const renderBlock = (block: Block, index: number) => {
        if (block.toRemove) {
            return null;
        }

        let content;
        switch (block.blockType) {
            case "LINK":
                content =
                    mode === "edit" ? (
                        <Link href={`/dodo/${url}/editBlock/${block.id}`}>
                            <LinkBlock mode={mode} block={block} />
                        </Link>
                    ) : (
                        <LinkBlock mode={mode} block={block} />
                    );
                break;
            case "POLL":
                content =
                    mode === "edit" ? (
                        <Link href={`/dodo/${url}/editBlock/${block.id}`}>
                            <PollBlock
                                mode={mode}
                                blockData={block.blockData}
                                id={block.id as string}
                            />
                        </Link>
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
                        <Link href={`/dodo/${url}/editBlock/${block.id}`}>
                            <HeadingBlock
                                title={block.blockData?.title}
                                mode={mode}
                                id={block.id as string}
                            />
                        </Link>
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
                        <Link href={`/dodo/${url}/editBlock/${block.id}`}>
                            <SeparatorBlock
                                type={block.blockData?.separatorType}
                                mode={mode}
                                id={block.id as string}
                            />
                        </Link>
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
                            <Link href={`/dodo/${url}/editBlock/${block.id}`}>
                                <ProductBlock block={block} mode={mode} />
                            </Link>
                        ) : (
                            <ProductBlock block={block} mode={mode} />
                        )}
                    </div>
                );
                break;
            default:
                return null;
        }
        return content;
    };

    console.log('blocks', blocks)

    return (
        <div
            className={`${styles.dodoBackground} ${styles.scrollableContainer}`}
        >
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
                                items={blocks
                                    .map((block) => block.id)
                                    .filter(
                                        (id): id is string => id !== undefined
                                    )}
                                strategy={verticalListSortingStrategy}
                            >
                                {blocks.map((block, index) =>
                                    renderBlock(block, index)
                                )}
                            </SortableContext>
                            <DragOverlay>
                                {activeId ? (
                                    <div
                                        style={{
                                            backgroundColor: "white",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            boxShadow:
                                                "0 2px 5px rgba(0, 0, 0, 0.1)",
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
                        dodoPageId={dodoPageDetails?.id}
                    />
                </div>
            )}

            {mode === "preview" && (
                <div className="flex flex-col gap-3 px-5 items-center mb-20">
                    <div className="flex items-center gap-2">
                        <div className="text-[#3D4966] text-xs">
                            powered by:
                        </div>
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
