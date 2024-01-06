import { Injectable } from '@angular/core';
import { Visibility } from '../models/visibility.model';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private settings: Visibility[] = [
    {
      id: 'nightMode',
      label: 'Mode nuit',
      type: 'boolean',
      value: false
    },

    {
      id: 'font-police',
      label: 'Police',
      type: 'options',
      options: {
        "Verdana": "Verdana",
        "Arial": "Arial",
        "Times New Roman": "Times New Roman",
        "Helvetica": "Helvetica",
        "Georgia": "Georgia",
        "Roboto": "Roboto"
      },
      value: "Verdana"
    },

    {
      id: 'font-size',
      label: 'Taille de la police',
      type: 'options',
      options: {
        "12px": "12px",
        "14px": "14px",
        "16px": "16px",
        "18px": "18px",
        "20px": "20px"
      },
      value: "14px"
    },

    {
      id: 'width',
      label: 'Largeur de la page',
      type: 'range',
      value: 100
    },
  ];

  getVisibility(): Visibility[] {
    return this.settings;
  }

}
