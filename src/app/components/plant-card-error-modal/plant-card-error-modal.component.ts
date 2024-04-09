import {
  IonCol,
  IonRow,
  IonIcon,
  IonGrid,
  IonText,
  IonButton,
} from "@ionic/angular/standalone";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-plant-card-error-modal",
  templateUrl: "./plant-card-error-modal.component.html",
  styleUrls: ["./plant-card-error-modal.component.scss"],
  imports: [IonText, IonCol, IonRow, IonButton, IonGrid, IonIcon],
})
export class PlantCardErrorModalComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);

  constructor() {}

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuToggleOpen.emit(this.isMenuOpen);
  }
}
6;
