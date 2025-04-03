"use client";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from 'wavesurfer.js'

import Image from "next/image";
import WhatsOnYourMind from "public/assets/thoughts.svg";
import ReadMyMind from "public/assets/thoughts1.svg";
import Pen from "public/icons/EditPen.svg";
import PlusCircle from "public/icons/plusCircle.svg";
import EmptyImage from "public/assets/emptyImage.svg";
import { X } from "lucide-react";
import Quote from "public/icons/Quote.svg";
import Upload2 from "public/icons/upload2.svg";
import micIcon from "public/icons/mic.svg";

import Speaker from "public/icons/Speaker.svg";
import SpeakerActive from "public/icons/speaker_active.svg";
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
import { isEmpty, isWebview, sendToNative } from "@utils/index";
import { WEBVIEW_ACTIONS } from "@utils/constants";
import { toast } from "react-toastify";

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
  const [thoughtEditMode, setThoughtEditMode] = useState(false);
  const [thought, setThought] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [pageName, setPageName] = useState<string | null>(state.dodoPageName);
  const [addAudioBioPopup, setAddAudioBioPopup] = useState(false);
  const [dodoPageImage, setDodoPageImage] = useState("");
  const ImageInputRef = useRef<HTMLInputElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProfileAudioPlaying, setIsProfileAudioPlaying] = useState(false);
  const profileAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioUrlRef = useRef<string | null>(null);

  // Create refs for popup content to handle click outside
  const thoughtsPopupRef = useRef<HTMLDivElement>(null);
  const audioBioPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setThought(dodoPageDetails?.thoughts);
    setPageName(dodoPageDetails?.name);
  }, [dodoPageDetails]);

  useEffect(() => {
    setCharacterCount(thought?.length);
  }, [thought]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle thoughts popup click outside
      if (
        showThoughtsPopup &&
        thoughtsPopupRef.current &&
        !thoughtsPopupRef.current.contains(event.target as Node)
        && document
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
        && document
      ) {
        // Don't close when clicking the audio bio button
        const audioBioButton = document.getElementById('audio-bio-button');
        if (!audioBioButton?.contains(event.target as Node)) {
          setAddAudioBioPopup(false);
        }
      }
    };

    if (document) {
      document.addEventListener('mousedown', handleClickOutside);
    }

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
    dispatch(setDodoPageThought(thought));
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

  useEffect(() => {
    const messageHandler = async (event) => {
      if (isWebview()) {
        try {
          const { action, status, base64, mimeType } = JSON.parse(event.data);
          console.log('Received from Native:', action, status);

          if (action === 'audioPermissionResponse') {
            if (status === 'granted') {
              window.ReactNativeWebView?.postMessage(JSON.stringify({ action: 'startRecording' }));

              setIsRecording(true);

              // Stop recording after 20 seconds
              setTimeout(() => {
                if (isRecording) {
                  stopRecording();
                }
              }, 20000);
            } else if (status === 'blocked') {
              toast.info("Microphone permission is blocked. Please enable it from settings.");
            } else {
              toast.error("Microphone permission denied.");
            }
          }

          if (action === 'audioRecordingComplete' && base64) {
            const binaryData = atob(base64);
            const byteNumbers = new Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
              byteNumbers[i] = binaryData.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            const blob = new Blob([byteArray], { type: mimeType || 'audio/mp4' });
            const url = URL.createObjectURL(blob);

            setAudioBlob(blob);
            dispatch(setIsAudioBioChanged(true));
            // Optionally: setAudioPreviewUrl(url) or pass to WaveSurfer
          }

        } catch (err) {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ action: err.message + " " + err })
            );
          }
          console.error('Message parse error:', err);
        }
      };
    }

    if (isWebview()) {
      document.addEventListener('message', messageHandler);
    }
    return () => {
      document.removeEventListener('message', messageHandler);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [])

  useEffect(() => {
    if (audioBlob) {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current); // clean up old
      }
      audioUrlRef.current = URL.createObjectURL(audioBlob);
    }
    return () => {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
    };
  }, [audioBlob]);

  const startRecording = async () => {
    try {
      // Check if running in a React Native WebView
      if (window.ReactNativeWebView) {
        // Request audio permission from React Native
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ action: 'requestAudioPermission' })
        );
      } else {
        // For web, start recording immediately
        await startRecordingProcess();
      }
    } catch (err) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'error', message: err.message + " " + err }));
      console.error("Error accessing microphone:", err);
    }
  };

  const startRecordingProcess = async () => {
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

    // Stop recording after 20 seconds
    setTimeout(() => {
      if (recorder.state === "recording") {
        stopRecording();
      }
    }, 20000);
  };

  const stopRecording = () => {
    if (isWebview()) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ action: 'stopRecording' })
      );
      setIsRecording(false);
      return; // ⛔ prevents calling mediaRecorder.stop()
    }

    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const initializeWaveSurfer = (audioUrl: string) => {
    if (!waveSurferRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: document.getElementById('waveform') as HTMLElement,
        waveColor: '#E2E4E9',
        progressColor: '#17CF62',
        backend: 'MediaElement',
      });

      waveSurferRef.current.load(audioUrl);

      waveSurferRef.current.on('ready', () => {
        waveSurferRef.current?.playPause();
      });
    } else {
      // If waveSurferRef.current already exists, toggle play/pause
      waveSurferRef.current?.playPause();
    }

    return () => {
      waveSurferRef.current?.destroy();
      waveSurferRef.current = null;
    };
  };

  const togglePlayPauseWave = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause();
    } else if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      initializeWaveSurfer(audioUrl);
    }
  };

  const playAudio = () => {
    if (!audioBlob || !audioUrlRef.current) {
      console.log("No audio recorded yet");
      return;
    }

    const audioUrl = audioUrlRef.current;

    if (!audioRef.current) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.addEventListener('ended', () => setIsPlaying(false));
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => console.error("Playback error:", err));
      setIsPlaying(true);
    }

    togglePlayPauseWave();
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

  useEffect(() => {
    console.log("audioBlob", audioBlob, isRecording);
    if (!isRecording && audioBlob) {
      waveSurferRef.current = WaveSurfer.create({
        container: document.getElementById('waveform') as HTMLElement,
        waveColor: '#E2E4E9',
        progressColor: '#17CF62',
        backend: 'MediaElement',
      });

      const audioUrl = URL.createObjectURL(audioBlob);
      waveSurferRef.current.load(audioUrl);

      waveSurferRef.current.on('ready', () => {
        waveSurferRef.current.on('click', () => {
          waveSurferRef.current.playPause();
        });
      });

      return () => {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      };
    }
  }, [isRecording, audioBlob]);

  useEffect(() => {
    if (audioRef.current) {
      console.log("audioRef.current", audioRef.current);
      const updateTime = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };

      audioRef.current.addEventListener('timeupdate', updateTime);

      return () => {
        audioRef.current?.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [audioRef.current]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (addAudioBioPopup && dodoPageDetails.audioBio) {
      const audioUrl = dodoPageDetails.audioBio;
      console.log("audioUrl", audioUrl);

      const fetchAndLoadAudio = async () => {
        try {
          const response = await fetch(audioUrl);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);

          waveSurferRef.current = WaveSurfer.create({
            container: document.getElementById('waveform') as HTMLElement,
            waveColor: '#E2E4E9',
            progressColor: '#17CF62',
            backend: 'MediaElement',
          });

          waveSurferRef.current.load(blobUrl);

          waveSurferRef.current.on('ready', () => {
            waveSurferRef.current?.playPause();
          });
        } catch (err) {
          console.error('Error loading audio blob:', err);
        }
      };

      // Prevent multiple instances
      if (!waveSurferRef.current) {
        fetchAndLoadAudio();
      }

      return () => {
        waveSurferRef.current?.destroy();
        waveSurferRef.current = null;
      };
    }
  }, [addAudioBioPopup, dodoPageDetails?.audioBio]);

  return (
    <div
      className={`flex flex-col items-center ${mode === "preview" ? "gap-[10px]" : "gap-3"
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
          {
            mode === "edit" || "preview" ? (
              <div>

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
                    <Image src={EmptyImage} alt="Empty Image" width={42} height={42} />
                  </div>
                )}
              </div>
            ) : (
              <div>
                {dodoPageDetails?.profilePicture ? (
                  <div className="w-[88px] h-[88px] rounded-full overflow-hidden">
                    <Image
                      src={dodoPageDetails.profilePicture}
                      alt="Dodo Page Image"
                      width={88}
                      height={88}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[88px] h-[88px] rounded-full bg-[#C7C6CB] border-[1px] border-white flex items-center justify-center cursor-pointer">
                    <Image src={EmptyImage} alt="Empty Image" width={42} height={42} />
                  </div>
                )}
              </div>
            )
          }
          {
            mode !== "edit" && dodoPageDetails?.audioBio && (
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

        {(mode === "edit" || thought !== '' || thought !== null) &&
          (
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
          )
        }
      </div>

      <div
        className={`flex flex-col ${(state.audioBio && dodoPageDetails?.audioBio && mode !== "edit") && "pt-5"} ${mode === "preview" ? "gap-5" : "gap-3"
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
            onClick={() => {
              setAddAudioBioPopup(true)
            }
            }
            id="audio-bio-button"
          >
            <div className="text-xs font-medium text-[#414D55]">
              {dodoPageDetails.audioBio ? "Edit" : "Add"} Audio Bio
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
                      <div> {characterCount}/60 Characters </div>
                    )}
                  </div>
                  <div className="w-80">
                    {!thoughtEditMode ? (
                      <textarea
                        value={thought ? thought : ''}
                        disabled={mode === "public" || mode === "preview"}
                        onChange={(e) => {
                          if (e.target.value.length <= 60) {
                            setThought(e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height =
                              e.target.scrollHeight + "px";
                          }
                        }}
                        className="w-80 outline-none resize-none overflow-hidden font-semibold"
                        style={{ height: "auto" }}
                      />
                    ) : (
                      <div
                        className="font-semibold text-black text-center cursor-pointer"
                        onClick={() => setThoughtEditMode(true)}
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {thought === "" ? thought : "Start typing..."}
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
                {isRecording ? (
                  <Image src={Waves} alt="Audio Record" />
                ) : (
                  <div id="waveform" className="w-full"></div>
                )}
              </div>
              <div className="text-center mt-2" style={{ minHeight: '24px' }}>
                {isPlaying && formatTime(currentTime)}
              </div>
              <div className="flex items-center flex-col">
                <div className="relative w-12 h-12">
                  {isRecording && (
                    <>
                      <span className="absolute inset-0 animate-wave bg-gray-300 rounded-full opacity-50"></span>
                      <span className="absolute inset-0 animate-wave2 bg-gray-300 rounded-full opacity-30"></span>
                    </>
                  )}
                  <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Image
                      src={micIcon}
                      alt="Audio Record"
                      width={36}
                      height={36}
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`cursor-pointer ${isRecording ? 'wave-animation' : ''}`}
                    />
                  </div>
                </div>
                <span className="text-[#3D4966] mt-2 text-xs font-medium">
                  {isRecording ? "Tap to stop" : "Tap to record"}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  className="border-[1px] border-[#979EAD] rounded-full flex items-center gap-1 py-[14px] pl-[26px] pr-10"
                  onClick={playAudio}
                  disabled={!audioBlob}
                  style={{ minWidth: '110px' }}
                >
                  <span className="text-xs font-bold" style={{ color: audioBlob ? "#3D4966" : "#979EAD" }}>
                    {isPlaying ? "Stop" : "Listen"}
                  </span>
                  <Image src={audioBlob ? SpeakerActive : Speaker} alt="Speaker" />
                </button>
                <button
                  className="w-full bg-brandPrimary text-white font-semibold rounded-full"
                  onClick={handleSaveAudioBio}
                  disabled={!audioBlob}
                >
                  Save in draft
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