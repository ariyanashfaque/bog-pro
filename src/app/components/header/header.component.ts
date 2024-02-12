import {
  IonIcon,
  IonTitle,
  IonHeader,
  IonButton,
  IonButtons,
  IonToolbar,
  IonBackButton,
} from "@ionic/angular/standalone";
import { Input, OnInit, Component } from "@angular/core";

@Component({
  imports: [
    IonIcon,
    IonTitle,
    IonHeader,
    IonButton,
    IonToolbar,
    IonButtons,
    IonBackButton,
  ],
  standalone: true,
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() headerTitle: string = "";
  @Input() showIcons: boolean = true;
  @Input() isDefaultHref: boolean = false;

  constructor() {}

  ngOnInit() {}
}
