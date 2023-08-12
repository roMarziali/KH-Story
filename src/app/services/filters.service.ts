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
      name: 'Kingdom Hearts: Chain of Memories',
      selected: true
    },
    {
      id: 'KH2',
      name: 'Kingdom Hearts II',
      selected: true
    },
    {
      id: 'KH3582Days',
      name: 'Kingdom Hearts 358/2 Days',
      selected: true
    },
    {
      id: 'KHBBS',
      name: 'Kingdom Hearts: Birth by Sleep',
      selected: true
    },
    {
      id: 'KHCoded',
      name: 'Kingdom Hearts Coded',
      selected: true
    },
    {
      id: 'KHDDD',
      name: 'Kingdom Hearts 3D: Dream Drop Distance',
      selected: true
    },
    {
      id: 'KH0pt2',
      name: 'Kingdom Hearts 0.2: Birth by Sleep - A Fragmentary Passage',
      selected: true
    },
    {
      id: 'KH3',
      name: 'Kingdom Hearts III',
      selected: true
    },
    {
      id: 'KHUX',
      name: 'Kingdom Hearts Union χ',
      selected: true
    },
    {
      id: 'KHUXBackCover',
      name: 'Kingdom Hearts Union χ Back Cover',
      selected: true
    },
    {
      id: 'KHMoM',
      name: 'Kingdom Hearts: Melody of Memory',
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
