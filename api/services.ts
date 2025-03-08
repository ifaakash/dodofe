import { Get, Patch, Post, Put, Delete, BASE_URL } from "api";
import API_CONSTANTS from "./constants";

export const sendOtp = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.sendOtp, payload);

export const registerUser = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.registerUser, payload);

export const completeProfile = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.completeProfile, payload);

export const getUserDetails = async (userId: string): Promise<any> =>
  Get<any>(API_CONSTANTS.getUserDetails + API_CONSTANTS.slash + userId);

export const updateUserDetails = async (
  userId: string,
  payload: any
): Promise<any> =>
  Post<any>(
    API_CONSTANTS.updateUserDetails + API_CONSTANTS.slash + userId,
    payload,
    { "Content-Type": "multipart/form-data" }
  );

export const createUserBlock = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.createUserBlocks, payload);

export const getUserBlocks = async (userId: string): Promise<any> =>
  Get<any>(API_CONSTANTS.getUserBlocks + API_CONSTANTS.slash + userId);

export const createLink = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.createLink, payload, {
    "Content-Type": "multipart/form-data",
  });

export const reorderLink = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.reorderLink, payload);

export const getLinkList = async (
  userId: string,
  blockId?: string
): Promise<any> =>
  Get<any>(API_CONSTANTS.getLinks + API_CONSTANTS.slash + userId);

export const getLinkDetail = async (linkId: string): Promise<any> =>
  Get<any>(API_CONSTANTS.getLinkDetail + API_CONSTANTS.slash + linkId);

export const editLink = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.editLink, payload, {
    "Content-Type": "multipart/form-data",
  });

export const archiveLink = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.archiveLink, payload);

export const deleteLink = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.deleteLink, payload);

export const publishData = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.publishData, payload);

export const getPublishedData = async (userId: string): Promise<any> =>
  Get<any>(API_CONSTANTS.publishData + API_CONSTANTS.slash + userId);

export const createRecipient = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.createRecipient, payload);

export const createClient = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.createClient, payload);

export const addBankDetails = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.addBankDetails, payload);

export const createInvoice = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.createInvoice, payload);

export const getInvoiceById = async (invoiceId: any): Promise<any> =>
  Get<any>(API_CONSTANTS.getInvoceById + API_CONSTANTS.slash + invoiceId);

export const getAllInvoices = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.getAllInvoices, payload);

export const getInvoiceStats = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.getInvoiceStats, payload);

export const addSubHeading = async (payload: any): Promise<any> =>
  Put<any>(API_CONSTANTS.addSubHeading, payload);

export const createBlockWithMedia = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.createBlock, payload, {
    "Content-Type": "multipart/form-data",
  });

export const createBlock = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.createBlock, payload);

export const getDodoPageByURL = async (url: any): Promise<any> =>
  Get<any>(
    API_CONSTANTS.getDodoPageByURL +
    API_CONSTANTS.slash +
    url
  );

export const reorderBlocks = async (formattedBlocks: {
  dodoPageId: string;
  blocks: { blockId: string; newIndex: number }[];
}): Promise<{ success: boolean; message?: string }> => {
  return Post<any>(API_CONSTANTS.reorderBlocks, formattedBlocks);
};

export const updateDodoPage = async (payload: any): Promise<any> =>
  Patch<any>(API_CONSTANTS.updateDodoPage, payload, {
    "Content-Type": "multipart/form-data",
  });

// export const updateDodoPage = async (payload: any): Promise<any> => {
//   Patch<any>(API_CONSTANTS.updateDodoPage, payload);
// };

export const archiveBlock = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.archiveBlock, payload);

export const getArchivedBlocks = async (dodoPageURL: any): Promise<any> =>
  Get<any>(API_CONSTANTS.getArchivedBlocks + API_CONSTANTS.slash + dodoPageURL);

export const getBlockById = async (blockId: any): Promise<any> =>
  Get<any>(API_CONSTANTS.getBlockById + API_CONSTANTS.slash + blockId);

export const addVoteToPoll = async (payload: any): Promise<any> =>
  Post<any>(API_CONSTANTS.votePoll, payload);

export const deleteBlock = async (payload: any): Promise<any> =>
  Delete<any>(API_CONSTANTS.deleteBlock, payload);

export const updateBlock = async (payload: any): Promise<any> =>
  Patch<any>(API_CONSTANTS.updateBlock, payload);

export const updateBlockWithMedia = async (payload: any): Promise<any> =>
  Patch<any>(API_CONSTANTS.updateBlock, payload, {
    "Content-Type": "multipart/form-data",
  });

export const toggleInvoicePaymentStatus = async (payload: any): Promise<any> =>
  Put<any>(API_CONSTANTS.toggleInvoicePaymentStatus, payload);

