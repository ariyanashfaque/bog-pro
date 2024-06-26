import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "src/app/components/header-component/header.component";
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
import { RouterModule } from "@angular/router";
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
    RouterModule,
  ],
})
export class AssessmentPage implements OnInit {
  isAssessmentModalOpen: boolean = false;
  constructor() {}

  ngOnInit() {
    console.log("all assessments: ", this.allAssessments);
    console.log("open assessments: ", this.openAssessments);
    console.log("closed assessments: ", this.closedAssessments);
    console.log("current year assessments: ", this.currentYearAssessments);
    console.log("previous year assessments: ", this.previousYearAssessments);
    console.log("selectedYearAssessments: ", this.selectedYearAssessments);
  }

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
      id: "1",
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "PENDING",
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
      id: "2",
      type: "Cross",
      date: "2024-08-20",
      title: "2023-SIM-Black lane quarry",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "APPROVED ON 20th OCT",
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
      id: "3",
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "ESCALATED",
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
      id: "4",
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "APPROVED ON 20th OCT",
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
      id: "5",
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "ESCALATED",
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
      id: "6",
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "PENDING",
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
      id: "7",
      type: "Cross",
      date: "2024-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "PENDING",
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
      id: "8",
      type: "Cross",
      date: "2022-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "APPROVED ON 20th OCT",
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
      id: "9",
      type: "Cross",
      date: "2023-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "ESCALATED",
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
      id: "10",
      type: "Cross",
      date: "2023-08-20",
      title: "iCare sync test",
      scopeOfAudit: "scope of audit",
      template: "0AhIDh5LfadsLQItujgK",
      assessmentStatus: "PENDING",
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

  // and the years should be sorted in descending order
  previousYearsList = Array.from(
    new Set(
      this.previousYearAssessments.map((assessment) =>
        new Date(assessment.date).getFullYear(),
      ),
    ),
  ).sort((a, b) => b - a);

  // selectedYearAssessments: any[];

  selectedYear: number = this.previousYearsList[0];

  selectedYearAssessments = this.previousYearAssessments.filter(
    (assessment) =>
      new Date(assessment.date).getFullYear() == this.selectedYear,
  );

  onSelectYearChange(event: any) {
    console.log("Selected Year:", event.detail.value);
    this.selectedYear = event.detail.value;
    console.log("Selected Year Variable:", this.selectedYear);

    // filtering the previousYearAssessments array based on the selected year
    this.selectedYearAssessments = this.previousYearAssessments.filter(
      (assessment) =>
        new Date(assessment.date).getFullYear() == this.selectedYear,
    );
    console.log("Selected Year Assessments: ", this.selectedYearAssessments);
  }
}
