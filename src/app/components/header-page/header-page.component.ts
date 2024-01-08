import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent {

  constructor(public settingsService: SettingsService) { }

  formatRangeLabel(value: number): string {
    return value + "px";
  }
}
