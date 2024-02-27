import {
  IonIcon,
  IonTitle,
  IonFooter,
  IonButton,
  IonToolbar,
  IonButtons,
} from "@ionic/angular/standalone";
import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { AssetsModel, AssetsResponse } from "src/app/store/models/plant.model";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  standalone: true,
  selector: "app-asset-registration-footer",
  templateUrl: "./asset-registration-footer.component.html",
  styleUrls: ["./asset-registration-footer.component.scss"],
  imports: [IonIcon, IonButton, IonButtons, IonToolbar, IonFooter, IonTitle],
})
export class AssetRegistrationFooterComponent implements OnInit {
  httpService = inject(HttpService);
  toastService = inject(ToastService);

  isLoading: WritableSignal<boolean> = signal(false);
  @Input() isFormValid: WritableSignal<boolean> = signal(false);
  @Input() assetInDraft: { plantId?: string; asset?: AssetsModel };

  constructor() {}

  ngOnInit() {}

  handleSendForApproval() {
    this.httpService.UpdateAsset({ plant: this.assetInDraft }).subscribe({
      next: (response: AssetsResponse) => {
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
}
