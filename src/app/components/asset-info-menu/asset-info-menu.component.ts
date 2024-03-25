import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  IonIcon,
  IonText,
  IonGrid,
  IonCol,
  IonLabel,
  IonAvatar,
  IonRow,
  IonInput,
  IonTextarea,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-asset-info-menu",
  templateUrl: "./asset-info-menu.component.html",
  styleUrls: ["./asset-info-menu.component.scss"],
  standalone: true,
  imports: [
    IonTextarea,
    IonInput,
    IonRow,
    IonAvatar,
    IonLabel,
    IonCol,
    IonGrid,
    IonText,
    IonIcon,
  ],
})
export class AssetInfoMenuComponent implements OnInit {
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
