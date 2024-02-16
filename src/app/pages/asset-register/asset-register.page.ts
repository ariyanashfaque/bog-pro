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
  IonTitle,
  IonSelect,
  IonAvatar,
  IonHeader,
  IonContent,
  IonLoading,
  IonToolbar,
  IonSelectOption,
  IonSkeletonText,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import { RouterModule } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ADD_PLANT, ADD_PLANTS } from "src/app/store/actions/plant.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { PlantsModel, PlantsResponse } from "src/app/store/models/plant.model";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { PlantCardComponent } from "src/app/components/plant-card/plant-card.component";
import { LoadingSkeletonComponent } from "src/app/components/loading-skeleton/loading-skeleton.component";
import { PlantCardErrorModalComponent } from "src/app/components/plant-card-error-modal/plant-card-error-modal.component";

@Component({
  imports: [
    IonCol,
    IonRow,
    IonList,
    IonItem,
    IonGrid,
    IonTitle,
    IonLabel,
    IonAlert,
    IonHeader,
    IonAvatar,
    IonSelect,
    IonToolbar,
    IonLoading,
    IonContent,
    RouterModule,
    IonSkeletonText,
    HeaderComponent,
    IonSelectOption,
    PlantCardComponent,
    LoadingSkeletonComponent,
    PlantCardErrorModalComponent,
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
  isMenuOpen: boolean = false;
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

  handleErrorModal = (event: any) => {
    this.isMenuOpen = event;
  };

  GetAllPlants = async () => {
    this.isLoading.set(true);
    this.httpService.GetAllPlants().subscribe({
      next: (response: PlantsResponse) => {
        this.store.dispatch(ADD_PLANTS(response?.data));
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

  handlePlantStore = (plant: PlantsModel) => {
    this.store.dispatch(ADD_PLANT(plant));
  };
}
