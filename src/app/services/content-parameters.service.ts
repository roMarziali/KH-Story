import { Injectable } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/models/filter.model';
import { SettingsService } from './settings.service';
import { Settings } from 'src/app/models/settings.model';
import { Visibility } from '../models/visibility.model';
import {
  VisibilityService
} from './visibility.service';
@Injectable({
  providedIn: 'root'
})
export class ContentParametersService {

  filters: Filter[] = [];
  settings: Settings[] = [];
  visibility: Visibility[] = [];

  constructor(private filtersService: FiltersService, private settingsService: SettingsService, private visibilityService: VisibilityService) {
    this.filters = this.filtersService.getFilters();
    this.settings = this.settingsService.getSettings();
    this.visibility = this.visibilityService.getVisibility();
    this.loadParameters();
  }

  saveParameters() {
    localStorage.setItem('filters', JSON.stringify(this.filters));
    localStorage.setItem('settings', JSON.stringify(this.settings));
    localStorage.setItem('visibility', JSON.stringify(this.visibility));
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
  }



  loadVisibility() {
    const localVisibility = localStorage.getItem('visibility');
    if (localVisibility) {
      const localVisibilityParsed = JSON.parse(localVisibility);
      for (const visibility of localVisibilityParsed) {
        const visibilityIndex = this.visibility.findIndex(v => v.id === visibility.id);
        if (visibilityIndex !== -1) {
          this.visibility[visibilityIndex].value = visibility.value;
        }
      }
    }
  }


}
