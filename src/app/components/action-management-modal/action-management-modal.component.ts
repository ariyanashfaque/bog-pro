import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonCheckbox,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-action-management-modal",
  templateUrl: "./action-management-modal.component.html",
  styleUrls: ["./action-management-modal.component.scss"],
  standalone: true,
  imports: [
    IonCheckbox,
    IonSegmentButton,
    IonSegment,
    IonLabel,
    IonButton,
    IonRow,
    IonCol,
    IonGrid,
    IonIcon,
  ],
})
export class ActionManagementModalComponent implements OnInit {
  filterName: string = "Source (1)";
  @Input() isMenuOpen: boolean = false;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  filterCategory: any[] = [
    "Source (1)",
    "Status",
    "Risk level",
    "System",
    "Due date",
  ];

  filterBySource: any[] = [
    "Structural Integrity Management",
    "Material Management",
    "Electrical Safety",
    "Fire Protection Systems",
    "Hot Material",
    "Environment",
    "Quarry, slopes, & stockpiles",
    "Inssurance",
  ];
  constructor() {}

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuToggleOpen.emit(this.isMenuOpen);
  }

  handleFilterCategory(categoryName: string) {
    this.filterName = categoryName;
  }

  handleFilerBySource(event: any, sourceName: string) {
    console.log(event);
    console.log(sourceName);
  }
}
