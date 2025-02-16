"use client";
import React, { useState, useEffect, useRef } from "react";
import Rajveer from "public/assets/rajveer.png";
import Image from "next/image";
import WhatsOnYourMind from "public/assets/thoughts.svg";
import ReadMyMind from "public/assets/thoughts1.svg";
import Pen from "public/icons/EditPen.svg";
import PlusCircle from "public/icons/plusCircle.svg";
import EmptyImage from "public/assets/emptyImage.svg";
import { X } from "lucide-react";
import Quote from "public/icons/Quote.svg";
import Upload2 from "public/icons/upload2.svg";
import AudioRecord from "public/icons/AudioRecord.svg";
import Speaker from "public/icons/Speaker.svg";
import { updateDodoPage } from "api";
import { useDispatch } from "react-redux";
import { setDodoPageImage, setDodoPageName, setDodoPageThought, setSocialLinks } from "store/slice/dodoPageSlice";

const HeroSection = ({
  mode = "public",
  dodoPageId,
  userId,
  dodoPageDetails,
}: {
  mode: string;
  dodoPageId: string;
  userId?: string;
  dodoPageDetails: any;
}) => {
  const dispatch = useDispatch();
  const [editPageName, setEditPageName] = useState(false);
  const [showThoughtsPopup, setShowThoughtsPopup] = useState(false);
  const [thaughtEditMode, setThaughtEditMode] = useState(false);
  const [thaught, setThaught] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [pageName, setPageName] = useState("");
  const [addAudioBioPopup, setAddAudioBioPopup] = useState(false);
  const [dodoPageImage, setDodoPageImage] = useState("");
  const ImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setThaught(dodoPageDetails?.thoughts);
    setPageName(dodoPageDetails?.name);
  }, [dodoPageDetails]);

  useEffect(() => {
    setCharacterCount(thaught?.length);
  }, [thaught]);

  const handleNameSave = () => {
     // const res = await updateDodoPage({
    //   id: dodoPageId,
    //   userId: userId,
    //   name: dodoPageName,
    // });

    dispatch(setDodoPageName(pageName));

    // if (res?.success) {
    //   console.log("Dodo page name updated");
    // }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSave();
    }
  };

  const handleSubmitThought = async () => {
    // const res = await updateDodoPage({
    //   id: dodoPageId,
    //   userId: userId,
    //   thoughts: thaught,
    // });
    // if (res?.success) {
    //   console.log("Thought saved");
    //   setShowThoughtsPopup(false);
    // }
    dispatch(setDodoPageThought(thaught));
    setShowThoughtsPopup(false);
  };

  const handleDeleteThought = async () => {
    console.log("delete");
    // const res = await updateDodoPage({
    //   id: dodoPageId,
    //   userId: userId,
    //   thoughts: "",
    // });
    // if (res?.success) {
    //   console.log("Thought Deleted");
    //   setThaught("");
    //   setShowThoughtsPopup(false);
    // }
    dispatch(setDodoPageThought(""));
    setShowThoughtsPopup(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDodoPageImage(url);
    }
  };

  return (
    <div
      className={`flex flex-col items-center ${
        mode === "preview" ? "gap-[10px]" : "gap-3"
      } px-5 mt-8`}
    >
      <div className="relative flex justify-center items-center w-fit">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          ref={ImageInputRef}
        />
        <div onClick={() => mode === "edit" && ImageInputRef.current?.click()}>
          {dodoPageImage ? (
            <div className="w-[88px] h-[88px] rounded-full overflow-hidden">
              <Image
                src={dodoPageImage}
                alt="Dodo Page Image"
                width={88}
                height={88}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-[88px] h-[88px] rounded-full bg-[#C7C6CB] border-[1px] border-white flex items-center justify-center cursor-pointer">
              <Image src={EmptyImage} alt="Rajveer" width={42} height={42} />
            </div>
          )}
        </div>
        <div className="absolute -top-10 -right-12">
          <Image
            height={70}
            width={70}
            src={mode === "edit" ? WhatsOnYourMind : ReadMyMind}
            alt="thoughts icon"
            className="cursor-pointer"
            onClick={() => setShowThoughtsPopup(true)}
          />
        </div>
      </div>

      <div
        className={`flex flex-col ${
          mode === "preview" ? "gap-5" : "gap-3"
        } items-center`}
      >
        <div>
          {editPageName ? (
            <input
              type="text"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-xl w-36 outline-none text-black font-semibold text-center w-fit"
              autoFocus
            />
          ) : (
            <div
              className="text-xl font-semibold flex items-center gap-2 cursor-pointer w-fit"
              onClick={() => mode !== "public" && setEditPageName(true)}
            >
              {pageName}
              {mode === "edit" && (
                <Image src={Pen} alt="Edit name" className="w-4 h-4" />
              )}
            </div>
          )}
        </div>

        {mode === "edit" && (
          <div
            className="flex gap-0.5 items-center border-[1px] border-[#979EAD] rounded-full py-[6px] px-3 cursor-pointer"
            onClick={() => setAddAudioBioPopup(true)}
          >
            <div className="text-xs font-medium text-[#414D55]">
              Add Audio Bio
            </div>
            <Image
              src={PlusCircle}
              alt="Add Audio Bio"
              className="cursor-pointer"
            />
          </div>
        )}
      </div>

      {showThoughtsPopup && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed inset-x-0 bottom-0 z-50 p-2">
            <div className="flex justify-center">
              <div
                className="w-fit bg-white rounded-full p-1 mb-4"
                onClick={() => setShowThoughtsPopup(false)}
              >
                <X size={26} className="cursor-pointer text-brandPrimary" />
              </div>
            </div>
            <div className="bg-white rounded-[10px] p-4 animate-slide-up">
              <div className="flex flex-col gap-5">
                <div className="flex items-center flex-col gap-3 p-[6px]">
                  <div className="flex justify-between items-center w-full">
                    <Image src={Quote} alt="Quote" />
                    {mode === "edit" && (
                      <div> {characterCount}/25 Characters </div>
                    )}
                  </div>
                  <div>
                    {!thaughtEditMode ? (
                      <textarea
                        value={thaught}
                        onChange={(e) => {
                          if (e.target.value.length <= 25) {
                            setThaught(e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height =
                              e.target.scrollHeight + "px";
                          }
                        }}
                        className="w-full outline-none resize-none overflow-hidden font-semibold"
                        style={{ height: "auto" }}
                      />
                    ) : (
                      <div
                        className="font-semibold text-black text-center cursor-pointer"
                        onClick={() => setThaughtEditMode(true)}
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {thaught === "" ? thaught : "Start typing..."}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end w-full">
                    <Image src={Quote} alt="Quote" className="rotate-180" />
                  </div>
                </div>

                {mode === "edit" && (
                  <div className="flex gap-[10px]">
                    <button
                      onClick={handleDeleteThought}
                      className="w-full border-[#F05252] border-[1px] rounded-full py-3 px-3 font-medium text-brandPrimary"
                    >
                      Delete
                    </button>
                    <button
                      className="w-full bg-brandPrimary rounded-full py-3 px-3 font-medium text-white"
                      onClick={handleSubmitThought}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {addAudioBioPopup && (
        <div>
          <div className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed inset-x-0 bottom-0 z-50 p-2">
            <div className="flex justify-center">
              <div
                className="w-fit bg-white rounded-full p-1 mb-4"
                onClick={() => setAddAudioBioPopup(false)}
              >
                <X size={26} className="cursor-pointer text-brandPrimary" />
              </div>
            </div>
            <div className="bg-white rounded-[10px] p-4 animate-slide-up flex flex-col gap-8">
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <div className="text-xl font-semibold leading-none">
                    Record your voice
                  </div>
                  <div className="text-[#3D4966] text-xs leading-none">
                    {" "}
                    Say anything for 20 sec{" "}
                  </div>
                </div>
                <div className="flex items-center flex-col gap-0.5 p-2 border-[1px] border-dashed border-[#979EAD] rounded-lg">
                  <Image src={Upload2} width={16} height={16} alt="Upload" />
                  <span className="text-brandPrimary text-[8px]">upload</span>
                </div>
              </div>
              <div>Sound Wave</div>
              <div className="flex items-center flex-col">
                <Image src={AudioRecord} alt="Audio Record" />
                <span className="text-[#3D4966] text-xs font-medium">
                  Press to start
                </span>
              </div>
              <div className="flex gap-3">
                <button className="border-[1px] border-[#979EAD] rounded-full flex items-center gap-1 py-[14px] pl-[26px] pr-10">
                  <span className="text-xs font-medium"> Listen </span>
                  <Image src={Speaker} alt="Speaker" />
                </button>
                <button className="w-full bg-brandPrimary text-white font-semibold rounded-full">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
