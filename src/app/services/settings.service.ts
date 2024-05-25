import { EventEmitter, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings!: { visibility: any };

  visibilityChange = new EventEmitter();

  constructor() {
    this.settings = {
      visibility: {
        "darkMode": false,
        "fontSizeEm": 1,
        displayAnnotations: true
      }
    }
    this.loadLocalParameters();

  }

  visibilityChanged() {
    this.saveParameters();
    this.visibilityChange.emit();
  }

  saveParameters() {
    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  loadLocalParameters() {
    const localSettings = localStorage.getItem('settings');
    if (localSettings && localSettings !== 'undefined') {
      const localSettingsParsed = JSON.parse(localSettings);
      for (const settingCategory in localSettingsParsed) {
        if (settingCategory === 'visibility') {
          for (const setting of Object.keys(localSettingsParsed[settingCategory])) {
            const value = localSettingsParsed[settingCategory][setting];
            this.settings['visibility'][setting] = value;
          }
        }
      }
    }
  }

  isDarkMode(): boolean {
    return this.settings.visibility.darkMode;
  }

  get storyFontSizeEm(): string {
    return this.settings.visibility.fontSizeEm + "em";
  }

  increaseFontSize() {
    if (this.settings.visibility.fontSizeEm >= 2.5) return;
    this.settings.visibility.fontSizeEm = this.settings.visibility.fontSizeEm + 0.125;
    this.visibilityChanged();
  }

  decreaseFontSize() {
    if (this.settings.visibility.fontSizeEm <= 0.5) return;
    this.settings.visibility.fontSizeEm = this.settings.visibility.fontSizeEm - 0.125;
    this.visibilityChanged();
  }

  toggleDarkMode() {
    this.settings.visibility.darkMode = !this.settings.visibility.darkMode;
    this.visibilityChanged();
  }

  get displayAnnotations(): boolean {
    return this.settings.visibility.displayAnnotations;
  }

}
