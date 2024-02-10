import {
  IonRow,
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonAlert,
  IonSelect,
  IonAvatar,
  IonContent,
  IonLoading,
  IonSelectOption,
  IonSkeletonText,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, inject } from "@angular/core";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { PlantsModel, PlantsResponse } from "src/app/store/models/plant.model";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { PlantCardComponent } from "src/app/components/plant-card/plant-card.component";
import { ADD_PLANTS, UPDATE_PLANT } from "src/app/store/actions/plant.action";

@Component({
  imports: [
    IonCol,
    IonRow,
    IonList,
    IonItem,
    IonGrid,
    IonAlert,
    IonAvatar,
    IonSelect,
    IonLoading,
    IonContent,
    IonSkeletonText,
    HeaderComponent,
    IonSelectOption,
    PlantCardComponent,
  ],
  standalone: true,
  selector: "app-asset-register",
  styleUrls: ["./asset-register.page.scss"],
  templateUrl: "./asset-register.page.html",
})
export class AssetRegisterPage implements OnInit {
  store = inject(Store);
  httpService = inject(HttpService);
  toastService = inject(ToastService);

  plants: PlantsModel[];

  constructor() {
    this.plants = [];
  }

  ionViewDidEnter() {}

  ngOnInit() {
    this.store
      .select("plants")
      .subscribe({ next: (plants) => (this.plants = plants) });

    this.GetAllPlants();
  }

  handleErrorModal = (event: any) => {};

  GetAllPlants = async () => {
    this.httpService.GetAllPlants().subscribe({
      next: (response: PlantsResponse) => {
        this.store.dispatch(ADD_PLANTS(response?.data?.plants));
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.toastFailed(error.error.message);
      },
      complete: () => {
        console.log("Completed");

        this.store.dispatch(
          UPDATE_PLANT({
            id: "PLANT00001",
            createdBy: "uttam.roy.ext@holcim.com",
          })
        );
      },
    });
  };
}
