import { Storage } from "@ionic/storage-angular";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private storage: Storage = inject(Storage);

  constructor() {
    this.init();
  }

  private init = async () => {
    await this.storage.create();
  };

  public clear = async () => {
    return await this.storage.clear();
  };
  public get = async (key: string) => {
    return await this.storage.get(key);
  };
  public remove = async (key: string) => {
    await this.storage.remove(key);
  };
  public set = async (key: string, value: any) => {
    await this.storage?.set(key, value);
  };
}
