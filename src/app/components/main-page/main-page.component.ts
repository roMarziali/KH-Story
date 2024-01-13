import { Component } from '@angular/core';
import { IntroComponent } from './intro/intro.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(public dialog: MatDialog) {}

  ngOnInit(){
    this.dialog.open(IntroComponent, {
      maxWidth: '350px',
      maxHeight: '310px'
    });
  }

}
