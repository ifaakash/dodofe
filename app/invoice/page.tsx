"use client";
import InvoiceOnboardingScreen from "@components/molecules/InvoiceOnboardingScreen/InvoiceOnboardingScreen";
import InvoiceDashboard from "@components/templates/invoiceDashboard/InvoiceDashboard";
import React, { useEffect, useState } from "react";
import { getUserDetails } from "api";
import { userDetailsProps } from "types";
import { loadState } from "@utils/localStorage";
import { STORAGE_CONSTANTS } from "@utils/constants";




const Invoice = () => {
  const [userDetails, setUserDetails] = useState<userDetailsProps | null>(null);
  const userId: string = loadState(STORAGE_CONSTANTS.userId) || '';

  useEffect(() => {
    getUserDetails(userId).then((res) => {
      setUserDetails(res?.user);
    })
  }, [])

  return (
    <div>
      {!userDetails || userDetails.invoices.length < 1 ? (
        <InvoiceOnboardingScreen/>
      ) : (
        <InvoiceDashboard userDetails={userDetails}/>
      )}
    </div>
  );
};

export default Invoice;
