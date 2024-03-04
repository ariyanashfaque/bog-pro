import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  IonRow,
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonText,
  IonLabel,
  IonTitle,
  IonSelect,
  IonTextarea,
  IonInput,
  IonSelectOption,
  IonIcon,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-assessment-modal",
  standalone: true,
  templateUrl: "./assessment-modal.component.html",
  styleUrls: ["./assessment-modal.component.scss"],
  imports: [
    IonIcon,
    IonInput,
    IonText,
    IonRow,
    IonCol,
    IonGrid,
    IonItem,
    IonList,
    IonLabel,
    IonTitle,
    IonSelect,
    IonTextarea,
    IonSelectOption,
  ],
})
export class AssessmentModalComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Output() isMenuOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpenChange.emit(this.isMenuOpen);
  }

  authorSearch: boolean = false;
  teamMemberSearch: boolean = false;
  toggleAuthorSearch() {
    this.authorSearch = !this.authorSearch;
  }
  toggleTeamMemberSearch() {
    this.teamMemberSearch = !this.teamMemberSearch;
  }
}
