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
import { useDispatch, useSelector } from "react-redux";
import PlayIcon from "public/icons/playIcon.svg";
import Waves from "public/assets/Waves.gif";
import {
  updateDodoPageProfilePicture,
  setDodoPageName,
  setDodoPageThought,
  setSocialLinks,
  updateDodoPageAudioBio,
  setIsImageChanged,
  setIsAudioBioChanged,
} from "store/slice/dodoPageSlice";

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
  const state = useSelector((state: any) => state.dodoPage);

  const [editPageName, setEditPageName] = useState(false);
  const [showThoughtsPopup, setShowThoughtsPopup] = useState(false);
  const [thaughtEditMode, setThaughtEditMode] = useState(false);
  const [thaught, setThaught] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [pageName, setPageName] = useState<string | null>(state.dodoPageName);
  const [addAudioBioPopup, setAddAudioBioPopup] = useState(false);
  const [dodoPageImage, setDodoPageImage] = useState("");
  const ImageInputRef = useRef<HTMLInputElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProfileAudioPlaying, setIsProfileAudioPlaying] = useState(false);
  const profileAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  
  // Create refs for popup content to handle click outside
  const thoughtsPopupRef = useRef<HTMLDivElement>(null);
  const audioBioPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setThaught(dodoPageDetails?.thoughts);
    setPageName(dodoPageDetails?.name);
  }, [dodoPageDetails]);

  useEffect(() => {
    setCharacterCount(thaught?.length);
  }, [thaught]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle thoughts popup click outside
      if (
        showThoughtsPopup &&
        thoughtsPopupRef.current &&
        !thoughtsPopupRef.current.contains(event.target as Node)
      ) {
        // Don't close when clicking the thoughts icon
        const thinkingIcon = document.getElementById('thoughts-icon');
        if (!thinkingIcon?.contains(event.target as Node)) {
          setShowThoughtsPopup(false);
        }
      }

      // Handle audio bio popup click outside
      if (
        addAudioBioPopup &&
        audioBioPopupRef.current &&
        !audioBioPopupRef.current.contains(event.target as Node)
      ) {
        // Don't close when clicking the audio bio button
        const audioBioButton = document.getElementById('audio-bio-button');
        if (!audioBioButton?.contains(event.target as Node)) {
          setAddAudioBioPopup(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThoughtsPopup, addAudioBioPopup]);

  const handleNameSave = () => {
    dispatch(setDodoPageName(pageName || ""));
    setEditPageName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSave();
    }
  };

  const handleSubmitThought = async () => {
    dispatch(setDodoPageThought(thaught));
    setShowThoughtsPopup(false);
  };

  const handleDeleteThought = async () => {
    dispatch(setDodoPageThought(""));
    setShowThoughtsPopup(false);
  };

  const handleImageUpload = async () => {
    const file = ImageInputRef.current?.files?.[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    dispatch(updateDodoPageProfilePicture(file));
    dispatch(setIsImageChanged(true));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      // Set up audio visualization
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        console.log("Audio saved", blob);
      };

      recorder.start();
      setIsRecording(true);
      setAudioChunks([]);

      // Stop recording after 20 seconds
      setTimeout(() => {
        if (recorder.state === "recording") {
          stopRecording();
        }
      }, 20000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (!audioBlob) {
      console.log("No audio recorded yet");
      return;
    }

    // Create a new audio element each time to ensure the source is fresh
    const audioUrl = URL.createObjectURL(audioBlob);
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    } else {
      // Update the source if the audio element already exists
      audioRef.current.src = audioUrl;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  };

  const handleSaveAudioBio = () => {
    if (!audioBlob) {
      console.log("No audio recorded yet");
      return;
    }

    // Create a File object from the Blob
    const audioFile = new File([audioBlob], "audio-bio.wav", {
      type: "audio/wav",
    });
    console.log("audioFile", audioFile);
    dispatch(updateDodoPageAudioBio(audioFile));
    setAddAudioBioPopup(false);
    dispatch(setIsAudioBioChanged(true));
  };

  const playProfileAudio = () => {
    if (!dodoPageDetails.audioBio) {
      console.log("No audio bio available");
      return;
    }
    if (!profileAudioRef.current) {
      profileAudioRef.current = new Audio(dodoPageDetails.audioBio);
      profileAudioRef.current.onended = () => {
        setIsProfileAudioPlaying(false);
      };
    }

    if (isProfileAudioPlaying) {
      profileAudioRef.current.pause();
      setIsProfileAudioPlaying(false);
    } else {
      profileAudioRef.current.play();
      setIsProfileAudioPlaying(true);
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('audio/')) {
      const audioFile = new File([file], file.name, {
        type: file.type,
      });
      dispatch(updateDodoPageAudioBio(audioFile));
      dispatch(setIsAudioBioChanged(true));
      setAddAudioBioPopup(false);
    } else {
      alert('Please upload an audio file');
    }
  };

  // Function to prevent event bubbling for popup content
  const handlePopupContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
          disabled={mode === "public" || mode === "preview"}
        />
        <div onClick={() => mode === "edit" && ImageInputRef.current?.click()}>
          {imagePreview || state.dodoPageImage ? (
            <div className="w-[88px] h-[88px] rounded-full overflow-hidden">
              <Image
                src={imagePreview || state.dodoPageImage}
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
         {
          mode !== "edit" && (
            <div 
              className="absolute -bottom-5 left-8 border-[1px] border-brandPrimary bg-white rounded-full p-1 cursor-pointer"
              onClick={playProfileAudio}
            >
              <Image 
                src={isProfileAudioPlaying ? Speaker : PlayIcon} 
                alt={isProfileAudioPlaying ? "Stop" : "Play"} 
                width={16} 
                height={16} 
              />
            </div>
          )
         }
        </div>
        <div className="absolute -top-10 -right-10">
          <Image
            height={70}
            width={70}
            src={mode === "edit" ? WhatsOnYourMind : ReadMyMind}
            alt="thoughts icon"
            className="cursor-pointer"
            onClick={() => setShowThoughtsPopup(true)}
            id="thoughts-icon"
          />
        </div>
      </div>

      <div
        className={`flex flex-col ${(state.audioBio && dodoPageDetails?.audioBio && mode !== "edit") && "pt-5"} ${
          mode === "preview" ? "gap-5" : "gap-3"
        } items-center`}
      >
        <div>
          {editPageName ? (
            <input
              type="text"
              value={editPageName ? pageName : state.dodoPageName}
              onChange={(e) => setPageName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-xl min-w-36 w-fit outline-none text-black font-semibold text-center"
              autoFocus
              disabled={mode === "public" || mode === "preview"}
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
            id="audio-bio-button"
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
            <div 
              className="bg-white rounded-[10px] p-4 animate-slide-up"
              ref={thoughtsPopupRef}
              onClick={handlePopupContentClick}
            >
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
                        disabled={mode === "public" || mode === "preview"}
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
            <div 
              className="bg-white rounded-[10px] p-4 animate-slide-up flex flex-col gap-8"
              ref={audioBioPopupRef}
              onClick={handlePopupContentClick}
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <div className="text-xl font-semibold leading-none">
                    Record your voice
                  </div>
                  <div className="text-[#3D4966] text-xs leading-none">
                    Say anything for 20 sec
                  </div>
                </div>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                  ref={audioInputRef}
                />
                <div 
                  className="flex items-center flex-col gap-0.5 p-2 border-[1px] border-dashed border-[#979EAD] rounded-lg cursor-pointer"
                  onClick={() => audioInputRef.current?.click()}
                >
                  <Image src={Upload2} width={16} height={16} alt="Upload" />
                  <span className="text-brandPrimary text-[8px]">upload</span>
                </div>
              </div>
              <div className="h-16 w-full flex items-center justify-center">
                {isRecording && <Image src={Waves} alt="Audio Record" />}
              </div>
              <div className="flex items-center flex-col">
                <Image
                  src={AudioRecord}
                  alt="Audio Record"
                  onClick={isRecording ? stopRecording : startRecording}
                  className="cursor-pointer"
                />
                <span className="text-[#3D4966] text-xs font-medium">
                  {isRecording ? "Press to stop" : "Press to start"}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  className="border-[1px] border-[#979EAD] rounded-full flex items-center gap-1 py-[14px] pl-[26px] pr-10"
                  onClick={playAudio}
                  disabled={!audioBlob}
                >
                  <span className="text-xs font-medium">
                    {isPlaying ? "Stop" : "Listen"}
                  </span>
                  <Image src={Speaker} alt="Speaker" />
                </button>
                <button
                  className="w-full bg-brandPrimary text-white font-semibold rounded-full"
                  onClick={handleSaveAudioBio}
                  disabled={!audioBlob}
                >
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