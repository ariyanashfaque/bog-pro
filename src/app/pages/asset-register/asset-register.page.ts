import {
  OnInit,
  inject,
  signal,
  Component,
  WritableSignal,
} from "@angular/core";
import {
  ADD_PLANT,
  ADD_PLANTS,
  ADD_CATEGORIES,
} from "src/app/store/actions/plant.action";
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
  IonBackdrop,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import { RouterModule } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { PlantsModel, PlantsResponse } from "src/app/store/models/plant.model";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { PlantCardComponent } from "src/app/components/plant-card/plant-card.component";
import { LoadingSkeletonComponent } from "src/app/components/loading-skeleton/loading-skeleton.component";
import { PlantCardErrorModalComponent } from "src/app/components/plant-card-error-modal/plant-card-error-modal.component";
import {
  CountryHseHead,
  Champion,
} from "src/app/store/models/role.model";

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
    IonBackdrop,
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
  role: any;
  champion: Champion;
  store = inject(Store);
  plants: PlantsModel[];
  isMenuOpen: boolean = false;
  country_hse_head: CountryHseHead;
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isLoading: WritableSignal<boolean> = signal(false);

  constructor() {
    this.champion = {
      role: "champion",
      title: "champion/Engineer",
      access: {
        l1Aproval: false,
        InventoryEdit: true,
        inventoryCreation: true,
      },
    };

    this.country_hse_head = {
      role: "country_hse_head",
      title: "country HSE Head",
      access: {
        l1Aproval: true,
        InventoryEdit: false,
        inventoryCreation: false,
      },
    };
    this.plants = [];
    this.role = {};
  }

  ionViewDidEnter() {}

  ngOnInit() {
    this.store
      .select("plants")
      .subscribe({ next: (plants) => (this.plants = plants) });

    this.GetAllPlants();
    this.role = this.country_hse_head;
    console.log(this.role);
  }

  handleErrorModal = (event: any) => {
    this.isMenuOpen = event;
  };

  GetAllPlants = async () => {
    this.isLoading.set(true);
    this.httpService.GetAllPlants().subscribe({
      next: (response: PlantsResponse) => {
        this.store.dispatch(ADD_PLANTS(response?.data?.plants));
        this.store.dispatch(ADD_CATEGORIES(response?.data?.categories));
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
