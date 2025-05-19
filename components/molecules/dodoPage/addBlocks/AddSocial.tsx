"use client";
import NewButton from "@components/atoms/Button/NewButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { updateDodoPage } from "api";

import Web from "public/icons/globeEarth.svg";
import Insta from "public/icons/insta.svg";
import Facebook from "public/icons/fb.svg";
import Twitter from "public/icons/twitter.svg";
import LinkedIn from "public/icons/linkedIn.svg";
import Youtube from "public/icons/youtube.svg";
import Telegram from "public/icons/telegram.svg";
import Snapchat from "public/icons/snapchat.svg";
import Github from "public/icons/github.svg";
import Discord from "public/icons/discord.svg";
import Behance from "public/icons/behance.svg";
import Dribble from "public/icons/dribble.svg";
import EmailId from "public/icons/email.svg";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setIsSocialLinksChanged,
  setSocialLinks,
} from "store/slice/dodoPageSlice";
import { useSelector } from "react-redux";

const socialLinksData = [
  {
    title: "Website",
    icon: Web,
    placeholder: "Paste your personal website",
    value: "website",
  },
  {
    title: "Instagram",
    icon: Insta,
    placeholder: "Paste your Instagram profile",
    value: "instagram",
  },
  {
    title: "Facebook",
    icon: Facebook,
    placeholder: "Paste your Facebook profile",
    value: "facebook",
  },
  {
    title: "Youtube",
    icon: Youtube,
    placeholder: "Paste your Youtube profile",
    value: "youtube",
  },
  {
    title: "Telegram",
    icon: Telegram,
    placeholder: "Paste your Telegram profile",
    value: "telegram",
  },
  {
    title: "Snapchat",
    icon: Snapchat,
    placeholder: "Paste your Snapchat profile",
    value: "snapchat",
  },
  {
    title: "X",
    icon: Twitter,
    placeholder: "Paste your X (Twitter) profile",
    value: "twitter",
  },
  {
    title: "Github",
    icon: Github,
    placeholder: "Paste your Github profile",
    value: "github",
  },
  {
    title: "Discord",
    icon: Discord,
    placeholder: "Paste your Discord profile",
    value: "discord",
  },
  {
    title: "Behance",
    icon: Behance,
    placeholder: "Paste your Behance profile",
    value: "behance",
  },
  {
    title: "Dribble",
    icon: Dribble,
    placeholder: "Paste your Dribble profile",
    value: "dribble",
  },
  {
    title: "Email",
    icon: EmailId,
    placeholder: "Paste your Email ID",
    value: "email",
  },
];

type SocialLinkKeys =
  | "website"
  | "instagram"
  | "facebook"
  | "youtube"
  | "telegram"
  | "snapchat"
  | "twitter"
  | "github"
  | "discord"
  | "behance"
  | "dribble"
  | "email";

const AddSocial = ({
  dodoPageId,
  userId,
  dodopageUrl,
}: {
  dodoPageId: string;
  userId: string;
  dodopageUrl: string;
}) => {
  const [newSocialLinks, setNewSocialLinks] = useState<
    Record<SocialLinkKeys, string>
  >({
    website: "",
    instagram: "",
    facebook: "",
    youtube: "",
    telegram: "",
    snapchat: "",
    twitter: "",
    github: "",
    discord: "",
    behance: "",
    dribble: "",
    email: "",
  });

  const [linkValidity, setLinkValidity] = useState<
    Record<SocialLinkKeys, boolean>
  >({
    website: true,
    instagram: true,
    facebook: true,
    youtube: true,
    telegram: true,
    snapchat: true,
    twitter: true,
    github: true,
    discord: true,
    behance: true,
    dribble: true,
    email: true,
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const socialLinks = useSelector((state: any) => state.dodoPage.socialLinks);

  useEffect(() => {
    setNewSocialLinks({
      website: socialLinks?.website || "",
      instagram: socialLinks?.instagram || "",
      facebook: socialLinks?.facebook || "",
      youtube: socialLinks?.youtube || "",
      telegram: socialLinks?.telegram || "",
      snapchat: socialLinks?.snapchat || "",
      twitter: socialLinks?.twitter || "",
      github: socialLinks?.github || "",
      discord: socialLinks?.discord || "",
      behance: socialLinks?.behance || "",
      dribble: socialLinks?.dribble || "",
      email: socialLinks?.email || "",
    });
  }, [socialLinks]);

  const isValidUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?(www\\.)?" +
      "([a-zA-Z0-9.-]+)\\.(com|net|org|io|co|me|dev|tv|app|in)" + // Added "in"
      "(\\/([a-zA-Z0-9._-]+))?" +
      "(\\/@[a-zA-Z0-9._-]+)?" +
      "(\\/[a-zA-Z0-9._?=~-]*)?$",
      "i"
    );

    return !!urlPattern.test(url);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSocialLinks((prev) => ({ ...prev, [name as SocialLinkKeys]: value }));

    const isValid = name === "email" ? isValidEmail(value) : isValidUrl(value);

    setLinkValidity((prev) => ({
      ...prev,
      [name as SocialLinkKeys]: isValid,
    }));
  };


  const handleSubmit = async () => {
    const filteredSocialLinks = socialLinksData.reduce((acc: any, { value }) => {
      const linkValue = newSocialLinks[value as SocialLinkKeys];
      if (
        linkValue !== "" &&
        (value === "email" ? isValidEmail(linkValue) : isValidUrl(linkValue))
      ) {
        acc[value as SocialLinkKeys] = linkValue;
      }
      return acc;
    }, {} as Record<SocialLinkKeys, string>);

    dispatch(setSocialLinks(filteredSocialLinks));
    dispatch(setIsSocialLinksChanged(true));
    router.back();
  };


  console.log({
    newSocialLinks,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2 w-full pb-20">
          {socialLinksData.map(({ title, icon, placeholder, value }, index) => (
            <div key={index} className="flex flex-col gap-0.5">
              <div className="flex items-center gap-0.5">
                <div className="p-3 rounded-lg bg-white flex items-center justify-center">
                  <Image src={icon} alt={title} width={28} height={28} />
                </div>

                <input
                  name={value as SocialLinkKeys}
                  value={newSocialLinks[value as SocialLinkKeys]}
                  onChange={handleChange}
                  className="w-full border-[1px] placeholder:text-sm placeholder:text-gray-500 rounded-lg px-2 py-[13px]"
                  placeholder={placeholder}
                />
              </div>
              {!linkValidity[value as SocialLinkKeys] && (
                <span className="text-red-500 text-sm">Invalid link</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
        <NewButton
          size="large"
          variant="primary"
          className="w-full"
          onClick={handleSubmit}
        >
          Add to draft
        </NewButton>
      </div>
    </div>
  );
};

export default AddSocial;
