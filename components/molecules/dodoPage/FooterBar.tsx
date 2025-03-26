"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import LinkIcon from "public/icons/Link.svg";
import Poll from "public/icons/Poll.svg";
import Seperator from "public/icons/Separator.svg";
import Social from "public/icons/Social.svg";
import Product from "public/icons/Product.svg";
import Heading from "public/icons/Heading.svg";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { removeIsNewFromBlocks, resetUnpublishedBlocks, removeIsUpdatedFromBlocks, removeToRemoveFromBlocks } from "store/slice/blocksSlice";
import {
  createBlock,
  createBlockWithMedia,
  deleteBlock,
  reorderBlocks,
  updateBlock,
  updateBlocksByPageId,
  updateBlockWithMedia,
  updateDodoPage,
} from "api/services";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetDodoPage } from "store/slice/dodoPageSlice";
import { useParams, useRouter } from "next/navigation";
import { Block } from "types";
import confetti from 'canvas-confetti'

const BlockModal = ({ isOpen }: { isOpen: boolean }) => {
  const { dodopageUrl } = useParams();
  const Blocks = [
    {
      title: "Link",
      icon: LinkIcon,
      link: `/dodo/${dodopageUrl}/addBlock?type=link`,
    },
    {
      title: "Poll",
      icon: Poll,
      link: `/dodo/${dodopageUrl}/addBlock?type=poll`,
    },
    {
      title: "Seperator",
      icon: Seperator,
      link: `/dodo/${dodopageUrl}/addBlock?type=separator`,
    },
    {
      title: "Social",
      icon: Social,
      link: `/dodo/${dodopageUrl}/addBlock?type=social`,
    },
    {
      title: "Product",
      icon: Product,
      link: `/dodo/${dodopageUrl}/addBlock?type=product`,
    },
    {
      title: "Heading",
      icon: Heading,
      link: `/dodo/${dodopageUrl}/addBlock?type=heading`,
    },
  ];

  return (
    <div
      className={`relative mb-4 bg-white p-4 rounded-[10px] transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-0 opacity-0 hidden'
        }`}
    >
      <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
      <div className="grid grid-cols-3 gap-2">
        {Blocks.map((block, index) => {
          return (
            <Link
              href={block.link}
              key={index}
              className="flex items-center gap-2 p-2 bg-[#EAE9EC] cursor-pointer flex-col py-[14px] px-5 rounded-xl"
            >
              <Image src={block.icon} alt={block.title} />
              <span className="text-sm font-medium text-[#3D4966]">
                {block.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const FooterBar = ({
  mode,
  url,
  dodoPageId,
  isOpened,
  setIsOpened,
  setIsPublishedModalOpened
}: {
  mode: string;
  url: string;
  dodoPageId: string;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  setIsPublishedModalOpened: (isPublishedModalOpened: boolean) => void;
}) => {
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
  const {
    dodoPageName,
    dodoPageThought,
    dodoPageImage,
    socialLinks,
    unsavedChanges,
    audioBio,
  } = useSelector((state: any) => state.dodoPage);
  const dispatch = useDispatch();
  const router = useRouter();
  const blockState = useSelector((state: any) => state.blocks);
  const dodoPageState = useSelector((state: any) => state.dodoPage);
  const { unpublishedBlocks } = blockState;
  const enablePublish = unpublishedBlocks || unsavedChanges;

  const handlePublish = async () => {

    try {
      if (blockState.newBlocksAdded) {
        const newBlocks = blockState.blocks.filter((block) => block.isNew);

        for (const block of newBlocks) {
          try {
            switch (block.blockType) {
              case "LINK":
                const formData = new FormData();
                formData.append("dodoPageId", dodoPageId);
                formData.append("blockType", "LINK");
                formData.append("blockCardSize", block.blockCardSize);
                formData.append("userId", userId);
                formData.append("blockData[title]", block.blockData.title);
                formData.append("blockData[url]", block.blockData.url);
                if (block.blockData.linkDisplayPicture) {
                  console.log('Link Image', block.blockData.linkDisplayPicture)
                  formData.append(
                    "linkDisplayPicture",
                    block.blockData.linkDisplayPicture
                  );
                }
                if (block.blockData.badge?.text) {
                  formData.append(
                    "blockData[badge][text]",
                    block.blockData.badge.text
                  );
                  formData.append(
                    "blockData[badge][backgroundColor]",
                    block.blockData.badge.backgroundColor
                  );
                  formData.append(
                    "blockData[badge][color]",
                    block.blockData.badge.color
                  );
                }

                const createLink = await createBlockWithMedia(formData);
                console.log("createLink", createLink);

                break;

              case "PRODUCT":
                const formDataProduct = new FormData();
                formDataProduct.append(
                  "productImage",
                  block.blockData.productImage
                );
                formDataProduct.append(
                  "blockData[title]",
                  block.blockData.title
                );
                formDataProduct.append("blockData[link]", block.blockData.link);
                formDataProduct.append("dodoPageId", dodoPageId);
                formDataProduct.append("blockType", "PRODUCT");
                formDataProduct.append("blockCardSize", block.blockCardSize);
                formDataProduct.append("userId", userId);

                const createProduct = await createBlockWithMedia(
                  formDataProduct
                );
                console.log("createProduct", createProduct);

                break;

              default:
                const createNewBlock = await createBlock(block);
                console.log("createNewBlock", createNewBlock);

                break;
            }
          } catch (error) {
            console.error("Error creating block:", error);
            return false; // Return false if any block creation fails
          }
        }
      }

      if (blockState.isReordered) {

        await reorderBlocks({
          dodoPageId: dodoPageId,
          blocks: blockState.blocks.map((block) => ({
            blockId: block.id as string,
            newIndex: block.blockPositionalIndex as number,
          })),
        });

      }

      if (blockState.blocksToBeDeleted) {
        const blocksToBeDeleted = blockState.blocks.filter(
          (block) => block.toRemove
        );

        for (const block of blocksToBeDeleted) {
          await deleteBlock({ blockId: block.id as string, userId: userId });
        }
      }

      if (dodoPageState.unsavedChanges) {
        const formData = new FormData();
        formData.append("id", dodoPageId);
        formData.append("userId", userId);
        formData.append("name", dodoPageName);
        formData.append("thoughts", dodoPageThought);

        if (dodoPageState.isSocialLinksChanged) {
          console.log("Social Links", dodoPageState.socialLinks);
          Object.entries(dodoPageState.socialLinks).forEach(([platform, url]) => {
            formData.append(`socialLinks[${platform}]`, url as string);
          });

        }

        if (dodoPageState.isImageChanged) {
          console.log("Img");
          formData.append("profilePicture", dodoPageImage);
        }

        if (dodoPageState.isAudioBioChanged) {
          console.log("Audio");
          formData.append("audioBio", audioBio);
        }

        const DodoPageRes = await updateDodoPage(formData);
      }

      if (blockState.blocksToBeUpdated) {
        const updatedBlocks = blockState?.blocks?.filter(
          (block: Block) => block?.isUpdated
        );

        updatedBlocks.forEach(async (block: Block) => {
          try {
            switch (block.blockType) {
              case "HEADING":

                const headingRes = await updateBlock({
                  blockId: block.id,
                  userId: userId,
                  dodopageUrl: url,
                  blockData: {
                    title: block.blockData.title,
                  },
                });

                break;

              case "PRODUCT":
                const formDataProduct = new FormData();
                formDataProduct.append(
                  "productImage",
                  block.blockData.productImage
                );
                formDataProduct.append(
                  "blockData[title]",
                  block.blockData.title
                );
                formDataProduct.append("blockData[link]", block.blockData.link);
                formDataProduct.append("blockId", block.id);
                formDataProduct.append("userId", userId);
                formDataProduct.append("dodopageUrl", url);
                formDataProduct.append("blockCardSize", block.blockCardSize);

                const productRes = await updateBlockWithMedia(formDataProduct);
                console.log("productRes", productRes);

                break;

              case "LINK":
                const formDataLink = new FormData();
                formDataLink.append("blockId", block.id);
                formDataLink.append("userId", userId);
                formDataLink.append("dodopageUrl", url);
                formDataLink.append("blockCardSize", block.blockCardSize);

                formDataLink.append("blockData[title]", block.blockData.title);
                formDataLink.append("blockData[url]", block.blockData.url);
                formDataLink.append(
                  "linkDisplayPicture",
                  block.blockData.linkDisplayPicture
                );
                formDataLink.append(
                  "blockData[badge][text]",
                  block.blockData.badge.text
                );
                formDataLink.append(
                  "blockData[badge][backgroundColor]",
                  block.blockData.badge.backgroundColor
                );
                formDataLink.append(
                  "blockData[badge][color]",
                  block.blockData.badge.color
                );

                const linkRes = await updateBlockWithMedia(formDataLink);
                console.log("linkRes", linkRes);

                break;
              case "SEPARATOR":

                const separatorRes = await updateBlock({
                  blockId: block.id,
                  userId: userId,
                  dodopageUrl: url,
                  blockData: {
                    separatorType: block.blockData.separatorType,
                  },
                });

                break;
              default:
                break;
            }
          } catch (error) {
            console.error("Error updating block:", error);
            return false; // Return false if any block update fails
          }
        });
      }

      // we are removing all the data from redux, if any api fails above, that
      // data will neither be in the backend nor in the redux store
      resetReduxForDodoPage();

      setIsPublishedModalOpened(true);

      confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          y: 0.7
        }
      });
      // window.location.href = `/dodo/${url}`;
      return true;
    } catch (error) {
      console.error("Error in handlePublish:", error);
      toast.error(error?.msg || "Error publishing Dodo Page");
      return false;
    }
  };

  const resetReduxForDodoPage = () => {
    dispatch(resetDodoPage());
    dispatch(resetUnpublishedBlocks());
    dispatch(removeIsNewFromBlocks());
    dispatch(removeIsUpdatedFromBlocks());
    dispatch(removeToRemoveFromBlocks());
  }

  const handleAnalyticsNavigation = () => {
    router.push(`/dodo/${url}/analytics`);
  };

  return (
    <div>
      {<BlockModal isOpen={isOpened} />}
      <div className="flex gap-2">
        <button onClick={handleAnalyticsNavigation} className="bg-white shadow-md border-[1px] py-[14px] px-[10px] rounded-full w-full flex text-sm font-semibold items-center justify-center text-brandPrimary backdrop-filter backdrop-blur-sm bg-white/70">
          Analytics
        </button>

        <div
          className={`p-3 bg-brandPrimary rounded-full text-white cursor-pointer transform transition-transform duration-300 ease-in-out ${isOpened ? "rotate-45" : "rotate-0"
            }`}
          onClick={() => setIsOpened(!isOpened)}
        >
          <Plus size={32} />
        </div>

        <button
          onClick={handlePublish}
          disabled={!enablePublish}
          className={`bg-white py-[14px] shadow-md border-[1px] px-[10px] rounded-full w-full text-sm font-semibold flex items-center justify-center text-brandPrimary backdrop-filter backdrop-blur-sm bg-white/70 ${!enablePublish ? "bg-gray-200 clr-light-green" : ""}`}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default FooterBar;
