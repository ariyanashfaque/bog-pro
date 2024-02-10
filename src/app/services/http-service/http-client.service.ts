import { Observable } from "rxjs";
import { ApiEndPoint } from "./endPoint";
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AssetsModel, PlantsResponse } from "src/app/store/models/plant.model";

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

  GetAllPlants = (data?: any): Observable<PlantsResponse> => {
    return this.http.post<PlantsResponse>(ApiEndPoint.getAllPlants, data);
  };

  GetAllAssets = (data?: any): Observable<AssetsModel[]> => {
    return this.http.post<AssetsModel[]>(ApiEndPoint.getAllAssets, data);
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
}
