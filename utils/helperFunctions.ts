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