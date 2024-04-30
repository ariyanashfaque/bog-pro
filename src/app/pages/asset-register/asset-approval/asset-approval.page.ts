import {
  Input,
  OnInit,
  inject,
  signal,
  Component,
  WritableSignal,
  model,
} from "@angular/core";
import {
  IonCol,
  IonRow,
  IonImg,
  IonGrid,
  IonText,
  IonIcon,
  IonBadge,
  IonRadio,
  IonLabel,
  IonTitle,
  IonToggle,
  IonButton,
  IonFooter,
  IonContent,
  IonToolbar,
  IonCheckbox,
  IonThumbnail,
  IonRadioGroup,
  IonSkeletonText,
} from "@ionic/angular/standalone";
import {
  SiteModel,
  AssetModel,
  AssetsResponseModel,
} from "src/app/store/models/asset.model";
import { Store } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { UPDATE_PLANT } from "src/app/store/actions/asset.action";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { HeaderComponent } from "src/app/components/header-component/header.component";
import { LoadingSkeletonComponent } from "../../../components/loading-skeleton/loading-skeleton.component";

@Component({
  standalone: true,
  selector: "app-asset-approval",
  templateUrl: "./asset-approval.page.html",
  styleUrls: ["./asset-approval.page.scss"],
  imports: [
    IonImg,
    IonRow,
    IonCol,
    IonIcon,
    IonText,
    IonGrid,
    IonTitle,
    IonLabel,
    IonRadio,
    IonBadge,
    IonFooter,
    IonButton,
    IonToggle,
    IonToolbar,
    IonContent,
    IonCheckbox,
    IonThumbnail,
    IonRadioGroup,
    IonSkeletonText,
    HeaderComponent,
    LoadingSkeletonComponent,
  ],
})
export class AssetApprovalPage implements OnInit {
  siteId: string;
  assetId: string;
  assets: AssetModel[];
  store = inject(Store);
  radioChecked = model();
  sendForApproval: any[] = [];
  requestedAssets: AssetModel[];
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  isLoading: WritableSignal<boolean> = signal(false);

  @Input()
  set id(siteId: string) {
    this.siteId = siteId;
    this.isLoading.set(true);
    this.httpService.GetRequestedAssets({ siteId }).subscribe({
      next: (response: AssetsResponseModel) => {
        this.assets = response.data;
        console.log(this.assets);
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

  ngOnInit() {}

  selectAllAsset(event: CustomEvent) {
    this.radioChecked.set(event.detail.checked);

    if (event.detail.checked === true) {
      this.sendForApproval = this.assets;
    } else {
      this.sendForApproval = [];
    }
  }

  assetChecked(event: any, asset: any) {
    if (event.detail.checked === true) {
      this.sendForApproval.push(asset);
    } else {
      this.sendForApproval.pop();
    }
  }
}
