import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  IonRow,
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonText,
  IonLabel,
  IonTitle,
  IonSelect,
  IonTextarea,
  IonInput,
  IonSelectOption,
  IonIcon,
  IonButtons,
  IonAvatar,
  IonButton,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-sub-assets-modal",
  templateUrl: "./sub-assets-modal.component.html",
  styleUrls: ["./sub-assets-modal.component.scss"],
  standalone: true,
  imports: [
    IonButton,
    IonAvatar,
    IonButtons,
    IonIcon,
    IonInput,
    IonText,
    IonRow,
    IonCol,
    IonGrid,
    IonItem,
    IonList,
    IonLabel,
    IonTitle,
    IonSelect,
    IonTextarea,
    IonSelectOption,
  ],
})
export class SubAssetsModalComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Output() isMenuOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpenChange.emit(this.isMenuOpen);
  }
}
