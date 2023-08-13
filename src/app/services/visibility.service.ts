import { Injectable } from '@angular/core';
import { Visibility } from '../models/visibility.model';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private settings: Visibility[] = [
    {
      id: 'nightMode',
      type: 'boolean',
      value: false
    },
    {
      id: 'font-police',
      type: 'options',
      options: ["Verdana", "Arial", "Times New Roman", "Helvetica", "Georgia", "Roboto"],
      value: "Verdana"
    },
    {
      id: 'font-size',
      type: 'options',
      options: ["10px", "12px", "14px", "16px", "18px", "20px"],
      value: "14px"
    },

  ];

  getVisibility(): Visibility[] {
    return this.settings;
  }

}
