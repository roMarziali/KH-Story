import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { information } from 'src/app/models/information';
import { InformationService } from 'src/app/services/information.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {


  openedInfoForm: boolean = false;
  title: string = '';
  content: string = '';
  infos: information[] = [];

  constructor(private informationService: InformationService, private authService: AuthService) { }

  ngOnInit() {
    this.informationService.updateInformationEvent.subscribe(() => {
      this.infos = this.informationService.informationList;
    });
    this.infos = this.informationService.informationList;
  }

  openAddInfoForm() {
    this.openedInfoForm = true;
  }

  addInfo() {
    if (this.title === '' || this.content === '') {
      return;
    }
    this.informationService.addInfo(this.title, this.content);
    this.openedInfoForm = false;
    this.title = '';
    this.content = '';
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }
}
