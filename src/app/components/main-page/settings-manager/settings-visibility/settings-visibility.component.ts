import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
@Component({
  selector: 'app-settings-visibility',
  templateUrl: './settings-visibility.component.html',
  styleUrls: ['./settings-visibility.component.scss']
})
export class SettingsVisibilityComponent {

  constructor(public settingsService: SettingsService) { }

  Object = Object; // To use Object.keys in template (ngFor with keyvalue pipe sort by alphabetical order, it is an issue for some select options)

  formatRangeLabel(value: number): string {
    return value + "px";
  }

}
