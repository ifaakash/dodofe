"use client";
import React, { useState } from "react";
import DragIcon from "public/icons/drag.svg";
import Image from "next/image";
import PollVertical from "public/icons/pollVertical.svg";
import { addVoteToPoll } from "api/services";
import { useSortable } from "@dnd-kit/sortable";

const PollBlock = ({
    mode = "public",
    blockData,
    id,
}: {
    mode: string;
    blockData: any;
    id?: string;
}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [hasVoted, setHasVoted] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const voteData = localStorage.getItem(`poll_${blockData?.blockId}`);
            if (voteData) {
                const { expiry } = JSON.parse(voteData);
                if (expiry > Date.now()) {
                    return true;
                } else {
                    localStorage.removeItem(`poll_${blockData?.blockId}`);
                }
            }
        }
        return false;
    });

    const handleOptionClick = (option: string) => {
        if (hasVoted) return;
        if (blockData?.isMultipleOptionsAllowed) {
            setSelectedOptions((prev) =>
                prev.includes(option)
                    ? prev.filter((item) => item !== option)
                    : [...prev, option]
            );
        } else {
            setSelectedOptions([option]);
        }
    };

    const handleVote = async () => {
        const payload = {
            blockId: blockData?.blockId,
            options: selectedOptions,
        };
        const res = await addVoteToPoll(payload);
        if (res.success) {
            // Save vote to localStorage with 1-hour expiration
            const voteData = {
                voted: true,
                expiry: Date.now() + 60 * 60 * 1000, // 1 hour from now
            };
            localStorage.setItem(
                `poll_${blockData?.blockId}`,
                JSON.stringify(voteData)
            );
            setHasVoted(true);
            // Call the onVote callback if provided
            if (blockData?.onVote) {
                blockData.onVote();
            }
        }
    };

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: id || "" });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition,
    };

    const getOptionColor = (index: number) => {
        const colors = ["#FB7053", "#F1C400", "#42ADD9", "#967BDD"];
        return colors[index] || "#EAE9EC";
    };

    return (
        <div
            id="poll-1"
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`p-2 bg-white rounded-xl flex flex-col gap-2 ${
                mode === "edit" ? "cursor-grab" : ""
            }`}
        >
            <div className="flex items-start gap-1">
                {mode === "edit" && (
                    <Image src={DragIcon} {...listeners} alt="drag" />
                )}
                <Image src={PollVertical} alt="poll" />
                <div className="font-semibold text-[#3D4966]">
                    {blockData?.question}
                </div>
            </div>
            <div className="text-[10px] text-[#3D4966]">
                {blockData?.isMultipleOptionsAllowed
                    ? "Select one or more"
                    : "Select one"}
            </div>
            <div className="flex flex-col gap-1">
                {blockData?.options?.map((option: any, index: number) => {
                    const isSelected = selectedOptions.includes(option);
                    return (
                        <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`py-3 px-4 rounded-[10px] flex gap-[6px] items-center cursor-pointer transition-colors duration-200 `}
                            style={{
                                backgroundColor: isSelected
                                    ? `${getOptionColor(index)}50`
                                    : "#EAE9EC",
                            }}
                        >
                            <input
                                type={
                                    blockData?.isMultipleOptionsAllowed
                                        ? "checkbox"
                                        : "radio"
                                }
                                name="poll-options"
                                checked={isSelected}
                                onChange={() => handleOptionClick(option)}
                                disabled={hasVoted}
                            />
                            <div className="text-[#3D4966] text-xs font-medium">
                                {option}
                            </div>
                        </div>
                    );
                })}
                {mode === "public" && !hasVoted && (
                    <button
                        className="bg-[#3D4966] text-white py-2 px-4 rounded-[10px]"
                        onClick={handleVote}
                    >
                        Vote
                    </button>
                )}
                {mode === "public" && hasVoted && (
                    <div className="text-[#3D4966] text-xs">
                        You have already voted in this poll
                    </div>
                )}
            </div>
        </div>
    );
};

export default PollBlock;
