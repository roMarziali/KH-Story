import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private dialogRef:MatDialogRef<LoginComponent>) { }

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  isLoading: boolean = false;
  hide: boolean = true;
  showError = false;

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.showError = false;
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.showError = true;
      } else {
        this.dialogRef.close();
      }
      this.isLoading = false;
    });
  }

}
