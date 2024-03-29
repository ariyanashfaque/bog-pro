import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SAPActivityLogModel } from "src/app/store/models/sap.model";

@Component({
  standalone: true,
  selector: "app-sap-configaration-log",
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: "./sap-configaration-log.component.html",
  styleUrls: ["./sap-configaration-log.component.scss"],
})
export class SapConfigarationLogComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Input() sapLogs: SAPActivityLogModel[] = [];
  @Output() isMenuOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpenChange.emit(this.isMenuOpen);
  }
}
