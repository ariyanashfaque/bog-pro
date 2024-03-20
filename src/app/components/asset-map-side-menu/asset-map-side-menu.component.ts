import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-asset-map-side-menu",
  templateUrl: "./asset-map-side-menu.component.html",
  styleUrls: ["./asset-map-side-menu.component.scss"],
  standalone: true,
  imports: [],
})
export class AssetMapSideMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // @Input() isMenuOpen: boolean = false;
  // @Output() isMenuOpenChange: EventEmitter<boolean> =
  //   new EventEmitter<boolean>();
}
