import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
@Component({
  selector: 'app-content-visibility',
  templateUrl: './content-visibility.component.html',
  styleUrls: ['./content-visibility.component.scss']
})
export class ContentVisibilityComponent {

  constructor(public settingsService: SettingsService) { }

  Object = Object; // To use Object.keys in template (ngFor with keyvalue pipe sort by alphabetical order, it is an issue for some select options)

  formatRangeLabel(value: number): string {
    return value + "%";
  }

}
