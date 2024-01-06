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
        "Verdana": "Verdaba",
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
        "10px": "10px",
        "12px": "12px",
        "14px": "14px",
        "16px": "16px",
        "18px": "18px",
        "20px": "20px"
      },
      value: "14px"
    },

    {
      id: 'columns',
      type: 'options',
      label: 'Nombre de colonnes',
      options: {
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5"
      },
      value: "1"
    },

    {
      id: 'width',
      label: 'Largeur de la page',
      type: 'range',
      value: 100
    },

    {
      id: 'flex-align',
      label: 'Emplacement du texte',
      type: 'options',
      options: {
        "flex-start": "À gauche",
        "center": "Au centre",
        "flex-end": "À droite"
      },
      value: "flex-start"
    },

  ];

  getVisibility(): Visibility[] {
    return this.settings;
  }

}
