import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { RouterModule } from "@angular/router";
import { HeaderComponent } from "src/app/components/header/header.component";
import { LoadingSkeletonComponent } from "src/app/components/loading-skeleton/loading-skeleton.component";
import { SapConfigarationLogComponent } from "src/app/components/sap-configaration-log/sap-configaration-log.component";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { ToastService } from "src/app/services/toast-service/toast.service";
import { HttpErrorResponse } from "@angular/common/http";
// import { SapService } from "src/app/services/sap-service.service";
import { SAPconfigurationModel } from "src/app/store/models/sap.model";
import { Clipboard } from "@capacitor/clipboard";
import { SapService } from "src/app/services/sap-service/sap-service.service";

@Component({
  selector: "app-sap-configuration",
  templateUrl: "./sap-configuration.page.html",
  styleUrls: ["./sap-configuration.page.scss"],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule,
    HeaderComponent,
    LoadingSkeletonComponent,
    SapConfigarationLogComponent,
  ],
})
export class SapConfigurationPage implements OnInit {
  @Input() 
  isModalLogOpen: boolean = false;
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  sapService = inject(SapService);

  configurations: SAPconfigurationModel[] = [];

  plants = [
    {
      data: true,
    },
  ];

  currentDate = new Date();

  filedMappingData = [
    { name: "SapId", description: "Description" },
    { name: "LocationCode", description: "Description" },
    { name: "Location", description: "Description" },
    { name: "FunctionalLocationCode", description: "Description" },
    { name: "FunctionalLocationDescription", description: "Description" },
    { name: "CostCenterCode", description: "Description" },
    { name: "CostCenterDescription", description: "Description" },
    { name: "HierarchyAreaCode", description: "Description" },
    { name: "HierarchyAreaDescription", description: "Description" },
    { name: "Name", description: "Description" },
    { name: "Status", description: "Description" },
    { name: "AssetType", description: "Description" },
  ];

  isMenuOpen: boolean = false;
  isLoading: WritableSignal<boolean> = signal(false);

  constructor() {}

  ngOnInit() {
    this.sapService.get.subscribe((data: SAPconfigurationModel[]) => {
      this.configurations = data;
    });
    this.GetAllSapConfiguration();
    console.log("this.configurations: ", this.configurations);
  }

  GetAllSapConfiguration = async () => {
    this.isLoading.set(true);
    this.httpService.GetAllSapConfiguration().subscribe({
      next: (response: any) => {
        // this.store.dispatch(ADD_PLANTS(response?.data));
        console.log("response: ", response);
        if (response?.data) {
          this.sapService.set(response?.data);
          this.configurations = response?.data;
        }
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

  async copyToClipboard(text: string | undefined) {
    if (text) {
      try {
        await Clipboard.write({
          string: text,
        });
        this.toastService.toastSuccess("Text copied to clipboard");
      } catch (err) {
        // console.error("Error copying text to clipboard:", err);
        this.toastService.toastFailed("Error copying text to clipboard:");
      }
    }
  }

  logModalToggle = () => {
    this.isModalLogOpen = !this.isModalLogOpen;
    console.log("isModalLogOpen: ", this.isModalLogOpen);
    this.sapService.get.subscribe((data: SAPconfigurationModel[]) => {
      // Do something with the received data
      console.log("Data updated:", data);
    });
  };
}
