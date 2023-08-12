import { Injectable } from '@angular/core';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private filters: Filter[] = [
    {
      id: 'KH1',
      name: 'Kingdom Hearts I'
    },
    {
      id: 'KHCoM',
      name: 'Kingdom Hearts: Chain of Memories'
    },
    {
      id: 'KH2',
      name: 'Kingdom Hearts II'
    },
    {
      id: 'KH3582Days',
      name: 'Kingdom Hearts 358/2 Days'
    },
    {
      id: 'KHBBS',
      name: 'Kingdom Hearts: Birth by Sleep'
    },
    {
      id: 'KHCoded',
      name: 'Kingdom Hearts Coded'
    },
    {
      id: 'KHDDD',
      name: 'Kingdom Hearts 3D: Dream Drop Distance'
    },
    {
      id: 'KH0pt2',
      name: 'Kingdom Hearts 0.2: Birth by Sleep - A Fragmentary Passage'
    },
    {
      id: 'KH3',
      name: 'Kingdom Hearts III'
    },
    {
      id: 'KHUX',
      name: 'Kingdom Hearts Union χ'
    },
    {
      id: 'KHUXBackCover',
      name: 'Kingdom Hearts Union χ Back Cover'
    },
    {
      id: 'KHMoM',
      name: 'Kingdom Hearts: Melody of Memory'
    },
    {
      id: 'Other',
      name: 'Autre (interviews, livres, etc.)'
    }
  ];

  getFilters(): Filter[] {
    return this.filters;
  }

}
