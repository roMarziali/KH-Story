import { EventEmitter, Injectable } from '@angular/core';
import { Filter } from 'src/app/models/filter.model';
import games from 'src/assets/data/games.json';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings!: { filters: Filter[], visibility: any };

  filtersChange = new EventEmitter();
  visibilityChange = new EventEmitter();

  constructor() {
    const filters: Filter[] = [];
    games.forEach(game => {
      filters.push({
        id: game.id,
        name: game.name,
        selected: true
      });
    });
    this.settings = {
      filters,
      visibility: {
        "darkMode": false,
        "fontSizeEm": 1,
        displayAnnotations : true
      }
    }
    this.loadLocalParameters();

  }

  filterChanged() {
    this.saveParameters();
    this.filtersChange.emit();
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
        if (settingCategory === 'filters') {
          for (const setting of localSettingsParsed[settingCategory]) {
            const relatedSettings = this.settings[settingCategory].find(s => s.id === setting.id);
            if (relatedSettings) relatedSettings.selected = setting.selected;
          }
        }
        else if (settingCategory === 'visibility') {
          for (const setting of Object.keys(localSettingsParsed[settingCategory])) {
            const value = localSettingsParsed[settingCategory][setting];
            this.settings['visibility'][setting] = value;
          }
        }
      }
    }
  }

  isFilterSelected(filterId: string): boolean {
    const filter = this.settings.filters.find(f => f.id === filterId);
    return filter ? filter.selected : false;
  }

  isAtLeastOneFilterSelected(filters: string[]): boolean {
    return filters.some(f => this.isFilterSelected(f));
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
