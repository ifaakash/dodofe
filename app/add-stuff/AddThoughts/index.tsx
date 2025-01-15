"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS } from "@utils/constants";
import { createLink, updateUserDetails } from "api";
import { toast } from "react-toastify";

export default function AddThoughts({ pageTitle }: any) {
  const [heading, setHeading] = useState("");
  const [thought, setThought] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const blockId = searchParams?.get("blockId") || '';
  const userId = searchParams?.get("userId") || '';

  const redirectToHome = () => {
    const payload = {
      userId,
      blockId,
      urls: [{
        url: '',
        description: heading,
        type: BLOCKS.HEADING
      }]
    };

    createLink(payload)
      .then(() => {
        router.push(ROUTE_CONSTANTS.LINKS + `?userId=${userId}&blockId=${blockId || ''}`, { scroll: false });
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  const handleChange = (e: any) => {
    setThought(e.target.value);
  };

  const onSave = async () => {
    try {
      await updateUserDetails(userId, { thoughts: thought });
      toast.success('Your thoughts are saved! Publish to make it live.');
    } catch (error) {
      console.error('Error uploading thoughts:', error);
    }
  };

  const getHeader = () => {
    return (
      <div className="bg-theme h-16 flex fixed flex-row items-center w-full">
        <Image
          height={16}
          width={16}
          src="/icons/leftArrow.svg"
          alt="back arrow"
          className="ml-4 cursor-pointer"
          onClick={() => router.back()}
        />
        <span className="text-sm clr-grey font-bold ml-2">Add {pageTitle}</span>
      </div>
    );
  };

  const getThoughtsUI = () => {
    return (
      <>
        <div className="flex items-start mt-16">
          <span className="text-6xl text-gray-300 font-serif mr-2">“</span>
          <textarea
            className="w-80 h-32 p-4 text-lg border-0 focus:ring-0 focus:outline-none resize-none text-gray-800"
            placeholder="Write your thoughts here..."
            value={thought}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="mx-4 flex flex-col items-center">
      {getHeader()}
      {getThoughtsUI()}
    </div>
  );
}
