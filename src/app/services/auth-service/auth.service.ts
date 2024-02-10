import { BehaviorSubject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from "../storage/storage.service";
import { Injectable, WritableSignal, inject, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private jwtHelper = inject(JwtHelperService);
  private storageService = inject(StorageService);

  constructor() {}

  isAuthenticated = async () => {
    const user = await this.storageService.get("user");
    if (user && user?.token && !this.jwtHelper.isTokenExpired(user?.token)) {
      return true;
    } else {
      return false;
    }
  };
}
