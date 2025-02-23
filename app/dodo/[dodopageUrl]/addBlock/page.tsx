"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import LinkBlock from "@components/molecules/dodoPage/addBlocks/AddLink";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { loadState } from "@utils/localStorage";
import { getUserDetails, getDodoPageByURL } from "api";
import AddHeading from "@components/molecules/dodoPage/addBlocks/AddHeading";
import AddSeparator from "@components/molecules/dodoPage/addBlocks/AddSeparator";
import AddProduct from "@components/molecules/dodoPage/addBlocks/AddProduct";
import AddSocial from "@components/molecules/dodoPage/addBlocks/AddSocial";
import AddPoll from "@components/molecules/dodoPage/addBlocks/AddPoll";
import AddLink from "@components/molecules/dodoPage/addBlocks/AddLink";


const AddBlock = () => {
  const { dodopageUrl } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [userDetails, setUserDetails] = useState({} as any);
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || "";
  const [dodoPageDetails, setDodoPageDetails] = useState({} as any);
  const router = useRouter();

  useEffect(() => {
    getUserDetails(userId).then((res) => {
      setUserDetails(res?.user);
    });
  }, []);

  useEffect(() => {
    getDodoPageByURL(dodopageUrl).then((res) => {
      setDodoPageDetails(res?.dodoPage);
    });
  }, []);

  console.log('dodoPageDetails', dodoPageDetails)


  const renderBlock = () => {
    switch (type) {
      case "heading":
        return <AddHeading dodoPageId={dodoPageDetails.id} userId={userId} dodopageUrl={dodopageUrl} mode={'add'} />;

      case "link":
        return <AddLink dodoPageId={dodoPageDetails.id} userId={userId} dodopageUrl={dodopageUrl as string} mode={'add'} />;

      case "separator":
        return <AddSeparator mode={'add'} dodoPageId={dodoPageDetails.id} userId={userId} dodopageUrl={dodopageUrl} />;

      case "poll":
        return <AddPoll mode={'add'} dodoPageId={dodoPageDetails.id} userId={userId} dodopageUrl={dodopageUrl as string} />;

      case "product":
        return <AddProduct mode={'add'} dodoPageId={dodoPageDetails.id} userId={userId} dodopageUrl={dodopageUrl as string} />;

      case "social":
        return <AddSocial dodoPageId={dodoPageDetails.id} dodopageUrl={dodopageUrl as string} socialLinks={dodoPageDetails.socialLinks} userId={userId} />;
    }
  };

  const renderBackButtonTitle = () => {
    switch (type) {
      case "heading":
        return "Add Heading";

      case "link":
        return "Add Link";

      case "separator":
        return "Add Separator";

      case "poll":
        return "Add Poll";

      case "product":
        return "Add Product";

      case "social":
        return "Add Social";

      default:
        return "Add Block";

    }
  };

  const handleGoBack = () => {
    router.back();
    console.log('router')
  }

  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="flex justify-start px-5">
        <div onClick={handleGoBack} className="flex items-center gap-2">
          <ArrowLeft size={20} />
          <div className="text-sm font-semibold">{renderBackButtonTitle()}</div>
        </div>
      </div>

      <div className="px-5">{renderBlock()}</div>
    </div>
  );
};

export default AddBlock;
