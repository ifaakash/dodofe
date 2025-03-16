"use client";
import { useEffect, useState } from "react";
import Home from "./home/page";

import Modal from "components/molecules/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { toggleLogoutModalState } from 'store/slice/commonSlice';
import { ROUTE_CONSTANTS } from "@utils/constants";
import { useRouter } from "next/navigation";
import { Button } from "@components/atoms";


export default function App() {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: any) => state.common.logoutModalState);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    router.push(ROUTE_CONSTANTS.LOGIN);
  }

  const handleCancel = () => {
    dispatch(toggleLogoutModalState());
  }

  console.log(isModalOpen);
  return (
    <>
      <Home />

      {isModalOpen && (
        <Modal visible={isModalOpen} onClose={handleCancel} isBackgroundBlur>
          <>
            <p className="mb-8 mt-2 text-lg">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-2 w-full">
              <Button
                size="medium"
                className="w-full p-2"
                variant="contained"
                onClick={handleCancel}
                text="Cancel"
              />
              <Button
                size="medium"
                className="w-full p-2"
                variant="outline"
                onClick={handleLogout}
                text="Logout"
                btnColor="theme-1"
              />
            </div>
          </>
        </Modal >
      )
      }
    </>
  );
}
