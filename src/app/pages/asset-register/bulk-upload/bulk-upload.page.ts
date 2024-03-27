import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
    selector: 'app-bulk-upload',
    templateUrl: './bulk-upload.page.html',
    styleUrls: ['./bulk-upload.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class BulkUploadPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
