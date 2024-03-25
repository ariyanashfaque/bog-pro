import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RoundProgressComponent } from "angular-svg-round-progressbar";

@Component({
  selector: "app-child-asset-modal",
  standalone: true,
  templateUrl: "./child-asset-modal.component.html",
  styleUrls: ["./child-asset-modal.component.scss"],
  imports: [RoundProgressComponent],
})
export class ChildAssetModalComponent implements OnInit {
  @Input() isAssetInfoOpen: boolean;
  // @Output() isModalMove: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    console.log("isAssetInfoOpen: ", this.isAssetInfoOpen);
  }

  ngOnInit() {
    // this.isModalMove.emit(this.isAssetInfoOpen);
  }
}
