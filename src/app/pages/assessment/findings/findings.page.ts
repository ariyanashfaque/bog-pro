import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-findings',
  templateUrl: './findings.page.html',
  styleUrls: ['./findings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FindingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
