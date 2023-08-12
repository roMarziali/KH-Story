import { Injectable } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class ContentParametersService {

  filters: Filter[] = [];
  settings: undefined;
  visibility: undefined;

  constructor(public filtersService: FiltersService) {
    this.filters = filtersService.getFilters();
    this.loadParameters();
  }

  saveParameters() {
    localStorage.setItem('filters', JSON.stringify(this.filters));
    localStorage.setItem('settings', JSON.stringify(this.settings));
    localStorage.setItem('visibility', JSON.stringify(this.visibility));
  }

  loadParameters() {
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


}
