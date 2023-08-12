import { Injectable } from '@angular/core';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: Settings[] = [
    {
      id: 'annotations',
      options: ["bubble", "footnote", "hidden"],
      value: "bubble"
    },
    {
      id: 'references',
      options: ["visible", "hidden"],
      value: "visible"
    }
  ];

  getSettings(): Settings[] {
    return this.settings;
  }

}
