import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrl: './user-comments.component.scss'
})
export class UserCommentsComponent {

  form = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(1100)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.email]),
  });

  addComment() {
    if (!this.form.valid) {
      return;
    }
  }
}
