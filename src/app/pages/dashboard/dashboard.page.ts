import {
  IonCol,
  IonRow,
  IonCard,
  IonGrid,
  IonContent,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonText,
} from "@ionic/angular/standalone";
import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "src/app/components/header-component/header.component";
import { CalendarComponent } from "src/app/components/calendar/calendar.component";

@Component({
  imports: [
    IonText,
    IonIcon,
    IonCardTitle,
    IonCardHeader,
    IonRow,
    IonCol,
    IonGrid,
    IonCard,
    IonContent,
    IonCardContent,
    HeaderComponent,
    CalendarComponent,
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
