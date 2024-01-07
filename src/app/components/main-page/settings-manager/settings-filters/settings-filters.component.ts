import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Filter } from 'src/app/models/filter.model';
@Component({
  selector: 'app-settings-filters',
  templateUrl: './settings-filters.component.html',
  styleUrls: ['./settings-filters.component.scss']
})
export class SettingsFiltersComponent {

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
