"use client";

import styles from "./addStuff.module.css";
import cx from "classnames";
import Image from "next/image";
import Button from "@components/atoms/Button";

import leftArrow from "public/icons/leftArrow.svg";
import { useEffect, useState } from "react";
import Modal from "@components/molecules/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTE_CONSTANTS, socialPlatforms, STORAGE_CONSTANTS } from "@utils/constants";
import { isEmpty } from "@utils/index";
import { getUserDetails, updateUserDetails } from "api";
import { loadState } from "@utils/localStorage";
import { toast } from "react-toastify";


export default function AddSocialLink({ pageTitle }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams?.get("userId") || '';

  const [socialInputs, setSocialInputs] = useState<Record<string, string>>({
    instagram: '',
    facebook: '',
    youtube: '',
    telegram: '',
    snapchat: '',
    twitter: '',
    linkedin: '',
    github: '',
    behance: '',
    dribble: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await getUserDetails(userId);

        if (res?.socialLinks) {
          const { socialLinks } = res;

          console.log("socialLinks from API:", socialLinks); // Log the entire socialLinks object

          setSocialInputs((prevInputs) => {
            const updatedInputs = { ...prevInputs };

            socialPlatforms.forEach((platform) => {
              if (socialLinks[platform.name]) {
                updatedInputs[platform.name] = socialLinks[platform.name];
              }
            });

            return updatedInputs;
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSocialInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialInputs((prev) => ({ ...prev, [name]: value }));
  };

  const redirectToHome = async () => {
    const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';
    const blockId = searchParams?.get("blockId") || '';

    try {
      const res = await updateUserDetails(userId, { socialLinks: socialInputs })

      toast.success('Social links uploaded successfully! Publish to make it live.')

      console.log('Social links uploaded successfully');
    } catch (error) {
      console.error('Error uploading social links:', error);
    }

    router.push(ROUTE_CONSTANTS.LINKS + `?userId=${userId}&blockId=${blockId || ''}`, { scroll: false });
  };

  const linksFooterUI = () => {
    return (
      <div className="bg-theme h-16 flex fixed flex-col absolute bottom-0 w-full">
        <div className="flex flex-row">
          <Button
            text="Save"
            btnColor="theme-1"
            className="mx-4 my-2 w-full rounded-xl font-bold py-2"
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
      <div className="my-20 w-full">
        {socialPlatforms.map((platform) => (
          <div key={platform.name} className="flex items-center mb-4">
            {/* Icon container with a square box, bg color, padding, and rounded border */}
            <div className="flex justify-center items-center bg-white p-2 rounded-md h-12 w-12">
              <Image
                height={18}
                width={18}
                src={platform.icon}
                alt={`${platform.displayName} icon`}
                onClick={() => router.back()}
              />
            </div>

            <input
              type="text"
              name={platform.name}
              placeholder={`Paste your ${platform.displayName} profile`}
              value={socialInputs[platform.name]}
              onChange={handleSocialInput}
              className="ml-2 flex-grow h-12 border border-gray-300 rounded-lg px-4 focus:outline-none"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-4 flex flex-col items-center">
      {getHeader()}

      {getSocialInputUI()}

      {linksFooterUI()}
    </div>
  );
}
