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
import {
  SAPActivityLogModel,
  SAPconfigurationModel,
} from "src/app/store/models/sap.model";
import { Clipboard } from "@capacitor/clipboard";
import { SapService } from "src/app/services/sap-service/sap-service.service";
import { single } from "rxjs";

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
  configLogs: WritableSignal<SAPActivityLogModel[]> = signal([]);

  configurations: SAPconfigurationModel[] = [];

  plants = [
    {
      data: true,
    },
  ];

  currentDate = new Date();

  // filedMappingData = [
  //   { name: "SapId", description: "Description" },
  //   { name: "LocationCode", description: "Description" },
  //   { name: "Location", description: "Description" },
  //   { name: "FunctionalLocationCode", description: "Description" },
  //   { name: "FunctionalLocationDescription", description: "Description" },
  //   { name: "CostCenterCode", description: "Description" },
  //   { name: "CostCenterDescription", description: "Description" },
  //   { name: "HierarchyAreaCode", description: "Description" },
  //   { name: "HierarchyAreaDescription", description: "Description" },
  //   { name: "Name", description: "Description" },
  //   { name: "Status", description: "Description" },
  //   { name: "AssetType", description: "Description" },
  // ];

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

  logModalToggle = (index: number) => {
    this.isModalLogOpen = !this.isModalLogOpen;
    console.log("isModalLogOpen: ", this.isModalLogOpen, index);

    this.sapService.get.subscribe((data: SAPconfigurationModel[]) => {
      let _logs: SAPActivityLogModel[] = data[index]?.log ?? [];

      if (_logs?.length > 0) {
        _logs = _logs?.map((item: SAPActivityLogModel) => {
          if (item?.updatedAt) {
            return {
              ...item,
              ...this.dateTimeCalculation(item?.updatedAt),
              size: item?.size,
            };
          } else {
            return item;
          }
        });
      }
      console.log(_logs);
      this.configLogs.set(_logs);
    });
  };

  dateTimeCalculation(date: string) {
    const dateString = date;
    const dateParts = dateString.split(" ")[0].split("-");
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[0]);

    const inputDate = new Date(year, month, day);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);

    if (inputDate.toDateString() === currentDate.toDateString())
      return {
        date: "Today",
        time: `${dateString.split(" ")[1]} ${dateString.split(" ")[2]}`,
      };
    else if (inputDate.toDateString() === yesterdayDate.toDateString())
      return {
        date: "Yesterday",
        time: `${dateString.split(" ")[1]} ${dateString.split(" ")[2]}`,
      };
    else {
      const formattedDate = `${day.toString().padStart(2, "0")}-${(month + 1).toString().padStart(2, "0")}-${year}`;
      return {
        date: formattedDate,
        time: `${dateString.split(" ")[1]} ${dateString.split(" ")[2]}`,
      };
    }
  }
}
