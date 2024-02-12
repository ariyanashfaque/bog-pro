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
  IonLabel,
  IonContent,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/angular/standalone";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { AssetsModel } from "src/app/store/models/plant.model";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HeaderComponent } from "src/app/components/header/header.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { AssetMappedAccordionComponent } from "src/app/components/asset-mapped-accordion/asset-mapped-accordion.component";

@Component({
  imports: [
    IonCol,
    IonRow,
    IonCard,
    IonGrid,
    IonLabel,
    IonContent,
    IonCardTitle,
    IonCardHeader,
    HeaderComponent,
    AssetMappedAccordionComponent,
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

  @Input()
  set id(plantId: string) {
    this.isLoading.set(true);
    this.httpService.GetAllAssets({ plantId }).subscribe({
      next: (response) => {
        console.log(response);
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
  }

  ngOnInit() {
    console.log(this.assets);
  }
}
