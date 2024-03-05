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
  IonButtons,
  IonAvatar,
  IonButton,
} from "@ionic/angular/standalone";
import { idCard } from "ionicons/icons";

@Component({
  selector: "app-assessment-modal",
  standalone: true,
  templateUrl: "./assessment-modal.component.html",
  styleUrls: ["./assessment-modal.component.scss"],
  imports: [
    IonButton,
    IonAvatar,
    IonButtons,
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

  // A dummy array for the select options with the user names and emails
  users = [
    {
      id: 1,
      name: "Ariyan Ashfaq",
      email: "ariyan@holcim.com",
      selected: false,
    },
    {
      id: 2,
      name: "Mustafa Iram",
      email: "mustafa@gmail.com",
      selected: false,
    },
    {
      id: 3,
      name: "M.H. Nahib",
      email: "nahib@holcim.com",
      selected: false,
    },
    {
      id: 4,
      name: "Sadia Tasnim",
      email: "sadia@holcim.com",
      selected: false,
    },
    {
      id: 5,
      name: "Uttam Roy",
      email: "uttam@yahoo.c0m",
      selected: false,
    },
    {
      id: 6,
      name: "Nazmul Kabir",
      email: "kabir@holcim.com",
      selected: false,
    },
    {
      id: 7,
      name: "Ashikul Shafol",
      email: "shofol@holcim.com",
    },
    {
      id: 8,
      name: "Musaddi Rafi",
      email: "rafi@gmail.com",
    },
  ];

  // a array for the selected users from the select options
  selectedUsers: any[] = [];

  // a function to add the selected user to the selectedUsers array
  addUser(user: any) {
    this.selectedUsers.push(user);
    user.selected = true;
    console.log(this.selectedUsers);
    console.log(this.users);
  }

  // a function to remove the selected user from the selectedUsers array
  removeUser(user: any) {
    this.selectedUsers = this.selectedUsers.filter(
      (selectedUser) => selectedUser !== user,
    );
    user.selected = false;
  }
}
