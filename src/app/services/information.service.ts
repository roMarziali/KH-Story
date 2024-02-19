import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { information } from '../models/information';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  information: information[] = [];
  updateInformationEvent = new EventEmitter();

  constructor(private api: ApiService) {
    this.getInformation();
  }

  addInfo(title: string, content: string) {
    this.api.post('story/information', { title, content }).subscribe((res: any) => {
      this.getInformation();
    });
  }

  getInformation() {
    this.api.get('story/information').subscribe((data: any) => {
      this.information = data;
      this.information.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      this.updateInformationEvent.emit();
    });
  }

  get informationList(): information[] {
    return this.information;
  }

}
