"use client";

import styles from "./addStuff.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import leftArrow from "public/icons/leftArrow.svg";
import eyeIcon from "public/icons/eye.svg";
import curvyLine from "public/assets/curvyLine.svg";
import { Footer, Input } from "@components/atoms";
import { useState } from "react";
import Modal from "@components/molecules/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS } from "@utils/constants";
import { isEmpty } from "@utils/index";
import { createLink } from "api";

export default function AddHeading({ pageTitle, headingName }: any) {
  const [heading, setHeading] = useState(headingName || '');
  const router = useRouter();
  const searchParams = useSearchParams();

  const blockId = searchParams?.get("blockId") || '';
  const userId = searchParams?.get("userId") || '';

  const redirectToHome = () => {
    const payload = {
      userId, blockId, urls: [{
        url: '',
        description: heading,
        type: BLOCKS.HEADING
      }]
    }

    createLink(payload).then((res) => {
      router.push(ROUTE_CONSTANTS.LINKS + `?userId=${userId}&blockId=${blockId || ''}`, { scroll: false });
    }).catch((err) => {
      console.log('error', err);
    });


    router.push(ROUTE_CONSTANTS.HOME);
  };

  const linksFooterUI = () => {
    return (
      <div className="flex flex-col absolute bottom-2 w-full">
        <div className="flex flex-row">
          <Button
            text="done"
            btnColor="theme-1"
            className="mx-4 my-2 w-full font-bold py-2"
            onClick={redirectToHome}
          />
        </div>
      </div>
    );
  };

  const getHeader = () => {
    return (
      <div className="bg-theme h-16 flex fixed flex-row items-center w-full bg">
        <Image
          height={16}
          width={16}
          src={leftArrow}
          alt="back arrow"
          className="ml-4"
          onClick={() => router.back()}
        />

        <div className="flex flex-row items-center ml-2">
          <span className="text-sm clr-grey font-bold">
            Add {pageTitle}
          </span>
        </div>
      </div>
    );
  };

  const getSocialInputUI = () => {
    return (
      <Input
        className="mt-16"
        placeholder="Add your text here"
        value={heading}
        onChange={handleSocialInput}
      />
    );
  };

  const handleSocialInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeading(e?.target?.value);
  };

  return (
    <div className="mx-4 flex flex-col items-center">
      {getHeader()}

      {getSocialInputUI()}

      {linksFooterUI()}
    </div>
  );
}
