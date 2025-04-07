export type MetaTagsData = {
  title: string;
  desc: string;
  routeName: string;
  noIndex: boolean;
  featuredImage?: string;
  canonicalUrl?: string;
};

export interface InvoiceItem {
  _id?: string;
  description: string;
  quantity: number;
  rate: number;
  price: number;
  name: string;
}

export interface ClientDetailsProps {
  _id?: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  gst: string;
  pan: string;
  logo: string;
}

export interface RecipientDetails {
  _id?: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  gst: string;
  pan: string;
  logo: string;
}

export interface BankDetails {
  _id?: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountName: string;
  address: string;
  upiId: string;
}

export interface DetailProps {
  _id?: string;
  name: string;
  email: string;
  zipcode: string;
  state: string;
  city: string;
  address: string;
  gst: string;
  pan: string;
  logo: string;
}

interface BaseInvoice {
  items: InvoiceItem[];
  gst: number;
  tds: number;
  discount: number;
  note: string;
  dueDate: string;
  invoiceDate: string;
  status: string;
  invoiceNumber: number;
  subTotal: number;
  totalAmount: number;
  subHeading: string;
  clientDetails: ClientDetailsProps;
  recipientDetails: RecipientDetails;
  bankDetails: BankDetails;
  createdAt: string;
  id: string;
}

export interface InvoiceWithDetails extends BaseInvoice {
  currentClientDetails: DetailProps;
  currentRecipientDetails: DetailProps;
  currentBankDetails: BankDetails;
  clientDetailsID: string | null;
  recipientDetailsID: string | null;
  bankDetailsID: string | null;
  showInputFields: boolean;
}

export interface InvoiceWithIDs extends BaseInvoice {
  clientDetailsID: string;
  recipientDetailsID: string;
  bankDetailsID: string;
}

export type InvoiceProps = InvoiceWithDetails;

export interface InvoiceHistory {
  invoice: any;
  onEdit: any;
  onMarkAsPaid: any;
  timeFrame: any;
}

export interface InvoiceHistoryCard {
  invoice: InvoiceProps;
  onEdit?: any;
  onMarkAsPaid?: any;
  timeFrame?: any;
  handleCardExpand?: any;
  isExpanded?: boolean;
  setIsPaymentStatusChanged?: any;
}

export interface StatusBadgeProps {
  isDue: boolean;
  status: string;
  isExpanded: boolean;
}

export interface dodoPagesProps {
  id: string;
  name: string;
  url: string;
  profilePicture: string;
}

export interface userDetailsProps {
  id: string;
  firebaseUid: string;
  name: string;
  mobileNumber: string;
  interestCategories: string[];
  dodoPages: dodoPagesProps[];
  bankDetails: BankDetails[];
  invoices: string[];
  clientDetails: ClientDetailsProps[];
  recipientDetails: RecipientDetails[];
}

export interface InvoiceUserCardProps {
  detail: DetailProps;
  userID: string;
  setUserID: (id: string) => void;
}


export interface Block {
  id?: string;
  blockType: string;
  blockData: any;
  blockPositionalIndex?: number;
  blockCardSize: string;
  userId?: string;
  dodoPageId?: string;
  toRemove?: boolean
  toArchive?: boolean
  isActive?: boolean
  isNew?: boolean
  isUpdated?: boolean
}

export interface UserInvoicesData {
  outStandingAmount: number;
  paidAmount: number;
  pendingAmount: number;
  unpaidAmount: number;
  invoices: {
    created: number;
    paid: number;
    due: number;
  };
}

export interface AnalyticsData {
    totalViews: number;
    uniqueVisitors: number;
    averageDuration: number;
    totalClicks: number;
    topReferrers: Array<{ source: string; count: number }>;
    blockInteractions: Array<{
        blockId: string;
        blockType: string;
        interactionCount: number;
    }>;
    viewsByDate: Array<{ date: string; count: number }>;
    deviceBreakdown: Array<{ device: string; percentage: number }>;
}

export type Timeframe = "day" | "week" | "month" | "overall" | "year";


// Dodo Coins

export enum TransactionType {
  EARNED = "EARNED",
  SPENT = "SPENT",
  REDEEMED = "REDEEMED",
}

export enum CoinMilestoneType {
  CREATE_INVOICE = "CREATE_INVOICE",
  PAGE_VIEWS = "PAGE_VIEWS",
  CREATE_DODO_PAGE = "CREATE_DODO_PAGE",
  CREATE_BLOCK = "CREATE_BLOCK",
  // Add more milestone types as needed
}

export enum CoinAmount {
  CREATE_INVOICE = 5,
  DAILY_CHECKIN = 1,
}