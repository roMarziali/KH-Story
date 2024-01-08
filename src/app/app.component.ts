import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KH-Story';

  constructor(private settingsService: SettingsService) {
    let darkMode = this.settingsService.isDarkMode();
    document.getElementsByTagName("body")[0].classList.toggle("dark-mode", darkMode);
    this.settingsService.visibilityChange.subscribe(() => {
      darkMode = this.settingsService.isDarkMode();
      document.getElementsByTagName("body")[0].classList.toggle("dark-mode", darkMode);
    });
  }
}
