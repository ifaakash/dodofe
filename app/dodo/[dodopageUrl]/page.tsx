"use client";
import DodoPageHeader from "@components/molecules/dodoPage/DodoPageHeader";
import HeroSection from "@components/molecules/dodoPage/HeroSection";
import SocialLinks from "@components/molecules/dodoPage/SocialLinks";
import React from "react";
import styles from "./mainPage.module.css";
import { useParams, useSearchParams } from "next/navigation";
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PublishedModal from "./PublishedModal";
import BlockTemplates from "@components/molecules/dodoPage/blockTemplates/BlockTemplates";

const DodoPageDashboard = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const mode = searchParams.get("mode") || "edit";
    const { dodopageUrl } = useParams();
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
    const [dodoPageDetails, setDodoPageDetails] = useState({} as any);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [activeId, setActiveId] = useState(null);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [isPublishedModalOpened, setIsPublishedModalOpened] = useState(false);

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
    const dodoPageFromStore = useSelector(
        (state: RootState & { dodoPage: any }) => state.dodoPage
    );
    const blockState = useSelector((state: any) => state.blocks);

    const existingBlocks = useSelector((state: any) => state.blocks.blocks);

    // this useeffect ensures that the data is fetched from the server and the store is updated
    // and if there is data in the store then api is not called
    useEffect(() => {
        // Use a ref to track if we've already loaded data
        const shouldFetchData =
            (dodoPageFromStore.dodoPageName === null ||
                existingBlocks.length === 0) &&
            !isLoading;

        if (shouldFetchData) {
            setIsLoading(true);
            getDodoPageByURL(dodopageUrl)
                .then((res) => {
                    if (!res?.dodoPage) return; // Add error handling
                    const reversedBlocks = res.dodoPage.blocks.reverse();

                    // Batch the state updates
                    setDodoPageDetails(res.dodoPage);
                    setBlocks(reversedBlocks || []);

                    // Batch the dispatch actions
                    dispatch(addBlocksToStore(reversedBlocks || []));
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
                .catch((error) => {
                    console.error("Error fetching dodo page:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else if (
            !shouldFetchData &&
            dodoPageFromStore.dodoPageName !== null
        ) {
            // Only update local state from store if we're not fetching and have data in store
            setDodoPageDetails((prevDetails) => {
                // Only update if needed
                if (
                    prevDetails.id !== dodoPageFromStore.dodoPageId ||
                    prevDetails.name !== dodoPageFromStore.dodoPageName
                ) {
                    return {
                        id: dodoPageFromStore.dodoPageId,
                        profilePicture: dodoPageFromStore.dodoPageImage,
                        name: dodoPageFromStore.dodoPageName,
                        thoughts: dodoPageFromStore.dodoPageThought,
                        socialLinks: dodoPageFromStore.socialLinks,
                        audioBio: dodoPageFromStore.audioBio,
                    };
                }
                return prevDetails;
            });

            // Only update blocks if they've changed
            if (blocks.length !== existingBlocks.length) {
                setBlocks(existingBlocks);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dodopageUrl]);

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

            // Move in reversed array (as user sees it)
            const reorderedBlocks = arrayMove(blocks, oldIndex, newIndex);

            // Reverse back to save in DB in original order
            const updatedBlocks = [...reorderedBlocks].reverse().map((block, index) => ({
                ...block,
                blockPositionalIndex: index,
            }));

            // Update local state in UI (still reversed)
            setBlocks(reorderedBlocks);

            const formattedBlocks = {
                dodoPageId: dodoPageDetails.id,
                blocks: updatedBlocks
                    .filter((block) => block.id !== undefined)
                    .map((block) => ({
                        blockId: block.id as string,
                        newIndex: block.blockPositionalIndex,
                    })),
            };

            try {
                dispatch(reorderBlocks(formattedBlocks));
            } catch (error) {
                console.error("Error reordering blocks:", error);
            }
        }
    };

    const groupBlocks = (blocks: Block[]) => {
        const grouped: (Block | Block[])[] = [];

        for (let i = 0; i < blocks.length; i++) {
            const curr = blocks[i];
            const next = blocks[i + 1];

            if (
                curr.blockType === "PRODUCT" &&
                next?.blockType === "PRODUCT"
            ) {
                grouped.push([curr, next]);
                i++; // skip next
            } else {
                grouped.push(curr);
            }
        }

        return grouped;
    };


    const renderBlock = (block: Block, index: number, isGroupBlocks: boolean = false) => {
        if (block.toRemove) {
            return null;
        }

        const handleNavigate = (block: Block) => {
            // if (block.isNew) {
            //     toast.info(
            //         "Please publish your Dodo Page to update this block"
            //     );

            //     return null;
            // } else {
            router.push(`/dodo/${url}/editBlock/${block.id}`);
        };

        const icon = block?.isNew || block?.isUpdated ? "⏳" : "";

        let content;
        switch (block.blockType) {
            case "LINK":
                content =
                    mode === "edit" ? (
                        <div key={block.id} onClick={() => handleNavigate(block)}>
                            <LinkBlock mode={mode} block={block} />
                        </div>
                    ) : (
                        <LinkBlock key={block.id} mode={mode} block={block} />
                    );
                break;
            case "POLL":
                content =
                    mode === "edit" ? (
                        <Link key={block.id} href={`/dodo/${url}/editBlock/${block.id}`}>
                            <PollBlock
                                mode={mode}
                                blockData={block.blockData}
                                id={block.id as string}
                            />
                        </Link>
                    ) : (
                        <PollBlock
                            key={block.id}
                            mode={mode}
                            blockData={block.blockData}
                            id={block.id as string}
                        />
                    );
                break;
            case "HEADING":
                content =
                    mode === "edit" ? (
                        <div key={block.id} onClick={() => handleNavigate(block)}>
                            <HeadingBlock
                                title={block.blockData?.title}
                                mode={mode}
                                id={block.id as string}
                            />
                        </div>
                    ) : (
                        <HeadingBlock
                            key={block.id}
                            title={block.blockData?.title}
                            mode={mode}
                            id={block.id as string}
                        />
                    );
                break;
            case "SEPARATOR":
                content =
                    mode === "edit" ? (
                        <div key={block.id} onClick={() => handleNavigate(block)}>
                            <SeparatorBlock
                                type={block.blockData?.separatorType}
                                mode={mode}
                                id={block.id as string}
                            />
                        </div>
                    ) : (
                        <SeparatorBlock
                            key={block.id}
                            type={block.blockData?.separatorType}
                            mode={mode}
                            id={block.id as string}
                        />
                    );
                break;
            case "PRODUCT":
                console.log('block', block)
                content = (
                    <div key={block.id} className="w-full">
                        {mode === "edit" ? (
                            <div onClick={() => handleNavigate(block)}>
                                <ProductBlock block={block} mode={mode} />
                            </div>
                        ) : (
                            <ProductBlock block={block} mode={mode} />
                        )}
                    </div>
                );
                break;
            default:
                return null;
        }

        return (
            <div style={{ position: "relative" }} key={block.id}>
                <div style={{ position: "absolute", top: '10px', right: isGroupBlocks ? '50%' : '10px', zIndex: 1 }}>
                    {icon}
                </div>
                {content}
            </div>
        );
    };

    return (
        <div
            className={`${styles.bgGrid} ${styles.scrollableContainer}}`}
        >
            {isOpened && <div
                className="absolute inset-0"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)", // For Safari support
                    zIndex: 9,
                }}
            />}

            <div className={`flex flex-col gap-3`}>
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


                <div className="flex flex-col gap-4 mb-24 min-h-[50vh]">
                    {/* {mode !== "preview" && <ArchiveTab />} */}

                    {blocks.length === 0 && mode === "edit" ? (
                        <BlockTemplates dodoPageUrl={url}/>
                    ) : (
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
                                    {groupBlocks(blocks).map((item, index) => {
                                        if (Array.isArray(item)) {
                                            return (
                                                <div key={`group-${index}`} className="flex flex-row gap-3">
                                                    {item.map((block) => (
                                                        <div className="flex-1" key={block.id}>
                                                            {renderBlock(block, index, true)}
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        } else {
                                            return renderBlock(item, index);
                                        }
                                    })}
                                </SortableContext>
                                <DragOverlay>
                                    {activeId
                                        ? renderBlock(
                                            blocks.find(
                                                (block) => block.id === activeId
                                            ),
                                            0
                                        )
                                        : null}
                                </DragOverlay>
                            </DndContext>
                        </div>
                    )}
                </div>

                {mode === "edit" && (
                    <div
                        className={`bottom-0 fixed w-full p-4 z-10`}
                    >
                        <FooterBar
                            mode={mode}
                            url={url}
                            dodoPageId={dodoPageDetails?.id}
                            isOpened={isOpened}
                            setIsOpened={setIsOpened}
                            setIsPublishedModalOpened={setIsPublishedModalOpened}
                        />
                    </div>
                )}

                {mode === "preview" && (
                    <div className="flex flex-col gap-3 px-5 items-center pb-20">
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

                <PublishedModal isOpened={isPublishedModalOpened} setIsOpened={setIsPublishedModalOpened} url={url} />
            </div>
        </div>
    );
};

export default React.memo(DodoPageDashboard);
