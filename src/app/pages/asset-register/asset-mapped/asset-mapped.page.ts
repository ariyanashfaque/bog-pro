import {
  Input,
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
  IonCard,
  IonItem,
  IonLabel,
  IonContent,
  IonCardTitle,
  IonAccordion,
  IonCardHeader,
  IonAccordionGroup,
} from "@ionic/angular/standalone";
import {
  AssetsModel,
  PlantsModel,
  AssetsResponse,
} from "src/app/store/models/plant.model";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/plant.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { LoadingSkeletonComponent } from "src/app/components/loading-skeleton/loading-skeleton.component";
import { AssetMappedCardComponent } from "src/app/components/asset-mapped-card/asset-mapped-card.component";

@Component({
  imports: [
    IonCol,
    IonRow,
    IonItem,
    IonCard,
    IonGrid,
    IonLabel,
    IonContent,
    IonAccordion,
    IonCardTitle,
    IonCardHeader,
    HeaderComponent,
    IonAccordionGroup,
    LoadingSkeletonComponent,
    AssetMappedCardComponent,
  ],
  standalone: true,
  selector: "app-asset-mapped",
  templateUrl: "./asset-mapped.page.html",
  styleUrls: ["./asset-mapped.page.scss"],
})
export class AssetMappedPage implements OnInit {
  store = inject(Store);
  httpService = inject(HttpService);
  toastService = inject(ToastService);

  assets: AssetsModel[];
  isLoading: WritableSignal<boolean> = signal(false);
  groupedAssets: { assetParentType?: string; assets?: AssetsModel[] }[];

  @Input()
  set id(plantId: string) {
    this.isLoading.set(true);
    this.httpService.GetAllAssets({ plantId }).subscribe({
      next: (response: AssetsResponse) => {
        this.store.dispatch(
          UPDATE_PLANT({
            assets: response?.data,
          }),
        );
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.toastService.toastFailed(error.error.message);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  constructor() {
    this.assets = [];
    this.groupedAssets = [];
  }

  ngOnInit() {
    this.store.select("plant").subscribe({
      next: (plant: PlantsModel) => {
        if (plant?.assets) {
          this.groupedAssets = [];
          this.assets = plant.assets;
          const parentTypes = new Set(
            this.assets.map((asset) => asset?.assetInfo?.assetParentType),
          );

          parentTypes.forEach((parentType) =>
            this.groupedAssets.push({
              assetParentType: parentType,
              assets: this.assets.filter(
                (asset) => asset?.assetInfo?.assetParentType === parentType,
              ),
            }),
          );
        }
      },
    });
  }
}
