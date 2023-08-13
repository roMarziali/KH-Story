import { Component } from '@angular/core';

@Component({
  selector: 'app-user-content-manager',
  templateUrl: './user-content-manager.component.html',
  styleUrls: ['./user-content-manager.component.scss']
})
export class UserContentManagerComponent {
  displaySettings = false;

  toggleDisplaySetting() {
    this.displaySettings = !this.displaySettings;
  }
}
