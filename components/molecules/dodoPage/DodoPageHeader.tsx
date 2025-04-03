import Button from "@components/atoms/Button";
import { ArrowLeft, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import EyeIcon from "../../../public/icons/greenEye.svg";
import PenIcon from "../../../public/icons/EditPen.svg";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { resetDodoPage } from "store/slice/dodoPageSlice";
import { resetUnpublishedBlocks } from "store/slice/blocksSlice";
import { handleNativeBackButton, isWebview } from "@utils/index";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@utils/constants";
import Modal from "@components/molecules/Modal";

const DodoPageHeader = ({ mode, url }: { mode: string; url: string }) => {
    const router = useRouter();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { unsavedChanges } = useSelector(
        (state: any) => state.dodoPage
    );
    const { unpublishedBlocks } = useSelector(
        (state: any) => state.blocks
    );
    const dispatch = useDispatch();

    const handleDiscardChanges = () => {
        // dispatch(resetDodoPage());
        // dispatch(resetUnpublishedBlocks());
        localStorage.removeItem("persist:root") // clear redux store
        window.location.href = `/dodo/${url}`;
    };

    const handleBack = (event: MessageEvent) => handleNativeBackButton(event, () => router.push(ROUTE_CONSTANTS.HOME));

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
                <div className="py-3 pr-2" onClick={() => router.push(ROUTE_CONSTANTS.HOME)}>
                    <ArrowLeft size={22} />
                </div>
                <div>
                    <div>
                        {(unsavedChanges || (unpublishedBlocks && mode === "edit")) && (
                            <div style={{ border: '2px solid var(--red)' }}
                                className="px-2 py-1 rounded-3xl">
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="text-xs font-semibold flex items-center gap-1 text-red-500"
                                >
                                    Discard <X size={16} />{" "}
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

            <Modal showCloseIcon showOuterCloseIcon visible={showDeleteConfirm} onCloseIconClick={() => setShowDeleteConfirm(false)}>
                <div className="rounded-lg shadow-lg text-center">
                    <p className="text-xl mt-2 mb-4 text-left font-bold clr-dark-text">Are you sure you want to discard your block changes? </p>

                    <div className="flex justify-center gap-2 w-full my-4 mt-6">
                        <button className="w-full rounded-full border-[1px] border-red-500 text-sm font-medium" onClick={handleDiscardChanges}>
                            Discard
                        </button>
                        <button className="w-full rounded-full py-3 border-[1px] border-brandPrimary bg-brandPrimary text-white" onClick={() => setShowDeleteConfirm(false)}> Cancel </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default DodoPageHeader;
