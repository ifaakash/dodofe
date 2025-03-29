
import { CURRENCY_ONES, CURRENCY_TENS } from "./constants";

/**
 * Formats a number as Indian Rupees (INR)
 * @param amount - The number to format as currency
 * @returns A formatted string representing the amount in INR
 */
export const formatCurrency = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

  // Remove .00 if the amount is a whole number
  return amount % 1 === 0 ? formattedAmount.replace(/\.00$/, '') : formattedAmount;
};


/**
 * Formats an ISO date string into a human-readable format
 * @param isoDate - ISO 8601 date string to format
 * @returns A formatted date string in "DD MMM YYYY" format, or "N/A" if no date provided
 */

export const formatDate = (isoDate: string | undefined) => {
  if (!isoDate) return "N/A";
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

/**
 * Formats an ISO date string into a human-readable format with long month name
 * @param isoDate - ISO 8601 date string to format
 * @returns A formatted date string in "DD MMM YYYY" format, or "N/A" if no date provided
 */
export const formatDateLong = (isoDate: string | undefined) => {
  if (!isoDate) return "N/A";
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatCurrencyInWords = (amount: number): string => {
  if (amount === 0) return "Zero";

  const convertChunk = (n: number): string => {
    if (n < 20) return CURRENCY_ONES[n];
    if (n < 100) return `${CURRENCY_TENS[Math.floor(n / 10)]} ${CURRENCY_ONES[n % 10]}`.trim();
    return `${CURRENCY_ONES[Math.floor(n / 100)]} Hundred ${convertChunk(n % 100)}`.trim();
  };

  const units = ["", "Thousand", "Lakh", "Crore"];
  let i = 0, words = "", numCopy = amount;

  while (numCopy > 0) {
    let chunk = numCopy % (i === 1 ? 100 : 1000);
    if (chunk > 0) {
      words = `${convertChunk(chunk)} ${units[i]} ${words}`.trim();
    }
    numCopy = Math.floor(numCopy / (i === 1 ? 100 : 1000));
    i++;
  }

  return words;

};
