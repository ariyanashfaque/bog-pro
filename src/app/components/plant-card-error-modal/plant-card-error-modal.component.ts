import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  IonIcon,
  IonGrid,
  IonButton,
  IonCol,
  IonRow,
  IonText,
} from "@ionic/angular/standalone";

@Component({
  standalone: true,
  imports: [IonText, IonCol, IonRow, IonButton, IonGrid, IonIcon],
  selector: "app-plant-card-error-modal",
  templateUrl: "./plant-card-error-modal.component.html",
  styleUrls: ["./plant-card-error-modal.component.scss"],
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
