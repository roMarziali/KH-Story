import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  openedSetings: boolean = false;

  constructor(private settingsService: SettingsService) {
    this.settingsService.toggleSettingsEvent.subscribe(() => {
      this.toggleSettings();
    });
   }

  toggleSettings() {
    this.openedSetings = !this.openedSetings;
  }
}
