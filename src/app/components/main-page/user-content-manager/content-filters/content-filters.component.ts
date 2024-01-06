import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Filter } from 'src/app/models/filter.model';
@Component({
  selector: 'app-content-filters',
  templateUrl: './content-filters.component.html',
  styleUrls: ['./content-filters.component.scss']
})
export class ContentFiltersComponent {

  filters: Filter[] = this.settingsService.settings.filters;

  constructor(private settingsService: SettingsService) {
    this.settingsService.filtersChange.subscribe(() => {
      this.filters = this.settingsService.settings.filters;
    });
  }

  filterChanged() {
    this.settingsService.filterChanged();
  }


}
