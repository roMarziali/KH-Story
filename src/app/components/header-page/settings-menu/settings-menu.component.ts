import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.scss'
})
export class SettingsMenuComponent {

  constructor(public settingsService: SettingsService) { }


}
