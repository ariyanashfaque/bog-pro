import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "src/app/components/header/header.component";
import { AssessmentModalComponent } from "src/app/components/assessment-modal/assessment-modal.component";
import {
  IonRow,
  IonCol,
  IonCard,
  IonGrid,
  IonText,
  IonList,
  IonSelect,
  IonButton,
  IonContent,
  IonBackdrop,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonSelectOption,
} from "@ionic/angular/standalone";
import { AssessmentCardComponent } from "src/app/components/assessment-card/assessment-card.component";

@Component({
  selector: "app-assessment",
  templateUrl: "./assessment.page.html",
  styleUrls: ["./assessment.page.scss"],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonList,
    IonText,
    IonGrid,
    IonCard,
    IonButton,
    IonSelect,
    IonContent,
    IonBackdrop,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    HeaderComponent,
    IonSelectOption,
    AssessmentCardComponent,
    AssessmentModalComponent,
  ],
})
export class AssessmentPage implements OnInit {
  isAssessmentModalOpen: boolean = false;
  constructor() {}

  ngOnInit() {}

  assessmentModalToggle = () => {
    this.isAssessmentModalOpen = !this.isAssessmentModalOpen;
  };
}
