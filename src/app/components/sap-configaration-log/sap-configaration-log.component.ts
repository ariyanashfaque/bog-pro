import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "app-sap-configaration-log",
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: "./sap-configaration-log.component.html",
  styleUrls: ["./sap-configaration-log.component.scss"],
})
export class SapConfigarationLogComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Output() isMenuOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  timeline: { time: string; date: string; details: string }[] = [
    ...Array(3)
      .fill(0)
      .map((_, i) => ({
        time: `${i * 2 + 10}:00 AM`,
        date: new Date().toISOString().split("T")[0],
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maece nas commodo nec dui ultrices consequat.",
      })),
    ...Array(3)
      .fill(0)
      .map((_, i) => ({
        time: `${i * 2 + 11}:00 AM`,
        date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
        details:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maece nas commodo nec dui ultrices consequat.",
      })),
  ];

  constructor() {}

  ngOnInit() {}

  menuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuOpenChange.emit(this.isMenuOpen);
  }
}
