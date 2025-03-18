import Button from "@components/atoms/Button";
import { ArrowLeft, X } from "lucide-react";
import React, { useEffect } from "react";
import EyeIcon from "../../../public/icons/greenEye.svg";
import PenIcon from "../../../public/icons/EditPen.svg";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { resetDodoPage } from "store/slice/dodoPageSlice";
import { resetUnpublishedBlocks } from "store/slice/blocksSlice";
import router from "next/router";
import { handleNativeBackButton, isWebview } from "@utils/index";

const DodoPageHeader = ({ mode, url }: { mode: string; url: string }) => {
    const { unsavedChanges } = useSelector(
        (state: any) => state.dodoPage
    );
    const { unpublishedBlocks } = useSelector(
        (state: any) => state.blocks
    );
    const dispatch = useDispatch();

    const handleDiscardChanges = () => {
        dispatch(resetDodoPage());
        dispatch(resetUnpublishedBlocks());
        window.location.href = `/dodo/${url}`;
    };

    const handleBack = (event: MessageEvent) => handleNativeBackButton(event, () => router.back());

    useEffect(() => {
        if (isWebview()) {
            document.addEventListener("message", handleBack);
        }

        return () => {
            if (isWebview()) {
                document.removeEventListener("message", handleBack);
            }
        };
    }, [router]);

    return (
        <div className="px-5 py-4 mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="py-3 pr-2" onClick={() => router.back()}>
                    <ArrowLeft size={22} />
                </div>
                <div>
                    <div>
                        {(unsavedChanges || (unpublishedBlocks && mode === "edit")) && (
                            <div>
                                <button
                                    onClick={handleDiscardChanges}
                                    className="text-xs font-semibold flex items-center gap-1 text-red-500"
                                >
                                    Discard Changes <X size={16} />{" "}
                                </button>
                            </div>
                        )}
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
