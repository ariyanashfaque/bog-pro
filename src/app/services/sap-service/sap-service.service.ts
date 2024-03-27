import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { SAPconfigurationModel } from "src/app/store/models/sap.model";

@Injectable({
  providedIn: "root",
})
export class SapService {
  private _data: BehaviorSubject<SAPconfigurationModel[]> = new BehaviorSubject<
    SAPconfigurationModel[]
  >([]);

  constructor() {}

  get get(): Observable<SAPconfigurationModel[]> {
    return this._data;
  }

  set(value: SAPconfigurationModel[]): void {
    this._data.next(value);
  }

  getById(id: string): Observable<SAPconfigurationModel | undefined> {
    return this._data.pipe(
      map((dataList) => dataList.find((data) => data.id === id)),
    );
  }

  update(value: SAPconfigurationModel): void {
    const prevData = this._data.getValue();
    if (value?.id) {
      const index = prevData.findIndex((item) => item?.id === value?.id);
      if (index !== -1) {
        const updatedData = [...prevData];
        updatedData[index] = { ...updatedData[index], ...value };
        console.log("Item updated successfully:", updatedData, index);
        this._data.next(updatedData);
      } else {
        console.log("Item with id", value.id, "not found.");
        const newData = [...prevData, value];
        this._data.next(newData);
      }
    } else {
      console.log("Item id is missing.");
      const newData = [...prevData, value];
      this._data.next(newData);
    }
  }
}
