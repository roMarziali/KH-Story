import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor() { }

  storyReduced: boolean = false;
  settingsOpenened: boolean = false;

  toggleSettings() {
    this.settingsOpenened = !this.settingsOpenened;
    this.storyReduced = !this.storyReduced;
  }

}
