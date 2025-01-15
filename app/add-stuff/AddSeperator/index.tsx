"use client";

import Image from "next/image";
import Button from "@components/atoms/Button";

import lineSeparator from "public/icons/line.svg";
import solidLineSeparator from "public/icons/solidLine.svg";
import orSeparator from "public/icons/or.svg";

import leftArrow from "public/icons/leftArrow.svg";
import eyeIcon from "public/icons/eye.svg";
import curvyLine from "public/assets/curvyLine.svg";
import { Footer, Input } from "@components/atoms";
import { useState } from "react";
import Modal from "@components/molecules/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS, SEPARATOR } from "@utils/constants";
import { capitalizeFirstWord, isEmpty } from "@utils/index";
import { createLink } from "api";



export default function AddSeparator({ pageTitle, separatorName }: any) {
  const [separator, setSeparator] = useState(separatorName || "line");
  const router = useRouter();
  const searchParams = useSearchParams();

  const blockId = searchParams?.get("blockId") || '';
  const userId = searchParams?.get("userId") || '';

  const redirectToHome = () => {
    const payload = {
      userId, blockId, urls: [{
        url: '',
        description: separator,
        type: BLOCKS.SEPARATOR
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

  const getSeparatorOptionsUI = () => {
    return (
      <div className="w-full mt-16">
        <div
          onClick={() => setSeparator(SEPARATOR.LINE)}
          className="bg-theme-2 flex flex-col justify-start mt-4 px-4 h-16 pt-4 text-sm rounded-lg w-full"
        >
          <div className="flex flex-row">
            <input
              value={SEPARATOR.LINE}
              checked={separator === SEPARATOR.LINE}
              className="mr-1"
              type="radio"
            ></input>
            <span className="ml-1">{capitalizeFirstWord(SEPARATOR.LINE)}</span>
          </div>
          <Image
            height={0}
            width={0}
            sizes="100vw"
            src={lineSeparator}
            alt="user profile"
            className="my-2"
          />
        </div>

        <div
          onClick={() => setSeparator(SEPARATOR.SOLID)}
          className="bg-theme-2 flex flex-col justify-start mt-4 px-4 h-16 pt-4 text-sm rounded-lg w-full"
        >
          <div className="flex flex-row">
            <input
              value={SEPARATOR.SOLID}
              checked={separator === SEPARATOR.SOLID}
              className="mr-1"
              type="radio"
            ></input>
            <span className="ml-1">{capitalizeFirstWord(SEPARATOR.SOLID)}</span>
          </div>
          <Image
            height={0}
            width={0}
            sizes="100vw"
            src={solidLineSeparator}
            alt="user profile"
            className="my-2"
          />
        </div>

        <div
          onClick={() => setSeparator(SEPARATOR.OR)}
          className="bg-theme-2 flex flex-col justify-start mt-4 px-4 h-21 pt-4 text-sm rounded-lg w-full"
        >
          <div className="flex flex-row">
            <input
              value={SEPARATOR.OR}
              checked={separator === SEPARATOR.OR}
              className="mr-1"
              type="radio"
            ></input>
            <span className="ml-1">{capitalizeFirstWord(SEPARATOR.OR)}</span>
          </div>
          <Image
            height={0}
            width={0}
            sizes="100vw"
            src={orSeparator}
            alt="user profile"
            className="my-2"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="mx-4 flex flex-col items-center">
      {getHeader()}

      {getSeparatorOptionsUI()}

      {linksFooterUI()}
    </div>
  );
}
