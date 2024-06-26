import { Component, Input, OnInit } from "@angular/core";
import {
  IonIcon,
  IonProgressBar,
  IonTitle,
  IonHeader,
  IonCard,
  IonText,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-assessment-card",
  standalone: true,
  templateUrl: "./assessment-card.component.html",
  styleUrls: ["./assessment-card.component.scss"],
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonBadge,
    IonText,
    IonCard,
    IonHeader,
    IonTitle,
    IonProgressBar,
    IonIcon,
  ],
})
export class AssessmentCardComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() isOverdue: boolean = false;
  @Input() data: any = {};
  @Input() forDashboard: boolean = false;

  constructor() {}

  ngOnInit() {
    console.log(this.data);
  }
}
