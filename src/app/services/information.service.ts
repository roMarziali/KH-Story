import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { information } from '../models/information';
import { IntroComponent } from '../components/main-page/intro/intro.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  information: information[] = [];
  updateInformationEvent = new EventEmitter();

  constructor(private api: ApiService, private dialog: MatDialog) {
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
      this.openIntroDialogIfNew();
      this.updateInformationEvent.emit();
    });
  }

  get informationList(): information[] {
    return this.information;
  }

  get informationlastId(): number {
    if (this.information.length === 0) {
      return 0;
    }
    return this.information[0].id;
  }

  openIntroDialog() {
    this.dialog.open(IntroComponent);
    const now = new Date();
    localStorage.setItem('lastIntroId', this.informationlastId.toString());
  }

  openIntroDialogIfNew() {
    if (!localStorage.getItem('lastIntroId') || typeof localStorage.getItem('lastIntroId') === 'undefined') {
      this.openIntroDialog();
    } else {
      const lastIntroId = localStorage.getItem('lastIntroId');
      if (!lastIntroId) {
        this.openIntroDialog();
        return;
      }
      if (this.informationlastId > Number(lastIntroId)) {
        this.openIntroDialog();
      }
    }
  }

}
