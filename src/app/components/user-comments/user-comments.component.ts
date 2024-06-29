import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.scss'
})
export class UserCommentsComponent {

  form = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(1100)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email]),
    antiSpamId: new FormControl(''),
    antiSpamAnswer: new FormControl('', [Validators.required]),
  });

  antiSpamQuestion!: string;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.apiService.get('user-comments/antispam-question').subscribe((result) => {
      this.antiSpamQuestion = result.question;
      this.form.get('antiSpamId')?.setValue(result.id);
    });
    this.refreshComments();
  }

  addComment() {
    if (!this.form.valid) return;

    let path = "user-comments/comment";
    if (this.authService.isAuthenticated) {
      path = "user-comments/admin-comment";
    }

    this.apiService.post(path, this.form.value).subscribe((result) => {
      if (result.error) alert(result.error);
      if (result.sent) {
        this.form.reset();
        this.refreshComments();
      }
    });
  }

  getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (!control) return "";
    if (control.hasError('required')) {
      return 'Le champ est obligatoire';
    }
    if (control.hasError('minlength')) {
      return `Au moins ${control.getError('minlength').requiredLength} caractères attendus`;
    }
    if (control.hasError('maxlength')) {
      return `Au plus ${control.getError('maxlength').requiredLength} caractères attendus`;
    }
    if (control.hasError('email')) {
      return 'Adresse email invalide';
    }
    return "";
  }

  refreshComments() {

  }
}
