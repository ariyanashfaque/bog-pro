import { Component, Input, OnInit } from "@angular/core";
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: "app-action-card",
  templateUrl: "./action-card.component.html",
  styleUrls: ["./action-card.component.scss"],
  standalone: true,
  imports: [IonIcon],
})
export class ActionCardComponent implements OnInit {
  showLess = true;
  isStarOutline = true;
  @Input() isOverdue: boolean = false;
  constructor() {}

  ngOnInit() {}

  toggleIcon(): void {
    this.isStarOutline = !this.isStarOutline;
    console.log("toggleIcon");
  }
}
