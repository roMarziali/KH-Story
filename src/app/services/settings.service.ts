import { EventEmitter, Injectable } from '@angular/core';
import { Visibility } from '../models/visibility.model';
import visibility from '../assets/visibility-settings.json';
import { Filter } from 'src/app/models/filter.model';
import filters from '../assets/filters.json';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: { filters: Filter[], visibility: Visibility[] } = {
    filters: filters as Filter[],
    visibility: visibility as Visibility[]
  }


  filtersChange = new EventEmitter();

  constructor() {
    this.loadLocalParameters();
  }

  filterChanged() {
    this.saveParameters();
    this.filtersChange.emit();
  }

  saveParameters() {
    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  loadLocalParameters() {
    const localSettings = localStorage.getItem('settings');
    if (localSettings) {
      const localSettingsParsed = JSON.parse(localSettings);
      for (const settingCategory in localSettingsParsed) {
        if (settingCategory in this.settings) {
          // Pas très joli mais obligé de rajouter ces conditions pour que le typage fonctionne. Pose souci que si on veut rajouter une famille, il faudra rajouter une condition... Chercher une solution plus propre
          if (settingCategory === 'filters') {
            this.settings[settingCategory] = localSettingsParsed[settingCategory] as Filter[];
          } else if (settingCategory === 'visibility') {
            this.settings[settingCategory] = localSettingsParsed[settingCategory] as Visibility[];
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
