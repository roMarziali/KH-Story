import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adding-text',
  templateUrl: './adding-text.component.html',
  styleUrl: './adding-text.component.scss'
})
export class AddingTextComponent {

  constructor(private authService: AuthService) { }

  @Input() previousTitle: number = 0;
  @Input() previousParagraph: number = 0;

  addTitle() {
    console.log(this.previousParagraph);
    console.log(this.previousTitle);
  }

  addParagraph() { }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

}
