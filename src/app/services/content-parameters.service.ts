import { Injectable } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/models/filter.model';
import { SettingsService } from './settings.service';
import { Settings } from 'src/app/models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class ContentParametersService {

  filters: Filter[] = [];
  settings: Settings[] = [];
  visibility: undefined;

  constructor(private filtersService: FiltersService, private settingsService: SettingsService) {
    this.filters = this.filtersService.getFilters();
    this.settings = this.settingsService.getSettings();
    this.loadParameters();
  }

  saveParameters() {
    localStorage.setItem('filters', JSON.stringify(this.filters));
    localStorage.setItem('settings', JSON.stringify(this.settings));
    //  localStorage.setItem('visibility', JSON.stringify(this.visibility));
  }

  loadParameters() {
    this.loadFilters();
    this.loadSettings();
    this.loadVisibility();
  }

  loadFilters() {
    const localFilters = localStorage.getItem('filters');
    if (localFilters) {
      const localFiltersParsed = JSON.parse(localFilters);
      for (const filter of localFiltersParsed) {
        const filterIndex = this.filters.findIndex(f => f.id === filter.id);
        if (filterIndex !== -1) {
          this.filters[filterIndex].selected = filter.selected;
        }
      }
    }
  }

  loadSettings() {
    const localSettings = localStorage.getItem('settings');
    if (localSettings) {
      const localSettingsParsed = JSON.parse(localSettings);
      for (const setting of localSettingsParsed) {
        const settingIndex = this.settings.findIndex(s => s.id === setting.id);
        if (settingIndex !== -1) {
          this.settings[settingIndex].value = setting.value;
        }
      }

    }
    return
  }



  loadVisibility() {
  }


}
