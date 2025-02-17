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
import { updateDodoPage } from "api/services";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants"; 
import { setUnsavedChanges } from "store/slice/dodoPageSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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


const FooterBar = ({mode, url, userId, dodoPageId}: {mode: string, url: string, userId: string, dodoPageId: string}) => {
  const [isOpened, setIsOpened] = useState(false);
  const { dodoPageName, dodoPageThought, dodoPageImage, socialLinks, unsavedChanges } = useSelector((state: RootState) => state.dodoPage);
  const dispatch = useDispatch();
  console.log({
    dodoPageName,
    dodoPageThought,
    dodoPageImage,
    socialLinks,
    unsavedChanges
  })

  console.log('userId', userId)

  const handlePublish = async () => {
    const dataToSend = {
      id: dodoPageId,
      userId: userId,
      name: dodoPageName,
      thoughts: dodoPageThought,
      dodoPageImage: dodoPageImage,
      socialLinks: socialLinks,
    };

    // Filter out null or undefined values
    const filteredData = Object.fromEntries(
      Object.entries(dataToSend).filter(([_, value]) => value != null)
    );
    
    

    const res = await updateDodoPage(filteredData);
    if(res?.success) {
      console.log("Published");
      dispatch(setUnsavedChanges(false));
      toast.success("Published successfully");
    }
  }
  
  return (
    <div>
      {isOpened && <BlockModal />}
      <div className="flex gap-2">
        <div className="bg-white py-[14px] px-[10px] rounded-full w-full flex text-sm font-semibold items-center justify-center text-brandPrimary">
          Analytics
        </div>

        <div
          className={`p-3 bg-brandPrimary rounded-full text-white cursor-pointer transform transition-transform duration-300 ease-in-out ${
            isOpened ? "rotate-45" : "rotate-0"
          }`}
          onClick={() => setIsOpened(!isOpened)}
        >
          <Plus size={32} />
        </div>

        <div onClick={handlePublish} className="bg-white py-[14px] px-[10px] rounded-full w-full text-sm font-semibold flex items-center justify-center text-brandPrimary">
          Publish
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
