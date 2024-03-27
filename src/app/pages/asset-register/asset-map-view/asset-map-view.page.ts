import { Component, effect, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "src/app/components/header/header.component";
import { RoundProgressComponent } from "angular-svg-round-progressbar";
import { ChildAssetModalComponent } from "src/app/components/child-asset-modal/child-asset-modal.component";
import { AssetInfoMenuComponent } from "src/app/components/asset-info-menu/asset-info-menu.component";
import { SubAssetModalComponent } from "src/app/components/sub-assets-modal/sub-asset-modal.component";
import { AssetModalComponent } from "src/app/components/asset-modal/asset-modal.component";

import {
  IonTitle,
  IonContent,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonText,
  IonModal,
  IonBackdrop,
  IonProgressBar,
  IonButton,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-asset-map-view",
  templateUrl: "./asset-map-view.page.html",
  styleUrls: ["./asset-map-view.page.scss"],
  standalone: true,
  imports: [
    IonButton,
    IonText,
    IonIcon,
    IonModal,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonBackdrop,
    IonProgressBar,
    HeaderComponent,
    RoundProgressComponent,
    AssetInfoMenuComponent,
    ChildAssetModalComponent,
    SubAssetModalComponent,
    AssetModalComponent,
  ],
})
export class AssetMapViewPage implements OnInit {
  ngOnInit() {}

  isMenuOpen = signal<boolean>(true);
  isChildOpen = signal<boolean>(false);
  isAssetInfoMenuOpen = signal<boolean>(false);
  isSubAssetModalOpen = signal<boolean>(true);

  constructor() {
    effect(() => {
      console.log("isMenuOpen changed to: ", this.isSubAssetModalOpen());
    });
  }

  toggleInfoMenu() {
    this.isAssetInfoMenuOpen.update(
      (isAssetInfoMenuOpen) => !isAssetInfoMenuOpen
    );
  }

  toggleChildMenu = () => {
    this.isChildOpen.update((isChildOpen) => !isChildOpen);
  };

  mappedAssets = [
    {
      assetParentType: "Silo",
      assets: [
        {
          id: "ASSET00001",
          assetSource: {
            bulkUpload: false,
            manualCreation: true,
            sapSync: false,
          },
          assetRegisteredStatus: {
            assetDeletionApprovalPending: false,
            assetRejectedByApprover: false,
            assetRegistered: false,
            assetInDraft: false,
            assetDeleted: false,
            assetApproved: false,
            assetPendingForApproval: true,
          },
          assetInfo: {
            assetParentType: "Silo",
            assetLocation: "",
            assetImages: "",
            costCenter: "Raw Material",
            assetName: "silo asset",
            assetStatus: "Demolished",
            sapId: "sap id",
            assetType: "Silo",
          },
          assetCategories: [
            {
              categoryType: "sim",
              categorySelected: true,
              categoryTitle: "Sim",
              id: "D3tOnkugj6gDmPnNdmH4",
              type: "Category",
              order: 1,
            },
            {
              categoryType: "materialManagement",
              categorySelected: true,
              categoryTitle: "Material Management",
              id: "cZPn2O8ImAqhkZK1aoYn",
              type: "Category",
              order: 2,
            },
            {
              categoryType: "quarry",
              categorySelected: false,
              categoryTitle: "Quarry",
              id: "mpsDesnMnAc3Vi2JONGP",
              type: "Category",
              order: 3,
            },
            {
              categoryType: "electrical",
              categorySelected: false,
              id: "TJD1lGQv4mZ3JdUoOfVx",
              type: "Category",
              category: "Electrical",
              order: 4,
            },
            {
              categoryType: "hotMaterial",
              categorySelected: false,
              categoryTitle: "Hot Material",
              id: "0xhIMFyf7TOmEAnWK4dG",
              type: "Category",
              order: 5,
            },
            {
              categoryType: "fireProtection",
              categorySelected: false,
              id: "Q0a4q0FrKj03MpqW7eNx",
              type: "Category",
              category: "Fire Protection",
              order: 6,
            },
            {
              categoryType: "environment",
              categorySelected: false,
              categoryTitle: "Environment",
              id: "JdUGdNsjElFpwL3hQSGQ",
              type: "Category",
              order: 7,
            },
            {
              categoryType: "insurance",
              categorySelected: false,
              categoryTitle: "Insurance",
              id: "sBGiNKw1v1iKrVyfkpJT",
              type: "Category",
              order: 8,
            },
          ],
        },
        {
          id: "ASSET00004",
          assetSource: {
            bulkUpload: false,
            manualCreation: true,
            sapSync: false,
          },
          assetRegisteredStatus: {
            assetDeletionApprovalPending: false,
            assetRejectedByApprover: false,
            assetRegistered: false,
            assetInDraft: false,
            assetDeleted: false,
            assetApproved: false,
            assetPendingForApproval: true,
          },
          assetInfo: {
            assetParentType: "Silo",
            assetLocation: "",
            assetImages: "",
            costCenter: "raw material",
            assetName: "Silo Asset",
            assetStatus: "Demolished",
            sapId: "raw",
            assetType: "Silo",
          },
        },
      ],
    },
    {
      assetParentType: "Bin",
      assets: [
        {
          id: "ASSET00002",
          assetSource: {
            bulkUpload: false,
            manualCreation: true,
            sapSync: false,
          },
          assetInfo: {
            assetParentType: "Bin",
            assetId: "b735e32b-6f6a-4d32-9df6-5531d34b21c1",
            assetName: "Bin Asset",
            assetStatus: "Demolished",
            assetType: "Bin",
          },
          assetRegisteredStatus: {
            assetDeletionApprovalPending: false,
            assetRejectedByApprover: false,
            assetRegistered: false,
            assetDeleted: false,
            assetApproved: false,
            assetInDraft: false,
            assetPendingForApproval: true,
          },
        },
      ],
    },
    {
      assetParentType: "Hopper",
      assets: [
        {
          id: "ASSET00003",
          assetSource: {
            bulkUpload: false,
            manualCreation: true,
            sapSync: false,
          },
          assetInfo: {
            assetParentType: "Hopper",
            assetId: "b735e32b-6f6a-4d32-9df6-5531d34b21c1",
            assetName: "Hopper Asset",
            assetStatus: "Demolished",
            assetType: "Hopper",
          },
          assetRegisteredStatus: {
            assetDeletionApprovalPending: false,
            assetRejectedByApprover: false,
            assetRegistered: false,
            assetDeleted: false,
            assetPendingForApproval: false,
            assetInDraft: false,
            assetApproved: true,
          },
        },
      ],
    },
  ];
}
