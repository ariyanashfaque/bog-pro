import { Component, Input, OnInit } from "@angular/core";
import { IonIcon, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: "app-findings-card",
  templateUrl: "./findings-card.component.html",
  styleUrls: ["./findings-card.component.scss"],
  standalone: true,
  imports: [IonButton, IonIcon],
})
export class FindingsCardComponent implements OnInit {
  @Input() isOverdue: boolean = false;
  @Input() forDashboard: boolean = false;
  constructor() {}

  ngOnInit() {}
}
