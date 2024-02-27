import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "src/app/components/header/header.component";
import { AssessmentModalComponent } from "src/app/components/assessment-modal/assessment-modal.component";

@Component({
  selector: "app-assessment",
  templateUrl: "./assessment.page.html",
  styleUrls: ["./assessment.page.scss"],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
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
