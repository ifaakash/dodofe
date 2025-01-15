"use client";
import Screen from "@components/molecules/Screen";

import { useRouter, useSearchParams } from "next/navigation";
import { BLOCKS, ROUTE_CONSTANTS, STORAGE_CONSTANTS } from "@utils/constants";
import AddSocialLink from "./AddSocialLink";
import AddLink from "./AddLink";
import AddVideo from "./AddVideo";
import AddSeperator from "./AddSeperator";
import AddHeading from "./AddHeading";
import { Suspense, useEffect, useState } from "react";
import { createLink, editLink, getLinkDetail } from "api";
import { loadState } from "@utils/localStorage";
import { isEmpty } from "@utils/index";
import AddThoughts from "./AddThoughts";

function AddStuff() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dataForEdit, setDataForEdit] = useState({});

  const pageType = searchParams?.get("pageType") || BLOCKS.LINK;
  const blockId = searchParams?.get("blockId") || '';
  const userId = searchParams?.get("userId") || '';
  const linkId = searchParams?.get("linkId") || '';
  const description = searchParams?.get("description") || '';
  const isEditMode = !isEmpty(linkId);

  const addNewData = (urlData: any) => {
    const formData = new FormData();

    urlData.forEach((linkData: any, index: number) => {
      formData.append(`urls[${index}][url]`, linkData.url);
      formData.append(`urls[${index}][description]`, linkData.description);
      formData.append(`urls[${index}][type]`, linkData.type);
      formData.append(`urls[${index}][badge]`, linkData?.badge);
      if (linkData.audio) {
        formData.append(`urls[${index}][audio]`, linkData.audio, `audio_${index}.ogg`);
      }
    });

    formData.append('userId', userId);
    formData.append('blockId', blockId);

    createLink(formData).then((res) => {
      router.push(ROUTE_CONSTANTS.LINKS + `?userId=${userId}&blockId=${blockId || ''}`, { scroll: false });
    }).catch((err) => {
      console.log('error', err);
    });
  }

  const editData = (linkData: any) => {
    const formData = new FormData();

    formData.append(`url`, linkData.url);
    formData.append(`description`, linkData.description);
    formData.append(`type`, linkData.type);
    formData.append(`badge`, JSON.stringify(linkData?.badge));

    if (linkData.audio) {
      formData.append(`audio`, linkData.audio, `audio.ogg`);
    }

    formData.append('userId', userId);
    formData.append('blockId', blockId);
    formData.append('linkId', linkId);

    editLink(formData).then((res) => {
      router.push(ROUTE_CONSTANTS.LINKS + `?userId=${userId}&blockId=${blockId || ''}`, { scroll: false });
    }).catch((err) => {
      console.log('error', err);
    });
  }

  useEffect(() => {
    if (isEditMode) {
      getLinkDetail(linkId).then((res) => {
        setDataForEdit(res)
      }).catch(() => {
        console.log('error')
      })
    }
  }, [])

  return (
    <Screen>
      {pageType === BLOCKS.LINK && <AddLink pageTitle="link" dataForEdit={dataForEdit} editData={editData} addNewData={addNewData} />}
      {pageType === BLOCKS.SOCIAL && <AddSocialLink pageTitle="social link" dataForEdit={dataForEdit} addNewData={addNewData} />}
      {pageType === BLOCKS.VIDEO && <AddVideo pageTitle="video" dataForEdit={dataForEdit} addNewData={addNewData} />}
      {pageType === BLOCKS.HEADING && <AddHeading pageTitle="heading" headingName={description} dataForEdit={dataForEdit} addNewData={addNewData} />}
      {pageType === BLOCKS.SEPARATOR && <AddSeperator pageTitle="separator" separatorName={description} dataForEdit={dataForEdit} addNewData={addNewData} />}
      {pageType === BLOCKS.THOUGHTS && <AddThoughts pageTitle="thoughts" dataForEdit={dataForEdit} addNewData={addNewData} />}
    </Screen>
  );
}

const AddStuffPage = () => {
  return <Suspense>
    <AddStuff />
  </Suspense>
}

export default AddStuffPage;
