import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  NgControl,
  Validators,
} from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "src/app/components/header/header.component";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { HttpService } from "src/app/services/http-service/http-client.service";
import { ToastService } from "src/app/services/toast-service/toast.service";
import {
  LoadingController,
  SelectChangeEventDetail,
} from "@ionic/angular/standalone";
import { HttpErrorResponse } from "@angular/common/http";
import { RouterModule } from "@angular/router";
// import { SapService } from "src/app/services/sap-service.service";
import {
  SAPResponse,
  SAPconfigurationModel,
} from "src/app/store/models/sap.model";
import { SapService } from "src/app/services/sap-service/sap-service.service";

@Component({
  selector: "app-add-sap-configuration",
  templateUrl: "./update-sap-configuration.page.html",
  styleUrls: ["./update-sap-configuration.page.scss"],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AddSapConfigurationPage implements OnInit {
  router = inject(Router);
  httpService = inject(HttpService);
  toastService = inject(ToastService);
  loadingCtrl = inject(LoadingController);
  sapService = inject(SapService);
  sapRegistrationForm: FormGroup;

  sapId: string;
  isGRUActive: WritableSignal<boolean> = signal(false);

  // fields = [
  //   { name: "sapId", description: "" },
  //   { name: "locationCode", description: "" },
  //   { name: "location", description: "" },
  //   { name: "functionalLocationCode", description: "" },
  //   { name: "functionalLocationDescription", description: "" },
  //   { name: "costCenterCode", description: "" },
  //   { name: "costCenterDescription", description: "" },
  //   { name: "hierarchyAreaCode", description: "" },
  //   { name: "hierarchyAreaDescription", description: "" },
  //   { name: "fiendName", description: "" },
  //   { name: "fiendStatus", description: "" },
  //   { name: "assetType", description: "" },
  // ];

  constructor() {
    this.sapRegistrationForm = new FormGroup({
      gruName: new FormControl("", Validators.required),
      gruStatus: new FormControl("", Validators.required),
      syncType: new FormControl("", Validators.required),
      protocol: new FormControl("", Validators.required),
      sapId: new FormControl("", Validators.required),
      locationCode: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
      functionalLocationCode: new FormControl("", Validators.required),
      functionalLocationDescription: new FormControl("", Validators.required),
      costCenterCode: new FormControl("", Validators.required),
      costCenterDescription: new FormControl("", Validators.required),
      hierarchyAreaCode: new FormControl("", Validators.required),
      hierarchyAreaDescription: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required),
      assetType: new FormControl("", Validators.required),
    });
    // this.fields.forEach((field) => {
    //   this.sapRegistrationForm.addControl(field.name, new FormControl(""));
    // });
  }

  @Input()
  set id(sapId: string) {
    this.sapId = sapId;
    // console.log("sapid: ", this.sapId);
  }

  ngOnInit() {
    if (this.sapId) {
      this.sapService
        .getById(this.sapId)
        .subscribe((data: SAPconfigurationModel | undefined) => {
          if (data) {
            // console.log("Data found:", data);
            // const fields: any = {};
            // data?.fields?.forEach((item) => {
            //   fields[item.name] = item.description;
            // });

            // const _data = data;
            // delete _data.fields;
            // delete _data.log;
            // const values = {
            //   ..._data,
            //   ...fields,
            // };

            // console.log("values: ", values);
            this.sapRegistrationForm.patchValue(data);
            this.sapRegistrationForm.get("gruName")?.disable();
            // this.sapRegistrationForm.get("protocol")?.disable();
            // this.sapRegistrationForm.get("syncType")?.disable();
          }
          // else {
          //   console.log("No data found with ID:", this.sapId);
          //   this.toastService.toastFailed(
          //     `No data found with ID: ${this.sapId}`,
          //   );
          //   this.router.navigate([`sap-configuration`]);
          // }
        });
    }
  }

  onGRUSelectionChange(event: CustomEvent<SelectChangeEventDetail>) {
    const selectedGRU = event?.detail?.value?.toLowerCase();
    this.sapService.get.subscribe((data: SAPconfigurationModel[]) => {
      const isAvailable = data?.filter(
        (item) => item.gruName?.toLocaleLowerCase() === selectedGRU
      );
      if (isAvailable?.length > 0) this.isGRUActive?.set(true);
      else this.isGRUActive?.set(false);
    });
  }

  saveSapConfig = async () => {
    console.log("this.sapRegistrationForm: ", this.sapRegistrationForm.value);
    // const _fields = this.fields?.map((item) => {
    //   return {
    //     name: item.name,
    //     description: this.sapRegistrationForm.get(item.name)?.value,
    //   };
    // });

    const payload: SAPconfigurationModel = {
      gruName: this.sapRegistrationForm.get("gruName")?.value,
      gruStatus: this.sapRegistrationForm.get("gruStatus")?.value,
      syncType: this.sapRegistrationForm.get("syncType")?.value,
      protocol: this.sapRegistrationForm.get("protocol")?.value,
      // fields: _fields,
      sapId: this.sapRegistrationForm.get("sapId")?.value,
      locationCode: this.sapRegistrationForm.get("locationCode")?.value,
      location: this.sapRegistrationForm.get("location")?.value,
      functionalLocationCode: this.sapRegistrationForm.get(
        "functionalLocationCode"
      )?.value,
      functionalLocationDescription: this.sapRegistrationForm.get(
        "functionalLocationDescription"
      )?.value,
      costCenterCode: this.sapRegistrationForm.get("costCenterCode")?.value,
      costCenterDescription: this.sapRegistrationForm.get(
        "costCenterDescription"
      )?.value,
      hierarchyAreaCode:
        this.sapRegistrationForm.get("hierarchyAreaCode")?.value,
      hierarchyAreaDescription: this.sapRegistrationForm.get(
        "hierarchyAreaDescription"
      )?.value,
      name: this.sapRegistrationForm.get("name")?.value,
      status: this.sapRegistrationForm.get("status")?.value,
      assetType: this.sapRegistrationForm.get("assetType")?.value,
    };

    if (this.sapId) payload.id = this.sapId;
    console.log("payload: ", payload);

    const loading = await this.loadingCtrl.create({
      duration: 3000,
      spinner: "bubbles",
    });
    loading.present();

    this.httpService.SapConfiguration(payload).subscribe({
      next: (response: SAPResponse) => {
        console.log("response: ", response);
        this.sapService.update(response?.data);
      },
      error: (error: HttpErrorResponse) => {
        loading.dismiss();
        this.toastService.toastFailed(error.error.message);
        this.router.navigate([`sap-configuration`]);
      },
      complete: () => {
        this.toastService.toastSuccess(
          this.sapId ? `Successfully updated!` : `Successfully created!`
        );
        loading.dismiss();
        this.router.navigate([`sap-configuration`]);
      },
    });
  };
}
