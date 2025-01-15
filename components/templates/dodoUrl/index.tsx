"use client";

import styles from "./dodoUrl.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import userDetailImg from "public/assets/userDetails.png";
import thoughtsImg from "public/assets/thoughts1.svg";
import dodoWhiteIcon from "public/icons/dodoWhite.svg";
import rightArrow from "public/icons/rightArrow.svg";

import playAudioIcon from "public/assets/playAudio.svg";
import micIcon from "public/icons/mic.svg";

import menuIcon from "public/icons/menu.svg";
import { useEffect, useState } from "react";
import Modal from "@components/molecules/Modal";
import { useParams, useRouter } from "next/navigation";
import { BADGE_COLORS_MAP, BLOCKS, ROUTE_CONSTANTS, socialPlatforms } from "@utils/constants";
import { getLinkList, getPublishedData, getUserDetails } from "api";
import { getLinkBoxUI, getSeperatorOptionsUI } from "@utils/uiUtils";
import ThoughtsModal from "@app/links/ThoughtModal";
import VoiceRecorder from "@components/molecules/VoiceRecorder";
import { gotoLink, isEmpty } from "@utils/index";

export default function DodoUrl({
  mainBgTheme,
  textColor,
  borderColor,
  cardBg,
  className,
}: any) {
  const router = useRouter();

  const params = useParams();
  const userId: any = params.userId;

  const [linkList, setLinkList] = useState([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState({} as any);
  const [isThoughtsModalOpen, setThoughtsModalOpen] = useState(false);
  const [voiceRecorderModal, setVoiceRecorderModal] = useState(false);

  useEffect(() => {

    if (document) {
      document.body.style.backgroundImage = "url('/assets/bioBg.png')";
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.height = '100vh';
    }

    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const fetchAudioBio = (userData: any) => {
    if (userData.audioBio) {
      const audioBlob = new Blob([new Uint8Array(atob(userData.audioBio).split("").map(char => char.charCodeAt(0)))], { type: 'audio/ogg' });
      const audioObjectUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioObjectUrl);
    }
  }

  useEffect(() => {
    getPublishedData(userId)
      .then((res) => {
        setUserDetails(res);
        fetchAudioBio(res);

        setLinkList(res?.links);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [])

  const redirectToHome = () => {
    router.push(ROUTE_CONSTANTS.HOME);
  };

  const getHeader = () => {
    return (
      <div className="flex flex-row justify-end items-center w-full">
        <Image
          height={16}
          width={16}
          src={menuIcon}
          alt="user profile"
          className="my-4"
        />
      </div>
    );
  };

  const onVoiceRecordClick = (data: any) => {
    setVoiceRecorderModal(true);
  };

  const getIconByPlatformName = (platformName: string) => {
    const platform = socialPlatforms.find((item) => item.name === platformName);
    return platform?.icon || null;
  };

  const nonEmptyLinks = Object.entries(userDetails?.socialLinks ?? {})
    .filter(([_, url]) => url)
    .map(([name, url]) => ({
      name,
      url,
      icon: getIconByPlatformName(name),
    }));

  const firstFourLinks = nonEmptyLinks.slice(0, 4);
  const remainingLinks = nonEmptyLinks.slice(4);

  return (
    <div className={cx("mx-4 mt-12 flex flex-col items-center bioBg", className)}>
      {getHeader()}
      <div className="flex flex-col relative items-center">
        <label htmlFor="file-input" className="relative inline-block cursor-pointer">
          <Image
            height={100}
            width={100}
            src={userDetailImg}
            alt="user profile"
            className="my-4"
          />
        </label>

        {userDetails?.thoughts !== '' &&
          <div
            className="absolute top-4 right-32 transform translate-x-1/2 -translate-y-1/2"
            onClick={() => setThoughtsModalOpen(true)}
          >
            <Image
              height={70}
              width={70}
              src={thoughtsImg}
              alt="thoughts icon"
              className="cursor-pointer"
            />
          </div>
        }

        {audioUrl && (
          <div
            className="absolute bottom-4 transform translate-y-1/2"
            style={{ right: 'calc(50% - 13px)' }}
            onClick={onVoiceRecordClick}
          >
            <Image
              height={26}
              width={26}
              src={playAudioIcon}
              alt="audio bio"
              className="cursor-pointer"
            />
          </div>
        )}
        <input className="invisible h-0" id="file-input" type="file" />
      </div>
      <span className="text-xl clr-text font-black mb-1">{userDetails?.name || 'Dodo user'}</span>

      <div className="flex mt-2 mb-4">
        {firstFourLinks.map((data) => (
          <div
            key={data.name}
            className="flex items-center justify-center ml-2 bg-white rounded-xl h-11 w-11 shadow-sm border border-gray-200"
            onClick={() => gotoLink(data.url as string)}
          >
            <Image
              height={20}
              width={20}
              src={data.icon}
              alt={`${data.name} icon`}
              className="object-contain"
            />
          </div>
        ))}

        {remainingLinks.length > 0 && (
          <div
            className="flex items-center justify-center ml-2 bg-white rounded-xl h-11 w-11 shadow-sm border border-gray-200"
            onClick={() => { }}
          >
            <span className="font-bold text-lg">+{remainingLinks.length}</span>
          </div>
        )}
      </div>

      {linkList.map((data: any) => {
        const badgeColor = BADGE_COLORS_MAP[data?.badge?.color];

        return (
          <div className="w-full mt-4" onClick={() => { gotoLink(data?.url) }}>
            {data?.type === BLOCKS.LINK && (
              <div className={cx("w-full h-14 bg-white rounded-xl mb-4 flex items-center justify-between shadow-md linkCard", styles.lightBorder)}>
                <div className="flex items-center">
                  {getLinkBoxUI(data, badgeColor)}

                  {data?.audio && (
                    <Image
                      height={20}
                      width={20}
                      src={micIcon}
                      alt="mic icon"
                      className="mr-2"
                    />
                  )}
                </div>
              </div>
            )}

            {data?.type === BLOCKS.SEPARATOR && getSeperatorOptionsUI(data?.description)}

            {data?.type === BLOCKS.HEADING && <h2 className="absolute-center clr-heading-text text-sm font-medium">{data?.description}</h2>}
          </div>
        );
      })}

      {isEmpty(linkList) && (
        <span className="block text-center text-gray-500 mt-8 text-lg font-semibold">
          No data to show here!
        </span>
      )}

      <ThoughtsModal thoughts={userDetails?.thoughts || ''} isOpen={isThoughtsModalOpen} onClose={() => setThoughtsModalOpen(false)} />

      <Modal
        visible={voiceRecorderModal}
        isPullable={false}
        modalHeader="Add audio"
        onCloseIconClick={() => {
          setVoiceRecorderModal(false);
        }}
      >
        {voiceRecorderModal && <VoiceRecorder audioUrl={audioUrl} />}
      </Modal>

      <Button
        text="Create your DODO bio now"
        btnColor="theme-1"
        className="absolute bottom-2 mx-6 my-2 w-[calc(100%-3rem)] font-bold py-2 rounded-2xl"
        onClick={redirectToHome}
        startIcon={dodoWhiteIcon}
        endIcon={rightArrow}
      />
    </div>
  );
}
