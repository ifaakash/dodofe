'use client'
import React from "react";
import Image from "next/image";
import LeftArrow from "public/icons/leftArrow.svg";
import cx from "classnames";
import styles from "./invoiceOnboaring.module.css";
import NewButton from "@components/atoms/Button/NewButton";
import OnboardingIcon from "public/assets/onboardingImg.svg";
import DoubleTick from "public/icons/doubleTick.svg";
import DodoCoin from "public/icons/dodoCoin.svg";
import { useRouter } from "next/navigation";

const InvoiceOnboardingScreen = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/invoice/create");
  };

  return (
    <div
      className={cx(
        "bg-[#FEFBFB] relative invoice-onboarding-main h-[calc(100vh-78px)] flex flex-col",
        styles.invoiceOnboardingScreen
      )}
    >
      <div className="p-5">
        <div className="p-2 rounded-[10px] border-[1px] w-fit border-[#EAE9EC]">
          <Image
            src={LeftArrow}
            width={20}
            className="aspect-square"
            alt="left arrow"
          />
        </div>
      </div>

      <div className="flex justify-center items-center h-full flex-col gap-9 mb-24">
        <Image src={OnboardingIcon} width={120} alt="onboarding icon" />
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold text-center">
            Create stunning invoices <br /> with just a few clicks!
          </div>
          <div className="flex gap-3 items-center">
            <div>Effortless</div>
            <div className="w-[6px] h-[6px] rounded-full bg-brandPrimary"></div>
            <div>fast</div>
            <div className="w-[6px] h-[6px] rounded-full bg-brandPrimary"></div>
            <div>Professional</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-5">
          <div>Features</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-[10px]">
              <Image src={DoubleTick} alt="double tick" />
              <div className="text-sm text-[#5E6C84]">
                Instant Invoice Generation
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <Image src={DoubleTick} alt="double tick" />
              <div className="text-sm text-[#5E6C84]">PDF and Link Sharing</div>
            </div>
            <div className="flex items-center gap-[10px]">
              <Image src={DoubleTick} alt="double tick" />
              <div className="text-sm text-[#5E6C84]">
                Get reminders for due dates
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <Image src={DoubleTick} alt="double tick" />
              <div className="text-sm text-[#5E6C84]">
                Automated Calculations
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <Image src={DoubleTick} alt="double tick" />
              <div className="text-sm text-[#5E6C84]">Secure & Accessible</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full px-5 py-4 flex flex-col gap-[10px]">
        <div className="flex justify-center gap-1 text-sm">
          <Image src={DodoCoin} width={20} alt="dodo coin" />
          <div className="font-semibold">50</div>
          <div className="font-normal">per invoice</div>
        </div>
        <NewButton variant="primary" size="large" onClick={() => {handleNavigation()}}>
          Create invoice
        </NewButton>
      </div>
    </div>
  );
};

export default InvoiceOnboardingScreen;
