import {
  OnInit,
  inject,
  signal,
  Component,
  WritableSignal,
} from "@angular/core";
import {
  IonRow,
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonAlert,
  IonLabel,
  IonSelect,
  IonAvatar,
  IonContent,
  IonLoading,
  IonSelectOption,
  IonSkeletonText,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import { RouterModule } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { ADD_PLANTS, UPDATE_PLANT } from "src/app/store/actions/plant.action";
import { PlantsModel, PlantsResponse } from "src/app/store/models/plant.model";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { PlantCardComponent } from "src/app/components/plant-card/plant-card.component";
import { LoadingSkeletonComponent } from "src/app/components/loading-skeleton/loading-skeleton.component";

@Component({
  imports: [
    IonLabel,
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
    RouterModule,
    IonSkeletonText,
    HeaderComponent,
    IonSelectOption,
    PlantCardComponent,
    LoadingSkeletonComponent,
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
  isLoading: WritableSignal<boolean> = signal(false);

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
    this.isLoading.set(true);
    this.httpService.GetAllPlants().subscribe({
      next: (response: PlantsResponse) => {
        this.store.dispatch(ADD_PLANTS(response?.data?.plants));
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.toastService.toastFailed(error.error.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  };
}
