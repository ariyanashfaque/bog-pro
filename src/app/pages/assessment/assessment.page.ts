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
  IonCardSubtitle,
} from "@ionic/angular/standalone";
import { AssessmentCardComponent } from "src/app/components/assessment-card/assessment-card.component";

@Component({
  selector: "app-assessment",
  templateUrl: "./assessment.page.html",
  styleUrls: ["./assessment.page.scss"],
  standalone: true,
  imports: [
    IonCardSubtitle,
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

  // Open or Closed option for filter
  selectedOption: string = "open";
  onSelectChange(event: any) {
    console.log("Selected Option:", event.detail.value);
    this.selectedOption = event.detail.value;
  }

  assessmentModalToggle = () => {
    this.isAssessmentModalOpen = !this.isAssessmentModalOpen;
  };

  allAssessments = [
    {
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      status: [
        {
          id: "1",
          status: "Assessment",
          isCompleted: false,
          isProgress: true,
        },
        {
          id: "2",
          status: "1st Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "3",
          status: "2nd Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "4",
          status: "Open",
          isCompleted: false,
          isProgress: false,
        },
      ],
      leadAuditor: {
        id: "ariyan.ashfaque.ext@holcim.com",
        name: "Ariyan Ashfaque",
      },
      otherTeamMembers: [
        {
          id: "ariyan.ashfaque.ext@holcim.com",
          name: "Ariyan Ashfaque",
        },
      ],
      filesArray: [],
    },
    {
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      status: [
        {
          id: "1",
          status: "Assessment",
          isCompleted: false,
          isProgress: true,
        },
        {
          id: "2",
          status: "1st Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "3",
          status: "2nd Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "4",
          status: "Open",
          isCompleted: false,
          isProgress: false,
        },
      ],
      leadAuditor: {
        id: "ariyan.ashfaque.ext@holcim.com",
        name: "Ariyan Ashfaque",
      },
      otherTeamMembers: [
        {
          id: "ariyan.ashfaque.ext@holcim.com",
          name: "Ariyan Ashfaque",
        },
      ],
      filesArray: [],
    },
    {
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      status: [
        {
          id: "1",
          status: "Assessment",
          isCompleted: false,
          isProgress: true,
        },
        {
          id: "2",
          status: "1st Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "3",
          status: "2nd Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "4",
          status: "Open",
          isCompleted: false,
          isProgress: false,
        },
      ],
      leadAuditor: {
        id: "ariyan.ashfaque.ext@holcim.com",
        name: "Ariyan Ashfaque",
      },
      otherTeamMembers: [
        {
          id: "ariyan.ashfaque.ext@holcim.com",
          name: "Ariyan Ashfaque",
        },
      ],
      filesArray: [],
    },
    {
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      status: [
        {
          id: "1",
          status: "Assessment",
          isCompleted: false,
          isProgress: true,
        },
        {
          id: "2",
          status: "1st Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "3",
          status: "2nd Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "4",
          status: "Open",
          isCompleted: false,
          isProgress: false,
        },
      ],
      leadAuditor: {
        id: "ariyan.ashfaque.ext@holcim.com",
        name: "Ariyan Ashfaque",
      },
      otherTeamMembers: [
        {
          id: "ariyan.ashfaque.ext@holcim.com",
          name: "Ariyan Ashfaque",
        },
      ],
      filesArray: [],
    },
    {
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      status: [
        {
          id: "1",
          status: "Assessment",
          isCompleted: false,
          isProgress: true,
        },
        {
          id: "2",
          status: "1st Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "3",
          status: "2nd Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "4",
          status: "Closed",
          isCompleted: false,
          isProgress: false,
        },
      ],
      leadAuditor: {
        id: "ariyan.ashfaque.ext@holcim.com",
        name: "Ariyan Ashfaque",
      },
      otherTeamMembers: [
        {
          id: "ariyan.ashfaque.ext@holcim.com",
          name: "Ariyan Ashfaque",
        },
      ],
      filesArray: [],
    },
    {
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      status: [
        {
          id: "1",
          status: "Assessment",
          isCompleted: false,
          isProgress: true,
        },
        {
          id: "2",
          status: "1st Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "3",
          status: "2nd Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "4",
          status: "Closed",
          isCompleted: false,
          isProgress: false,
        },
      ],
      leadAuditor: {
        id: "ariyan.ashfaque.ext@holcim.com",
        name: "Ariyan Ashfaque",
      },
      otherTeamMembers: [
        {
          id: "ariyan.ashfaque.ext@holcim.com",
          name: "Ariyan Ashfaque",
        },
      ],
      filesArray: [],
    },
    {
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      status: [
        {
          id: "1",
          status: "Assessment",
          isCompleted: false,
          isProgress: true,
        },
        {
          id: "2",
          status: "1st Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "3",
          status: "2nd Approval",
          isCompleted: false,
          isProgress: false,
        },
        {
          id: "4",
          status: "Closed",
          isCompleted: false,
          isProgress: false,
        },
      ],
      leadAuditor: {
        id: "ariyan.ashfaque.ext@holcim.com",
        name: "Ariyan Ashfaque",
      },
      otherTeamMembers: [
        {
          id: "ariyan.ashfaque.ext@holcim.com",
          name: "Ariyan Ashfaque",
        },
      ],
      filesArray: [],
    },
  ];

  // filter all assessment by date whic is of current year and previous years and store in other array
  currentYearAssessments = this.allAssessments.filter(
    (assessment) =>
      new Date(assessment.date).getFullYear() === new Date().getFullYear(),
  );

  // filter all assessment by status open or closed and store in other array
  openAssessments = this.currentYearAssessments.filter(
    (assessment) =>
      assessment.status[assessment.status.length - 1].status === "Open",
  );

  closedAssessments = this.currentYearAssessments.filter(
    (assessment) =>
      assessment.status[assessment.status.length - 1].status === "Closed",
  );

  previousYearAssessments = this.allAssessments.filter(
    (assessment) =>
      new Date(assessment.date).getFullYear() < new Date().getFullYear(),
  );

  printAssessments() {
    console.log("all assessments: ", this.allAssessments);
    console.log("open assessments: ", this.openAssessments);
    console.log("closed assessments: ", this.closedAssessments);
    console.log("current year assessments: ", this.currentYearAssessments);
    console.log("previous year assessments: ", this.previousYearAssessments);
  }

  // a function for year based filter for previousYearAssessments array
  yearBasedFilter = (year: number) => {
    return this.previousYearAssessments.filter(
      (assessment) => new Date(assessment.date).getFullYear() === year,
    );
  };
}
