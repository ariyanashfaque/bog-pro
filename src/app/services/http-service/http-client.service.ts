import {
  SiteModel,
  AssetModel,
  AssetResponseModel,
  SitesResponseModel,
  AssetsResponseModel,
} from "src/app/store/models/asset.model";
import { Observable } from "rxjs";
import { ApiEndPoint } from "./endPoint";
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class HttpService {
  token: string = "";
  headers: HttpHeaders = new HttpHeaders({
    Authorization: "Bearer " + this.token,
  });
  private http = inject(HttpClient);

  constructor() {}

  // GetOtp = (data?: UserResponseModel): Observable<UserResponseModel> => {
  //   return this.http.post<UserResponseModel>(ApiEndPoint.getOtp, data);
  // };

  // VerifyOtp = (data?: UserResponseModel): Observable<UserResponseModel> => {
  //   return this.http.post<UserResponseModel>(ApiEndPoint.verifyOtp, data);
  // };

  AssetSendForApproval = (data: {
    plantId: string;
    asset: AssetModel;
  }): Observable<AssetResponseModel> => {
    return this.http.post<AssetResponseModel>(
      ApiEndPoint.assetSendForApproval,
      data,
    );
  };

  GetAllSites = (): Observable<SitesResponseModel> => {
    return this.http.get<SitesResponseModel>(ApiEndPoint.getAllSites);
  };

  GetAllAssets = (data?: any): Observable<AssetsResponseModel> => {
    return this.http.post<AssetsResponseModel>(ApiEndPoint.getAllAssets, data);
  };

  AddGuidedInspection = (data?: any): Observable<any> => {
    return this.http.post<any>(ApiEndPoint.addGuidedInspection, data);
  };
  GetGuidedInspection = (data?: any): Observable<any> => {
    return this.http.post<any>(ApiEndPoint.getGuidedInspection, data);
  };
  SyncExcelToExpertApp = (data?: any): Observable<any> => {
    return this.http.post<any>(ApiEndPoint.syncExcelToExpertApp, data);
  };
  RemoveGuidedInspection = (data?: any): Observable<any> => {
    return this.http.post<any>(ApiEndPoint.removeGuidedInspection, data);
  };
  UpdateGuidedInspection = (data?: any): Observable<any> => {
    return this.http.post<any>(ApiEndPoint.updateGuidedInspection, data);
  };
  GetAllGuidedInspection = (data?: any): Observable<any> => {
    return this.http.post<any>(ApiEndPoint.getAllGuidedInspection, data);
  };
  GetGuidedInspectionDetails = (data?: any): Observable<any> => {
    return this.http.post<any>(ApiEndPoint.getGuidedInspectionDetails, data);
  };
  SapConfiguration = (data?: any): Observable<any> => {
    return this.http.post<any>(ApiEndPoint.sapConfiguration, data);
  };
  GetRequestedAssets = (data?: any): Observable<any> => {
    return this.http.post<any>(ApiEndPoint.getRequestedAssets, data);
  };
  GetAllSapConfiguration = (data?: any): Observable<SitesResponseModel> => {
    return this.http.post<SitesResponseModel>(
      ApiEndPoint.getAllSapConfiguration,
      data,
    );
  };
}
