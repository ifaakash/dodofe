"use client";

import Image from "next/image";
import Button from "@components/atoms/Button";

import userDetailImg from "public/assets/userDetails.png";
import addIcon from "public/icons/add.svg";
import minusIcon from "public/icons/minus.svg";
import uploadIcon from "public/icons/upload.svg";
import emptyImage from "public/assets/emptyImage.png";

import leftArrow from "public/icons/leftArrow.svg";
import { Input } from "@components/atoms";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTE_CONSTANTS } from "@utils/constants";
import { isEmpty } from "@utils/index";

export default function AddVideo({ pageTitle }: any) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [videosData, setVideosData] = useState([] as any);
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      alert(`File selected: ${file.name}`);
    }
  };

  const redirectToHome = () => {
    router.push(ROUTE_CONSTANTS.HOME);
  };

  const linksFooterUI = () => {
    return (
      <div className="flex flex-col fixed bottom-2 w-full">
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

  const getVideoInputUI = () => {
    return (
      <div className="w-full">
        <Input
          placeholder="Paste your video link here"
          value={link}
          onChange={handleLink}
        />
        <div
          className="p-4 flex flex-row bg-white rounded-lg"
          onClick={handleDivClick}
        >
          <Image width={100} src={emptyImage} alt="user profile" />
          <div className="flex flex-row items-center ml-12">
            <Image
              height={20}
              width={20}
              src={uploadIcon}
              alt="user profile"
              className="mr-2"
            />
            <span className="clr-grey text-sm">Upload thumbnail</span>
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <Input
          placeholder="Add video title"
          value={title}
          onChange={handleTitle}
        />
      </div>
    );
  };

  const getAddedVideoUI = () => {
    return (
      <>
        {videosData.map((data: any, index: number) => {
          return (
            <div key={data.description} className="bg-theme-2 flex items-center justify-between mt-4 px-4 py-1 h-12 text-sm rounded-lg w-full">
              <span>{data?.title}</span>
              <span onClick={() => onDeleteLink(index)}>
                <Image
                  height={17}
                  width={17}
                  src={minusIcon}
                  alt="delete link"
                />
              </span>
            </div>
          );
        })}
        {videosData?.length > 0 && (
          <div className="bg-light-green w-full h-px mt-6 mb-2"></div>
        )}
      </>
    );
  };

  const onDeleteLink = (index: number) => {
    const newVideosData = videosData;

    newVideosData.splice(index, 1);

    setVideosData([...newVideosData]);
  };

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e?.target?.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value);
  };

  const addVideo = () => {
    if (isEmpty(link) || isEmpty(title)) {
      return;
    }

    const newVideosData = [...videosData, { link: link, title: title }];
    setLink("");
    setTitle("");

    setVideosData(newVideosData);
  };

  return (
    <div className="mx-4 flex flex-col items-center">
      {getHeader()}

      {getAddedVideoUI()}

      {getVideoInputUI()}

      <div
        className="flex flex-row justify-center items-center border rounded-lg px-4 py-1 w-16"
        onClick={addVideo}
      >
        <span className="clr-heading-text mr-1 text-sm">add</span>
        <Image height={12} width={12} src={addIcon} alt="user profile" />
      </div>

      {linksFooterUI()}
    </div>
  );
}
