import { Injectable } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';
import { Filter } from 'src/app/models/filter.model';


@Injectable({
  providedIn: 'root'
})
export class ContentParametersService {

  filters: Filter[] = [];

  constructor(public filtersService: FiltersService) {
    this.filters = filtersService.getFilters();
  }

}
