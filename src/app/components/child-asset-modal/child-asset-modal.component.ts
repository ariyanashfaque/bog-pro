import { Component, input, OnInit } from "@angular/core";
import { RoundProgressComponent } from "angular-svg-round-progressbar";

@Component({
  selector: "app-child-asset-modal",
  standalone: true,
  templateUrl: "./child-asset-modal.component.html",
  styleUrls: ["./child-asset-modal.component.scss"],
  imports: [RoundProgressComponent],
})
export class ChildAssetModalComponent implements OnInit {
  isAssetInfoMenuOpen = input(false);

  constructor() {}

  ngOnInit() {}
}
