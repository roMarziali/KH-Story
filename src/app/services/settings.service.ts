import { Injectable } from '@angular/core';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: Settings[] = [
    {
      id: 'annotations',
      options: ["Yes", "No"],
      value: "Yes"
    },
    {
      id: 'references',
      options: ["Yes", "No"],
      value: "Yes"
    }
  ];

  getSettings(): Settings[] {
    return this.settings;
  }

}
