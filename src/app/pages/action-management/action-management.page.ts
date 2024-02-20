import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-action-management',
  templateUrl: './action-management.page.html',
  styleUrls: ['./action-management.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ActionManagementPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
