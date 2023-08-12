import { Injectable } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/models/filter.model';
import { Settings } from 'src/app/models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class ContentParametersService {

  filters: Filter[] = [];
  settings: Settings = {
    annotations: "bubble",
    references: "visible",
  };
  visibility: undefined;

  constructor(public filtersService: FiltersService) {
    this.filters = filtersService.getFilters();
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
      const localSettingParsed = JSON.parse(localSettings);
      for (const setting of Object.keys(this.settings)) {
        if (setting === "annotations" || setting === "references") {
          this.settings[setting] = localSettingParsed[setting];
        }
      }
    }
  }



  loadVisibility() {
  }


}
