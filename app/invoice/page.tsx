"use client";
import InvoiceOnboardingScreen from "@components/molecules/InvoiceOnboardingScreen/InvoiceOnboardingScreen";
import InvoiceDashboard from "@components/templates/invoiceDashboard/InvoiceDashboard";
import React, { useEffect, useState } from "react";
import { getUserDetails } from "api";
import { userDetailsProps } from "types";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "store/slice/loaderSlice";
import useLoaderVisibility from "hooks/useLoaderVisibility";

const Invoice = () => {
  const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null);
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';
  const { isVisible } = useLoaderVisibility();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {

      try {
        const res = await getUserDetails(userId);
        setUserDetails(res?.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchUserDetails();
  }, [userId, dispatch]);

  return (
    <div>
      {(!userDetails || userDetails.invoices.length < 1) && !isVisible ? (
        <InvoiceOnboardingScreen />
      ) : (
        <InvoiceDashboard userDetails={userDetails} />
      )}
    </div>
  );
};

export default Invoice;
