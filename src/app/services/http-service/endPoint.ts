import config from "./config";

export const ApiEndPoint = {
  getOtp: `${config.serverURL}getOTP`,
  addPlant: `${config.serverURL}addPlant`,
  verifyOtp: `${config.serverURL}verifyOtp`,
  updatePlant: `${config.serverURL}updatePlant`,
  updateAsset: `${config.serverURL}updateAsset`,
  getAllPlants: `${config.serverURL}getAllPlants`,
  getAllAssets: `${config.serverURL}getAllAssets`,
  addGuidedInspection: `${config.serverURL}addGuidedInspection`,
  getGuidedInspection: `${config.serverURL}getGuidedInspection`,
  assetSendForApproval: `${config.serverURL}assetSendForApproval`,
  syncExcelToExpertApp: `${config.serverURL}syncExcelToExpertApp`,
  removeGuidedInspection: `${config.serverURL}removeGuidedInspection`,
  updateGuidedInspection: `${config.serverURL}updateGuidedInspection`,
  getAllGuidedInspection: `${config.serverURL}getAllGuidedInspection`,
  getGuidedInspectionDetails: `${config.serverURL}getGuidedInspectionDetails`,
};
