import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent {

  displaySettingsMenu: boolean = false;

  constructor(public settingsService: SettingsService, private matDialog: MatDialog, private authService: AuthService) { }

  openLoginDialog() {
    this.matDialog.open(LoginComponent, {});
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
  }

  triggerSettingsMenu() {
    this.displaySettingsMenu = !this.displaySettingsMenu;
  }
}
