import {
  IonCol,
  IonRow,
  IonCard,
  IonGrid,
  IonIcon,
  IonText,
  IonBadge,
  IonContent,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/angular/standalone";
import { Component, OnInit } from "@angular/core";
import { CalendarComponent } from "src/app/components/calendar/calendar.component";
import { HeaderComponent } from "src/app/components/header-component/header.component";
import { ActionCardComponent } from "src/app/components/action-card/action-card.component";
import { FindingsCardComponent } from "src/app/components/findings-card/findings-card.component";
import { AssessmentCardComponent } from "src/app/components/assessment-card/assessment-card.component";

@Component({
  imports: [
    IonRow,
    IonCol,
    IonText,
    IonIcon,
    IonGrid,
    IonCard,
    IonBadge,
    IonContent,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    HeaderComponent,
    CalendarComponent,
    ActionCardComponent,
    FindingsCardComponent,
    AssessmentCardComponent,
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
