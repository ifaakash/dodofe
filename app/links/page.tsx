"use client";

import styles from "./links.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";
import { Reorder, useDragControls } from "framer-motion"
import { useSwipeable } from 'react-swipeable';

import userDetailImg from "public/assets/userDetails.png";
import thoughtsImg from "public/assets/thoughts.svg";
import instaIcon from "public/icons/insta.svg";
import fbIcon from "public/icons/fb.svg";
import youtubeIcon from "public/icons/youtube.svg";
import snapchatIcon from "public/icons/snapchat.svg";

import linkIcon from "public/assets/link.png";
import socialIcon from "public/assets/social.png";
import headingIcon from "public/assets/heading.png";
import videoIcon from "public/assets/video.png";
import seperatorIcon from "public/assets/seperator.png";
import dragIcon from "public/icons/drag.svg";
import micIcon from "public/icons/mic.svg";
import editIcon from "public/icons/edit.svg";

import leftArrow from "public/icons/leftArrow.svg";
import sideBarIcon from "public/icons/sideBarIcon.svg";
import curvyLine from "public/assets/curvyLine.svg";
import { Footer, Input } from "@components/atoms";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Modal from "@components/molecules/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { BADGE_COLORS_MAP, BLOCKS, ColorConstants, ROUTE_CONSTANTS, SEPARATOR, socialPlatforms, STORAGE_CONSTANTS } from "@utils/constants";
import { createLink, createUserBlock, getLinkList, getUserDetails, publishData, reorderLink, updateUserDetails } from "api";
import { loadState } from "@utils/localStorage";
import Screen from "@components/molecules/Screen";
import { debounce, isEmpty } from "@utils/index";
import { toast } from "react-toastify";
import VoiceRecorder from "../../components/molecules/VoiceRecorder";
import ThoughtsModal from "./ThoughtModal";
import { getLinkBoxUI, getSeperatorOptionsUI, sidebarUI } from "@utils/uiUtils";

const socialData = [
  { name: "instagram", icon: instaIcon },
  { name: "facebook", icon: fbIcon },
  { name: "youtube", icon: youtubeIcon },
  { name: "snapchat", icon: snapchatIcon },
];

const blocksData = [
  { name: "link", icon: linkIcon, pageType: BLOCKS.LINK },
  { name: "social", icon: socialIcon, pageType: BLOCKS.SOCIAL },
  { name: "thoughts", icon: videoIcon, pageType: BLOCKS.THOUGHTS },
  { name: "video", icon: videoIcon, pageType: BLOCKS.VIDEO },
  {
    name: "seperator",
    icon: headingIcon,
    // width: "50%",
    pageType: BLOCKS.HEADING,
  },
  {
    name: "heading",
    icon: seperatorIcon,
    // width: "50%",
    pageType: BLOCKS.SEPARATOR,
  },
];

function Links() {
  const controls = useDragControls();

  const [modalStatus, setModalStatus] = useState(false);
  const [voiceRecorderModal, setVoiceRecorderModal] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [socialLinks, setSocialLinks] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dodoPageNameModal, setDodoPageNameModal] = useState(false);
  const [dodoPageName, setDodoPageName] = useState('');

  const [isThoughtsModalOpen, setThoughtsModalOpen] = useState(false);

  const [linkList, setLinkList] = useState([]);

  const searchParams = useSearchParams();
  const blockId = searchParams?.get("blockId") || '';
  const userId = searchParams?.get("userId") || '';
  const [currentBlockId, setCurrentBlockId] = useState(blockId);
  const [userDetails, setUserDetails] = useState({} as any);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [loader, setLoader] = useState(true);
  const router = useRouter();

  const handleArchive = () => {
    console.log('archive');
  }

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

  const handlers = useSwipeable({
    onSwipedLeft: () => handleArchive(),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Optional: allows mouse swipes as well
  });

  const redirectToPreview = () => {
    router.push(ROUTE_CONSTANTS.LINKS + ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.PREVIEW + `?userId=${userId}`);
  };

  const debouncedApiCall = useCallback(debounce((payload) => {
    reorderLink(payload).then((res) => {
      toast.success('Your links are updated! Publish to make them live.')
    }).catch((err) => {
      console.log('error', err)
    })
  }, 3000), [])

  const onReorder = (linkList: any) => {
    setLinkList(linkList);

    debouncedApiCall({ userId, blockId, urls: linkList });
  }

  useEffect(() => {


    getUserDetails(userId).then((res) => {
      setUserDetails(res);

      fetchAudioBio(res);

      setSocialLinks(res?.socialLinks || {})
      setDodoPageName(res?.dodoPageName || res?.name);

      getLinkList(userId).then((res) => {
        setLinkList(res);
      }).catch(() => {
        console.log('error fetching links')
      })
    })

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [])

  const fetchAudioBio = (userData: any) => {
    if (userData.audioBio) {
      const audioBlob = new Blob([new Uint8Array(atob(userData.audioBio).split("").map(char => char.charCodeAt(0)))], { type: 'audio/ogg' });
      const audioObjectUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioObjectUrl);
    }
  }

  const linksFooterUI = () => {
    return (
      <div className="flex flex-col main-bg-theme fixed bottom-2 w-full">
        {isEmpty(linkList) && <div className="flex justify-center flex-col items-center">
          <span className="text-2xl clr-heading-text font-black mb-2">
            Click “+” here to add your stuff
          </span>

          <Image
            height={40}
            width={50}
            src={curvyLine}
            alt="user profile"
            className="my-4"
          />
        </div>}
        <div className="flex flex-row">
          <Button
            text="Preview"
            className="mx-4 my-2 w-full theme-3 font-bold py-2"
            onClick={redirectToPreview}
            btnColor='white'
          />

          <div
            onClick={() => {
              setModalStatus(true)
            }}
            className="bg-theme-3 w-52 mt-2 h-14 circle flex items-center justify-center text-3xl clr-white"
          >
            +
          </div>

          <Button
            text="Publish"
            className="mx-4 my-2 w-full theme-3 font-bold py-2"
            onClick={publishDraftData}
            btnColor='white'
          />
        </div>
      </div>
    );
  };

  const onVoiceRecordClick = (data: any) => {
    setVoiceRecorderModal(true);
  };


  const getHeader = () => {
    return (
      <div className="flex flex-row justify-between items-center w-full">
        <div onClick={() => router.back()}>
          <Image
            height={16}
            width={16}
            src={leftArrow}
            alt="user profile"
            className="my-4"
            onClick={() => router.back()}
          />
        </div>

        <Image
          height={24}
          width={24}
          src={sideBarIcon}
          alt="side bar"
          onClick={toggleSidebar}
        />
      </div>
    );
  };

  const onBlockClick = (block: string) => {
    router.push(ROUTE_CONSTANTS.ADD_STUFF + `?pageType=${block}&userId=${userId}&blockId=${currentBlockId}`);
  };

  const onLinkClick = (block: string, linkId: string, description?: string) => {
    router.push(ROUTE_CONSTANTS.ADD_STUFF + `?pageType=${block}&linkId=${linkId}&userId=${userId}&blockId=${currentBlockId}&description=${description}`);
  }

  const uploadAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';

    if (audioBlob) {
      formData.append('audioBio', audioBlob, 'recording.ogg');

      // setup payload for updating user details
      Object.entries(userDetails).forEach(([key, value]) => {
        if (value instanceof File) {
          // formData.append(key, value, value.name);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      try {
        const res = await updateUserDetails(userId, formData)

        toast.success('Audio uploaded successfully! Publish to make it live.');

        console.log('Audio uploaded successfully');
      } catch (error) {
        console.error('Error uploading audio:', error);
      }

      setVoiceRecorderModal(false);
    }
  }

  let startX = 0;

  function handleTouchStart(e: any) {
    startX = e.touches[0].clientX;
  }

  function handleTouchMove(e: any, id: string) {
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - startX;

    const item: any = document.querySelector(`[data-id="${id}"]`);
    if (deltaX < 0) { // Only swipe left
      item.style.transform = `translateX(${deltaX}px)`;
    }
  }

  function handleTouchEnd(e: any, id: string) {
    const item: any = document.querySelector(`[data-id="${id}"]`);
    const finalPosition = parseInt(item.style.transform.replace('translateX(', '').replace('px)', ''));

    if (finalPosition < -50) { // Threshold for swiping action
      item.classList.add('swiped');
      // Perform any action like deletion here
    } else {
      item.style.transform = 'translateX(0)';
    }
  }

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

  const gotoSocialLinksPage = () => {
    router.push(ROUTE_CONSTANTS.ADD_STUFF + `?pageType=${BLOCKS.SOCIAL}&userId=${userId}`);

    return;
  }

  const onSaveDodoPageName = async () => {
    try {
      const res = await updateUserDetails(userId, { dodoPageName })

      toast.success('Your dodo page name is updated! Publish to make it live.')

      setDodoPageNameModal(false)
    } catch (error) {
      console.error('Error updating dodo page name', error);
    }
  }

  const publishDraftData = () => {
    publishData({ userId }).then(() => {
      toast.success('Wohoo! Your data is published and is live for your fans to see!')
    }).catch((err) => {
      toast.error('Error publishing data!');

      console.error('Error publishing data', err)
    })
  }

  return (
    <Screen>
      <div className="mx-4 flex flex-col items-center">
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
          <input className="invisible h-0" id="file-input" type="file" />
        </div>

        <span className="text-xl flex clr-dark-text font-black mb-1">
          {dodoPageName || userDetails?.name || 'Dodo user'}
          <Image height={16} width={16} src={editIcon} onClick={() => setDodoPageNameModal(true)} alt="user profile" className="ml-2" />
        </span>
        {
          audioUrl ?
            <span onClick={onVoiceRecordClick} className="text-base font-normal clr-text mb-2 border flex rounded-lg p-2">
              Edit audio bio
              <Image
                height={16}
                width={16}
                src={micIcon}
                alt="mic icon"
                className="ml-1"
              />
            </span>
            :
            <span onClick={onVoiceRecordClick} className="text-base font-normal clr-text mb-2 border flex rounded-lg p-2">
              Add audio bio
              <Image
                height={16}
                width={16}
                src={micIcon}
                alt="mic icon"
                className="ml-1"
              />
            </span>}
        {/* <Button text="edit" className="bg-theme border px-2 my-2 py-1" /> */}

        <div className="flex mt-2">
          {firstFourLinks.map((data) => (
            <div
              key={data.name}
              className="flex items-center justify-center ml-2 bg-white rounded-xl h-11 w-11 shadow-sm border border-gray-200"
              onClick={() => gotoSocialLinksPage()}
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
              onClick={() => gotoSocialLinksPage()}
            >
              <span className="font-bold text-lg">+{remainingLinks.length}</span>
            </div>
          )}
        </div>


        <Reorder.Group as="div" className="w-full mt-4 mb-16 overflow-scroll" dragListener={false} values={linkList} onReorder={onReorder}>
          {linkList.map((data: any) => {
            const badgeColor = BADGE_COLORS_MAP[data?.badge?.color];

            return (
              <Reorder.Item
                {...handlers}
                key={data._id}
                className={cx("swipeable-item w-full h-14 bg-white rounded-xl mb-4 flex items-center justify-between shadow-md linkCard", styles.lightBorder)}
                value={data}
                dragListener={false}
                dragControls={controls}
                onClick={() => onLinkClick(data?.type, data?._id, data?.description)}
              >
                {data?.type === BLOCKS.LINK &&
                  <>
                    <div className="flex items-center">

                      <div className="reorder-handle mr-2">
                        <Image onPointerDown={(e) => { controls.start(e) }} height={16} width={16} src={dragIcon} alt="drag icon" className="ml-2" />
                      </div>

                      {getLinkBoxUI(data, badgeColor)}
                    </div>

                    {data?.audio &&
                      <Image
                        height={20}
                        width={20}
                        src={micIcon}
                        alt="mic icon"
                        className="mr-2"
                      />
                    }
                  </>
                }

                {
                  data?.type === BLOCKS.SEPARATOR &&
                  <div className="flex absolute-center">
                    <div className="reorder-handle" onPointerDown={(e) => controls.start(e)}>
                      <Image height={24} width={24} src={dragIcon} alt="drag icon" className="ml-2" />
                    </div>
                    {getSeperatorOptionsUI(data?.description)}
                  </div>
                }

                {
                  data?.type === BLOCKS.HEADING &&
                  <div className="flex absolute-center">
                    <div className="reorder-handle mr-2" onPointerDown={(e) => controls.start(e)}>
                      <Image height={16} width={16} src={dragIcon} alt="drag icon" className="ml-2" />
                    </div>
                    <h2 className="absolute-center">{data?.description}</h2>
                  </div>
                }
              </Reorder.Item>
            );
          })}
        </Reorder.Group>

        {linksFooterUI()}

        <Modal
          visible={modalStatus}
          isPullable={false}
          modalHeader="Add new blocks"
          onCloseIconClick={() => {
            setModalStatus(false);
          }}
        >
          <div className="mt-2 flex flex-wrap justify-between w-full">
            {blocksData.map((data: any) => {
              return (
                <div
                  key={data.name}
                  className="bg-theme my-2 py-3 flex justify-center items-center flex flex-col rounded-xl"
                  style={{ width: data?.width ? "162px" : "104px" }}
                  onClick={() => onBlockClick(data?.pageType)}
                >
                  <Image
                    height={34}
                    width={34}
                    src={data?.icon}
                    alt="user profile"
                    className="mb-2"
                  />
                  {data?.name}
                </div>
              );
            })}
          </div>
        </Modal>

        <Modal
          visible={voiceRecorderModal}
          isPullable={false}
          modalHeader="Add audio"
          onCloseIconClick={() => {
            setVoiceRecorderModal(false);
          }}
        >
          {voiceRecorderModal && <VoiceRecorder editMode uploadAudio={uploadAudio} audioUrl={audioUrl} />}
        </Modal>

        <Modal
          visible={dodoPageNameModal}
          isPullable={false}
          modalHeader="Update your dodo page name"
          onCloseIconClick={() => {
            setDodoPageNameModal(false);
          }}
        >
          <Input
            placeholder="Enter your dodo page name here!"
            value={dodoPageName}
            className="h-16 rounded-xl"
            onChange={(e: any) => setDodoPageName(e?.target?.value)}
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={onSaveDodoPageName}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </Modal>

        <ThoughtsModal editMode thoughts={userDetails?.thoughts || ''} isOpen={isThoughtsModalOpen} onClose={() => setThoughtsModalOpen(false)} />
      </div>

      {sidebarUI(isSidebarOpen, toggleSidebar)}

    </Screen >
  );
}


const LinksPage = () => {
  return <Suspense>
    <Links />
  </Suspense>
}

export default LinksPage;