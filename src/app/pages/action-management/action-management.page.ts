import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { HeaderComponent } from "src/app/components/header-component/header.component";
import { FindingsCardComponent } from "src/app/components/findings-card/findings-card.component";
import { ActionManagementModalComponent } from "src/app/components/action-management-modal/action-management-modal.component";
import { ActionCardComponent } from "src/app/components/action-card/action-card.component";

@Component({
  selector: "app-action-management",
  templateUrl: "./action-management.page.html",
  styleUrls: ["./action-management.page.scss"],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    HeaderComponent,
    FindingsCardComponent,
    ActionManagementModalComponent,
    ActionCardComponent,
  ],
})
export class ActionManagementPage implements OnInit {
  isMenuOpen: boolean;
  segment: string;
  actionToggleSegment: string;
  findingToggleSegment: string;
  isMenuToggleOpen = new EventEmitter<boolean>(false);
  constructor() {
    this.isMenuOpen = false;
    this.segment = "finding";
    this.actionToggleSegment = "actiontodoToggle";
    this.findingToggleSegment = "findingTodoToggle";
  }

  ngOnInit() {
    console.log(this.isMenuOpen);
  }

  handleFindingNestedSegmentChange(event: any) {
    this.findingToggleSegment = event.detail.value;
  }

  handleActionNestedSegmentChange(event: any) {
    this.actionToggleSegment = event.detail.value;
  }

  handleTopSegmentChange(event: any) {
    this.segment = event.detail.value;
  }

  filterFindings = (event: any) => {
    console.log(event);

    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuToggleOpen.emit(event);
  };
}
