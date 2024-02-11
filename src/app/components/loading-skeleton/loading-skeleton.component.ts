import {
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonListHeader,
  IonSkeletonText,
} from "@ionic/angular/standalone";
import { Component, OnInit } from "@angular/core";

@Component({
  imports: [
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonListHeader,
    IonSkeletonText,
  ],
  standalone: true,
  selector: "app-loading-skeleton",
  templateUrl: "./loading-skeleton.component.html",
  styleUrls: ["./loading-skeleton.component.scss"],
})
export class LoadingSkeletonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
