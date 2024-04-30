import config from "./config";

export const ApiEndPoint = {
  getOtp: `${config.serverURL}getOTP`,
  addPlant: `${config.serverURL}addPlant`,
  verifyOtp: `${config.serverURL}verifyOtp`,
  updatePlant: `${config.serverURL}updatePlant`,
  updateAsset: `${config.serverURL}updateAsset`,
  getAllSites: `${config.serverURL}getAllSites`,
  getAllAssets: `${config.serverURL}getAllAssets`,
  sapConfiguration: `${config.serverURL}sapConfiguration`,
  getRequestedAssets: `${config.serverURL}getRequestedAssets`,
  addGuidedInspection: `${config.serverURL}addGuidedInspection`,
  getGuidedInspection: `${config.serverURL}getGuidedInspection`,
  assetSendForApproval: `${config.serverURL}assetSendForApproval`,
  syncExcelToExpertApp: `${config.serverURL}syncExcelToExpertApp`,
  removeGuidedInspection: `${config.serverURL}removeGuidedInspection`,
  updateGuidedInspection: `${config.serverURL}updateGuidedInspection`,
  getAllGuidedInspection: `${config.serverURL}getAllGuidedInspection`,
  getAllSapConfiguration: `${config.serverURL}getAllSapConfiguration`,
  getGuidedInspectionDetails: `${config.serverURL}getGuidedInspectionDetails`,
};
