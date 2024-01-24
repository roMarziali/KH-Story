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
  constructor(private authService: AuthService, private dialogRef: MatDialogRef<LoginComponent>) { }

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  isLoading: boolean = false;
  hide: boolean = true;
  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = "";
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password).subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.errorMessage = "Identifiants invalide";
      } else {
        this.dialogRef.close();
      }
      this.isLoading = false;
    });
  }

}
