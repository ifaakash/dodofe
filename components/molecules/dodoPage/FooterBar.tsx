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
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { resetUnPublishedBlocks } from "store/slice/blocksSlice";
import {
  createBlock,
  createBlockWithMedia,
  deleteBlock,
  reorderBlocks,
  updateDodoPage,
  updateDodoPageMedia,
} from "api/services";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetDodoPage } from "store/slice/dodoPageSlice";

const BlockModal = () => {
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
    <div className="mb-4 bg-white p-4 rounded-[10px]">
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
  userId,
  dodoPageId,
}: {
  mode: string;
  url: string;
  userId: string;
  dodoPageId: string;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const {
    dodoPageName,
    dodoPageThought,
    dodoPageImage,
    socialLinks,
    unsavedChanges,
    audioBio,
  } = useSelector((state: any) => state.dodoPage);
  const dispatch = useDispatch();
  const blockState = useSelector((state: any) => state.blocks);

  const handlePublish = async () => {
    if (blockState.newBlocksAdded) {
      console.log("newBlocksAdded");
      const newBlocks = blockState.blocks.filter((block) => block.isNew);

      newBlocks.forEach(async (block) => {
        switch (block.blockType) {
          case "LINK":
            const formData = new FormData();
            formData.append("dodoPageId", dodoPageId);
            formData.append("blockType", "LINK");
            formData.append("blockCardSize", block.blockCardSize);
            formData.append("userId", userId);
            formData.append("blockData[title]", block.blockData.title);
            formData.append("blockData[url]", block.blockData.url);
            formData.append(
              "linkDisplayPicture",
              block.blockData.linkDisplayPicture
            );

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

            const createLink = await createBlockWithMedia(formData);
            console.log("createLink", createLink);
            break;

          case "PRODUCT":
            const formDataProduct = new FormData();
            formDataProduct.append(
              "productImage",
              block.blockData.productImage
            );
            formDataProduct.append("blockData[title]", block.blockData.title);
            formDataProduct.append("blockData[link]", block.blockData.link);
            formDataProduct.append("dodoPageId", dodoPageId);
            formDataProduct.append("blockType", "PRODUCT");
            formDataProduct.append("blockCardSize", block.blockCardSize);
            formDataProduct.append("userId", userId);

            const createProduct = await createBlockWithMedia(formDataProduct);
            console.log("createProduct", createProduct);
            break;

          default:
            const createNewBlock = await createBlock(block);
            console.log("createNewBlock", createNewBlock);
            break;
        }
      });
    }

    if (blockState.isReordered) {
      console.log("isReordered");
      await reorderBlocks({
        dodoPageId: dodoPageId,
        blocks: blockState.blocks.map((block) => ({
          blockId: block.id as string,
          newIndex: block.blockPositionalIndex as number,
        })),
      });
    }

    if (blockState.blocksToBeDeleted) {
      console.log("blocksToBeDeleted");
      const blocksToBeDeleted = blockState.blocks.filter(
        (block) => block.toRemove
      );

      blocksToBeDeleted.forEach(async (block) => {
        await deleteBlock({ blockId: block.id as string, userId: userId });
      });
    }

    dispatch(resetDodoPage());
    dispatch(resetUnPublishedBlocks());
    window.location.href = `/dodo/${url}`;
  };

  return (
    <div>
      {isOpened && <BlockModal />}
      <div className="flex gap-2">
        <div className="bg-white py-[14px] px-[10px] rounded-full w-full flex text-sm font-semibold items-center justify-center text-brandPrimary">
          Analytics
        </div>

        <div
          className={`p-3 bg-brandPrimary rounded-full text-white cursor-pointer transform transition-transform duration-300 ease-in-out ${isOpened ? "rotate-45" : "rotate-0"
            }`}
          onClick={() => setIsOpened(!isOpened)}
        >
          <Plus size={32} />
        </div>

        <div
          onClick={handlePublish}
          className="bg-white py-[14px] px-[10px] rounded-full w-full text-sm font-semibold flex items-center justify-center text-brandPrimary"
        >
          Publish
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
