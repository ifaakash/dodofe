"use client";

import Image from "next/image";
import Button from "@components/atoms/Button";

import addIcon from "public/icons/add.svg";
import minusIcon from "public/icons/minus.svg";
import uploadIcon from "public/icons/upload.svg";
import emptyImage from "public/assets/emptyImage.png";
import micIcon from "public/icons/mic.svg";
import lineSeperator from "public/icons/line.svg";

import leftArrow from "public/icons/leftArrow.svg";
import { Input } from "@components/atoms";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BADGE_COLORS, BADGE_COLORS_MAP, BLOCKS, ROUTE_CONSTANTS } from "@utils/constants";
import { isEmpty } from "@utils/index";
import { toast } from "react-toastify";
import Modal from "@components/molecules/Modal";
import VoiceRecorder from "@components/molecules/VoiceRecorder";
import LinkLayout from "./LinkLayout";

export default function AddLink({ pageTitle, addNewData, dataForEdit, editData }: any) {
  const inputRef = useRef<HTMLInputElement | null>(null); // Explicitly type the ref

  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [linksData, setLinksData] = useState([] as any);
  const [voiceRecorderModal, setVoiceRecorderModal] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [linkLayout, setLinkLayout] = useState("big");
  const [badge, setBadge] = useState({
    text: "",
    color: "",
  });

  const placeholders = ["Ex: 30% flat discount. Hurry up!", "Ex: 50% flat discount. Hurry up!", "Ex: 60% flat discount. Hurry up!", "Ex: 80% flat discount. Hurry up!"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const router = useRouter();
  const editMode = !isEmpty(dataForEdit);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLink(dataForEdit.url);
    setTitle(dataForEdit.description);
    setBadge(dataForEdit?.badge || {
      text: "",
      color: "",
    });

    fetchAudioBio(dataForEdit);
  }, [dataForEdit])

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

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

  const fetchAudioBio = (linkData: any) => {
    if (linkData.audio) {
      const audioBlob = new Blob([new Uint8Array(atob(linkData.audio).split("").map(char => char.charCodeAt(0)))], { type: 'audio/ogg' });
      const audioObjectUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioObjectUrl);
    }
  }

  const saveLinksToBlock = () => {

    if (editMode) {
      editData({ url: link, description: title, type: BLOCKS.LINK, audio: recordedBlob, badge });

      return;
    }

    if (link && title) {
      let latestLinkData = [...linksData, { url: link, description: title, type: BLOCKS.LINK, audio: recordedBlob, badge }];

      addNewData(latestLinkData);

      return;
    }

    addNewData(linksData);
  };

  const linksFooterUI = () => {
    return (
      <div className="bg-theme h-16 flex fixed flex-col absolute bottom-0 w-full">
        <div className="flex flex-row">
          <Button
            text="Save"
            btnColor="theme-1"
            className="mx-4 my-2 w-full font-bold py-2"
            onClick={saveLinksToBlock}
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

  const onVoiceRecordClick = (data: any) => {
    setVoiceRecorderModal(true);
  };

  const handleTextChange = (e: any) => {
    setBadge((prevBadge) => ({
      ...prevBadge,
      text: e.target.value,
    }));
  };

  const handleColorSelect = (colorName: string) => {
    setBadge((prevBadge) => ({
      ...prevBadge,
      color: colorName,
    }));
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => setIsFocused(false);

  const getLinkInputUI = () => {

    return (
      <div className="w-full">
        <Input
          placeholder="Paste your link here"
          value={link}
          className="h-16 rounded-xl"
          onChange={handleLink} />
        <div className="p-4 h-16 rounded-xl flex items-center bg-theme-2 rounded-lg w-full max-w-md">
          <div
            className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-md cursor-pointer"
            onClick={handleDivClick}
          >
            <Image width={24} height={24} src={emptyImage} alt="Upload" />
          </div>

          <div className="flex items-center ml-4 flex-grow">
            <Input
              type="text"
              placeholder="Add Title"
              value={title}
              onChange={handleTitle}
              className="bg-transparent text-gray-500 text-lg border-none outline-none flex-grow" />
            {/* <Image height={16} width={16} src={editIcon} alt="Edit" className="ml-2 cursor-pointer" /> */}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange} />
        </div>
        <div className="my-5 flex justify-apart">
          {/* will add audio feature later here */}
          {/* {audioUrl ?
          <span onClick={onVoiceRecordClick} className="text-base clr-heading-text mb-2 border flex rounded-lg p-2">
            Play Audio
            <Image
              height={16}
              width={16}
              src={micIcon}
              alt="mic icon"
              className="ml-1" />
          </span>
          :
          <span onClick={onVoiceRecordClick} className="text-base w-28 text-sm clr-heading-text border flex rounded-2xl p-2">
            Add Audio
            <Image
              height={16}
              width={16}
              src={micIcon}
              alt="mic icon"
              className="ml-1" />
          </span>} */}

          {/* <LinkLayout linkLayout={linkLayout} setLinkLayout={setLinkLayout} /> */}
        </div>

        <div className="rounded-lg mb-4">
          <h3 className="text-gray-800 font-semibold">Add text badge</h3>

          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder=""
              value={badge?.text}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              className="w-full p-3 text-gray-500 text-lg rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" />

            {!badge?.text && !isFocused && (
              <div
                onClick={handleFocus}
                key={placeholderIndex}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm transition-transform duration-500 placeholder-animation"
              >
                {placeholders[placeholderIndex]}
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {BADGE_COLORS.map((badgeColor) => (
              <label
                key={badgeColor.name}
                style={{ background: badgeColor.color }}
                className={`flex items-center p-2 rounded-full cursor-pointer`}
              >
                <input
                  type="radio"
                  name="color"
                  value={badgeColor.name}
                  checked={badge?.color === badgeColor.name}
                  onChange={() => handleColorSelect(badgeColor.name)}
                  className="hidden" />
                <span className="text-white text-xs font-medium mr-2">{badgeColor.name}</span>
                <span className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                  {badge?.color === badgeColor.name && <span className="w-2 h-2 bg-white rounded-full"></span>}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Image
          height={0}
          width={0}
          sizes="100vw"
          src={lineSeperator}
          alt="user profile"
          className="my-2 w-full" />

        <style jsx>{`
        /* Keyframes for placeholder animation */
        @keyframes slide-up-fade {
          0% {
            transform: translateY(10%);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        /* Animation for placeholder */
        .placeholder-animation {
          animation: slide-up-fade 0.6s ease-in-out;
        }
      `}</style>
      </div>
    )
  }

  const getAddedLinkUI = () => {
    return (
      <>
        {linksData.map((data: any, index: number) => {
          const badgeColor = BADGE_COLORS_MAP[data?.badge?.color];

          return (
            <div
              key={data.description}
              className="bg-theme-2 flex flex-col justify-between mt-4 p-4 h-auto text-sm rounded-lg w-full"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{data?.description}</span>
                <span onClick={() => onDeleteLink(index)}>
                  <Image
                    height={17}
                    width={17}
                    src={minusIcon}
                    alt="delete link"
                  />
                </span>
              </div>

              {badgeColor && (
                <div className="flex">
                  <div
                    className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap self-start"
                    style={{ backgroundColor: badgeColor }}
                  >
                    {data.badge?.text}
                  </div>
                </div>
              )}
            </div>

          );
        })}

        {linksData?.length > 0 && (
          <div className="bg-light-green w-full h-px mt-6 mb-2"></div>
        )}
      </>
    );
  };


  const onDeleteLink = (index: number) => {
    const newLinksData = linksData;

    newLinksData.splice(index, 1);

    setLinksData([...newLinksData]);
  };

  const handleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e?.target?.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e?.target?.value);
  };

  const appendLink = () => {
    if (isEmpty(link) || isEmpty(title)) {
      toast.error('Please enter link and title');
      return false;
    }

    const newLinksData = [...linksData, { url: link, description: title, type: BLOCKS.LINK, audio: recordedBlob, badge }];

    setLink("");
    setTitle("");
    setBadge({ text: '', color: '' })

    setLinksData(newLinksData);

    return true;
  };

  const uploadAudio = async (audioBlob: Blob) => {
    setVoiceRecorderModal(false);

    setRecordedBlob(audioBlob);

    const audioObjectUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioObjectUrl);
  }

  return (
    <div className="mx-4 flex flex-col items-center">
      {getHeader()}

      <div className="mt-16"></div>

      {getAddedLinkUI()}

      {getLinkInputUI()}

      {!editMode && (
        <div
          className="flex mb-20 flex-row items-center border rounded-lg px-4 py-1"
          onClick={appendLink}
        >
          <span className="clr-heading-text mr-1 text-sm">Add new</span>
        </div>
      )}

      <Modal
        visible={voiceRecorderModal}
        isPullable={false}
        modalHeader="Add audio"
        onCloseIconClick={() => {
          setVoiceRecorderModal(false);
        }}
      >
        {voiceRecorderModal && <VoiceRecorder audioUrl={audioUrl} uploadAudio={uploadAudio} />}
      </Modal>

      {linksFooterUI()}
    </div>
  );
}
