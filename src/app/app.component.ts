import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KH-Story';
  darkMode!: boolean;

  constructor(private settingsService: SettingsService) {
    this.darkMode = this.settingsService.isDarkMode();
    this.settingsService.visibilityChange.subscribe(() => {
      this.darkMode = this.settingsService.isDarkMode();
    });
  }
}
