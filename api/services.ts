import { Get, Post, Put } from 'api';
import API_CONSTANTS from './constants';

export const sendOtp = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.sendOtp, payload);

export const registerUser = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.registerUser, payload);

export const completeProfile = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.completeProfile, payload);

export const getUserDetails = async (userId: string): Promise<any> => Get<any>(API_CONSTANTS.getUserDetails + API_CONSTANTS.slash + userId);

export const updateUserDetails = async (userId: string, payload: any): Promise<any> => Post<any>(API_CONSTANTS.updateUserDetails + API_CONSTANTS.slash + userId, payload, { 'Content-Type': 'multipart/form-data' });


export const createUserBlock = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.createUserBlocks, payload);

export const getUserBlocks = async (userId: string): Promise<any> => Get<any>(API_CONSTANTS.getUserBlocks + API_CONSTANTS.slash + userId);

export const createLink = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.createLink, payload, { 'Content-Type': 'multipart/form-data' });

export const reorderLink = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.reorderLink, payload);

export const getLinkList = async (userId: string, blockId?: string): Promise<any> => Get<any>(API_CONSTANTS.getLinks + API_CONSTANTS.slash + userId);

export const getLinkDetail = async (linkId: string): Promise<any> => Get<any>(API_CONSTANTS.getLinkDetail + API_CONSTANTS.slash + linkId);

export const editLink = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.editLink, payload, { 'Content-Type': 'multipart/form-data' });

export const archiveLink = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.archiveLink, payload);

export const deleteLink = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.deleteLink, payload);

export const publishData = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.publishData, payload);

export const getPublishedData = async (userId: string): Promise<any> => Get<any>(API_CONSTANTS.publishData + API_CONSTANTS.slash + userId);

export const createRecipient = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.createRecipient, payload);

export const createClient = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.createClient, payload);

export const addBankDetails = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.addBankDetails, payload);

export const createInvoice = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.createInvoice, payload);

export const getInvoiceById = async (invoiceId: any): Promise<any> => Get<any>(API_CONSTANTS.getInvoceById + API_CONSTANTS.slash + invoiceId);

export const getAllInvoices = async (payload: any): Promise<any> => Post<any>(API_CONSTANTS.getAllInvoices, payload);

export const getInvoiceStats = async (payload:any): Promise<any> => Post<any>(API_CONSTANTS.getInvoiceStats, payload);

export const addSubHeading = async (payload: any): Promise<any> => Put<any>(API_CONSTANTS.addSubHeading, payload);