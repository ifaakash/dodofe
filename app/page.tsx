"use client";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Image from "next/image";

import Home from "./home/page";

import Modal from "components/molecules/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { ROUTE_CONSTANTS } from "@utils/constants";
import { useRouter } from "next/navigation";
import { Button } from "@components/atoms";
import LandingPage from "./landing";


export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <>
      {isMobile ? <Home /> : <LandingPage />}
    </>
  );
}
