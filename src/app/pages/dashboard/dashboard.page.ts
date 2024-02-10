import {
  IonCol,
  IonRow,
  IonCard,
  IonGrid,
  IonContent,
  IonCardContent,
} from "@ionic/angular/standalone";
import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  imports: [
    IonRow,
    IonCol,
    IonGrid,
    IonCard,
    IonContent,
    IonCardContent,
    HeaderComponent,
  ],
  standalone: true,
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
