import { EventEmitter, Injectable } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/models/filter.model';
import { Visibility } from '../models/visibility.model';
import { VisibilityService } from './visibility.service';
@Injectable({
  providedIn: 'root'
})
export class ContentParametersService {

  filters: Filter[] = [];
  visibility: Visibility[] = [];

  filtersChange = new EventEmitter();

  constructor(private filtersService: FiltersService, private visibilityService: VisibilityService) {
    this.filters = this.filtersService.getFilters();
    this.visibility = this.visibilityService.getVisibility();
    this.loadParameters();
  }

  filterChanged() {
    this.saveParameters();
    this.filtersChange.emit();
  }

  saveParameters() {
    localStorage.setItem('filters', JSON.stringify(this.filters));
    localStorage.setItem('visibility', JSON.stringify(this.visibility));
  }

  loadParameters() {
    this.loadFilters();
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
