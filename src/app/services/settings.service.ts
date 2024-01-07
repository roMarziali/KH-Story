import { EventEmitter, Injectable } from '@angular/core';
import { Visibility } from '../models/visibility.model';
import visibility from '../../assets/visibility-settings.json';
import { Filter } from 'src/app/models/filter.model';
import filters from '../../assets/filters.json';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: { filters: Filter[], visibility: Visibility[] } = {
    filters: filters as Filter[],
    visibility: visibility as Visibility[]
  }


  filtersChange = new EventEmitter();
  visibilityChange = new EventEmitter();

  constructor() {
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
    if (localSettings) {
      const localSettingsParsed = JSON.parse(localSettings);
      for (const settingCategory in localSettingsParsed) {
        if (settingCategory === 'filters') {
          for (const setting of localSettingsParsed[settingCategory]) {
            const relatedSettings = this.settings[settingCategory].find(s => s.id === setting.id);
            if (relatedSettings) relatedSettings.selected = setting.selected;
          }
        }
        else if (settingCategory === 'visibility') {
          for (const setting of localSettingsParsed[settingCategory]) {
            const relatedSettings = this.settings[settingCategory].find(s => s.id === setting.id);
            if (relatedSettings) relatedSettings.value = setting.value;
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

  getVisibilitySetting(visibilityId: string): any {
    const visibility = this.settings.visibility.find(v => v.id === visibilityId);
    return visibility ? visibility.value : false;
  }

}
