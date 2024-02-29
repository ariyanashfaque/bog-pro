import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-action-management-modal",
  templateUrl: "./action-management-modal.component.html",
  styleUrls: ["./action-management-modal.component.scss"],
  standalone: true,
  imports: [IonButton, IonRow, IonCol, IonGrid, IonIcon],
})
export class ActionManagementModalComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Output() isMenuToggleOpen = new EventEmitter<boolean>(false);
  constructor() {}

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuToggleOpen.emit(this.isMenuOpen);
  }
}
