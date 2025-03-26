import instaIcon from "public/icons/insta.svg";
import fbIcon from "public/icons/fb.svg";
import youtubeIcon from "public/icons/youtube.svg";
import snapchatIcon from "public/icons/snapchat.svg";
import githubIcon from "public/icons/github.svg";
import behanceIcon from "public/icons/behance.svg";
import dribbleIcon from "public/icons/dribble.svg";
import linkedInIcon from "public/icons/linkedIn.svg";
import telegramIcon from "public/icons/telegram.svg";
import twitterIcon from "public/icons/twitter.svg";

export const ColorConstants = {
  THEME1: "theme-1",
  THEME2: "theme-2",
  THEME3: "theme-3",
  THEME_GRADIENT1: "theme-gradient-1",
  THEME_GRADIENT2: "theme-gradient-2",
  LIGHT_THEME: "light-theme",
  SECONDARY_PINK: "secondary-pink",
  PRIMARY_BLUE: "primary-blue",
  SECONDARY_PURPLE: "secondary-purple",
  SUCCESS: "success",
  DANGER: "danger",
  WARNING: "warning",
  WHITE: "white",
};

export enum Size {
  FREE = "free",
  LARGE = "large",
  EXTRALARGE = "extraLarge",
  MEDIUM = "medium",
  REGULAR = "regular",
  SMALL = "small",
  TINY = "tiny",
}

export const ROUTE_CONSTANTS = {
  SLASH: "/",
  HOME: "/home",
  LINKS: "/links",
  ADD_STUFF: "/add-stuff",
  BASIC_DETAILS: "/basic-details",
  THEME_SELECT: "/theme-select",
  ERROR: "/404",
  LOGIN: "/login",
  PREVIEW: "/preview",
  INVOICE: "/invoice",
  CREATE: "/create",
  SENDER: "/sender",
  RECEIVER: "/receiver",
  DETAILS: "/details",
  PAYMENT_DETAILS: "/payment/details",
  FINAL_DETAILS: "/final-details",
  USER_CATEGORY: "/user-category",
  COINS: '/coins',
  DODOPAGE: "/dodo",
  SCRIPT_GENERATOR: "/script-generator",
  PRICE_CALCULATOR: "/price-calculator",
};

export const BLOCKS = {
  LINK: "link",
  SOCIAL: "social",
  VIDEO: "video",
  SEPARATOR: "seperator",
  HEADING: "heading",
  THOUGHTS: "thoughts"
};

export const STORAGE_CONSTANTS = {
  TOKEN_SESSION_KEY: 'token',
  MOBILE: 'mobile',
  userId: 'userId',
  hasSeenSplash: 'hasSeenSplash'
}

export const ROUTE_TYPE = {
  PRIVATE: 'private',
  PUBLIC: 'public',
  RESTRICTED: 'restricted'
}

export const PLAYER_STATUS = {
  PAUSE: 'pause',
  PLAY: 'play'
}

export const SEPARATOR = {
  LINE: "line",
  SOLID: "solid",
  OR: "or",
};

export const BADGE_COLORS = [
  { name: "Sunflower", color: "#FFCF58" },
  { name: "Grapefruit", color: "#FB7053" },
  { name: "Aqua", color: "#51C0EB" },
  { name: "Plum", color: "#8066BE" },
];

export const BADGE_COLORS_MAP: { [key: string]: string } = {
  Sunflower: "#FFD700",
  Grapefruit: "#FF6347",
  Aqua: "#00FFFF",
  Plum: "#DDA0DD",
};

export const socialPlatforms: any[] = [
  { name: 'instagram', displayName: 'Instagram', icon: instaIcon },
  { name: 'facebook', displayName: 'Facebook', icon: fbIcon },
  { name: 'youtube', displayName: 'Youtube', icon: youtubeIcon },
  { name: 'snapchat', displayName: 'Snapchat', icon: snapchatIcon },
  { name: 'twitter', displayName: 'Twitter', icon: twitterIcon },
  { name: 'linkedin', displayName: 'Linkedin', icon: linkedInIcon },
  { name: 'github', displayName: 'Github', icon: githubIcon },
  { name: 'behance', displayName: 'Behance', icon: behanceIcon },
  { name: 'dribble', displayName: 'Dribble', icon: dribbleIcon },
  { name: 'telegram', displayName: 'Telegram', icon: telegramIcon },
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Puducherry",
  "Lakshadweep",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Jammu and Kashmir",
  "Ladakh",
];

export const BADGES = [
  {
    text: "Sunflower",
    backgroundColor: "#FFCF58",
    color: "#000000",
  },
  {
    text: "Grapefruit",
    backgroundColor: "#FB7053",
    color: "#FFFFFF",
  },
  {
    text: "Aqua",
    backgroundColor: "#51C0EB",
    color: "#FFFFFF",
  },
  {
    text: "Plum",
    backgroundColor: "#8066BE",
    color: "#FFFFFF",
  },
];

export const WEBVIEW_ACTIONS = {
  requestAudioPermission: 'requestAudioPermission',
  copyToClipboard: 'copyToClipboard',
  pasteFromClipboard: 'pasteFromClipboard',
  openUrlInBrowser: 'openUrlInBrowser',
  shareContent: 'shareContent',
  requestLocationPermission: 'requestLocationPermission',
  vibrateDevice: 'vibrateDevice'
}

export const TIME_PERIODS = [
  {
    label: "Overall",
    value: "overall",
  },
  {
    label: "Week",
    value: "week",
  },
  {
    label: "Month",
    value: "month",
  },
  {
    label: "Year",
    value: "year",
  },
];