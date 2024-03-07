import { Component, Input, OnInit } from "@angular/core";
import {
  IonIcon,
  IonProgressBar,
  IonTitle,
  IonHeader,
  IonCard,
  IonText,
  IonBadge,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-assessment-card",
  standalone: true,
  templateUrl: "./assessment-card.component.html",
  styleUrls: ["./assessment-card.component.scss"],
  imports: [
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
  @Input() isOverdue: boolean = false;
  constructor() {}

  ngOnInit() {}
}
