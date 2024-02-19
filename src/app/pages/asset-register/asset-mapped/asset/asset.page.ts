import { Component, OnInit } from "@angular/core";
import { IonContent } from "@ionic/angular/standalone";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "src/app/components/header/header.component";

@Component({
  standalone: true,
  selector: "app-asset",
  templateUrl: "./asset.page.html",
  styleUrls: ["./asset.page.scss"],
  imports: [IonContent, HeaderComponent, FormsModule, ReactiveFormsModule],
})
export class AssetPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
