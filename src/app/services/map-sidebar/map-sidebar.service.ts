import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MapSidebarService {
  private isChildOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  private isSubAssetModalOpen: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  get getIsChildOpen(): Observable<boolean> {
    return this.isChildOpen;
  }

  setIsChildOpen(value: boolean) {
    this.isChildOpen.next(value);
  }
  get getisSubAssetModalOpen(): Observable<boolean> {
    return this.isSubAssetModalOpen;
  }

  setisSubAssetModalOpen(value: boolean) {
    this.isSubAssetModalOpen.next(value);
  }
}
