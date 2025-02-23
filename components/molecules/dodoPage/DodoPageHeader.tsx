import Button from "@components/atoms/Button";
import { ArrowLeft, X } from "lucide-react";
import React from "react";
import EyeIcon from "../../../public/icons/greenEye.svg";
import PenIcon from "../../../public/icons/EditPen.svg";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { resetDodoPage } from "store/slice/dodoPageSlice";
import { toast } from "react-toastify";
import { resetUnPublishedBlocks } from "store/slice/blocksSlice";

const DodoPageHeader = ({ mode, url }: { mode: string; url: string }) => {
    const { unsavedChanges } = useSelector(
        (state: any) => state.dodoPage
    );
    const { unPublishedBlocks } = useSelector(
        (state: any) => state.blocks
    );
    const dispatch = useDispatch();

    const handleDiscardChanges = () => {
        dispatch(resetDodoPage());
        dispatch(resetUnPublishedBlocks());
        window.location.href = `/dodo/${url}`;
    };

    return (
        <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Link href="/">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <div>
                        {unsavedChanges ||
                            (unPublishedBlocks && mode === "edit" && (
                                <div>
                                    <button
                                        onClick={handleDiscardChanges}
                                        className="text-xs font-semibold flex items-center gap-1 text-red-500"
                                    >
                                        Discard Chanegs <X size={16} />{" "}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div>
                {mode === "edit" ? (
                    <Link href={`/dodo/${url}?mode=preview`}>
                        <div className="flex items-center py-2 px-3 rounded-md bg-white gap-1">
                            <div className="text-[#3D4966] text-xs font-semibold ">
                                Preview
                            </div>
                            <Image
                                src={EyeIcon}
                                alt="pen"
                                width={16}
                                height={16}
                            />
                        </div>
                    </Link>
                ) : (
                    <Link href={`/dodo/${url}`}>
                        <div className="flex items-center py-2 px-3 rounded-md bg-white gap-1">
                            <div className="text-[#3D4966] text-xs font-semibold ">
                                Edit
                            </div>
                            <Image
                                src={PenIcon}
                                alt="pen"
                                width={16}
                                height={16}
                            />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default DodoPageHeader;
