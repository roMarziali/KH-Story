import { Injectable } from '@angular/core';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private filters: Filter[] = [
    {
      id: 'KH1',
      name: 'Kingdom Hearts I',
      selected: true
    },
    {
      id: 'KHCoM',
      name: 'KH: Chain of Memories',
      selected: true
    },
    {
      id: 'KH2',
      name: 'Kingdom Hearts II',
      selected: true
    },
    {
      id: 'KH3582Days',
      name: 'KH 358/2 Days',
      selected: true
    },
    {
      id: 'KHBBS',
      name: 'KH: Birth by Sleep',
      selected: true
    },
    {
      id: 'KHCoded',
      name: 'KH Coded',
      selected: true
    },
    {
      id: 'KHDDD',
      name: 'KH 3D: Dream Drop Distance',
      selected: true
    },
    {
      id: 'KH0pt2',
      name: 'KH 0.2: Birth by Sleep - A Fragmentary Passage',
      selected: true
    },
    {
      id: 'KH3',
      name: 'KKingdom HeartsH III',
      selected: true
    },
    {
      id: 'KHUX',
      name: 'KH Union χ',
      selected: true
    },
    {
      id: 'KHUXBackCover',
      name: 'KH Union χ Back Cover',
      selected: true
    },
    {
      id: 'KHMoM',
      name: 'KH: Melody of Memory',
      selected: true
    },
    {
      id: 'Other',
      name: 'Autre (interviews, livres, etc.)',
      selected: true
    }
  ];

  getFilters(): Filter[] {
    return this.filters;
  }

}
