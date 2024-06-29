import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.scss'
})
export class UserCommentsComponent {

  displayError = false;
  form = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(1100)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email]),
  });

  constructor(private apiService: ApiService) { }

  addComment() {
    if (!this.form.valid) {
      return;
    }
    this.apiService.post('user-comments/comments', this.form.value).subscribe((result) => {
      if (result.error) {
        alert(result.error);
      }
      if (result.sent) {
        console.log("Comment added successfully");
        this.form.reset();
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
}
