import { Component, Input } from '@angular/core';
import { TextFormService } from 'src/app/services/text-form.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrl: './text-form.component.scss'
})
export class TextFormComponent {

  @Input() previousTitle!: number;
  @Input() previousParagraph!: number;
  @Input() relatedTitle!: number;
  @Input() relatedParagraph!: number;
  @Input() type!: 'title' | 'paragraph';
  @Input() action: 'modifying' | 'adding' = 'adding';
  @Input() title!: string;
  @Input() paragraph!: string;
  displayed: boolean = false;

  constructor(private textFormService: TextFormService, private authService: AuthService) {
    this.textFormService.displayedTextFormsChange.subscribe(() => {
      this.displayed = this.textFormService.isDisplayedTextForm({
        previousTitle: this.previousTitle,
        previousParagraph: this.previousParagraph,
        relatedTitle: this.relatedTitle,
        relatedParagraph: this.relatedParagraph,
        action: this.action
      });

      this.type = this.textFormService.getDisplayedTextFormType({
        previousTitle: this.previousTitle,
        previousParagraph: this.previousParagraph,
        relatedTitle: this.relatedTitle,
        relatedParagraph: this.relatedParagraph,
        action: this.action
      });
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  onSubmit(){

  }

  cancel(){
    this.paragraph = '';
    this.title = '';
    this.textFormService.removeDisplayedTextForm({
      previousTitle: this.previousTitle,
      previousParagraph: this.previousParagraph,
      relatedTitle: this.relatedTitle,
      relatedParagraph: this.relatedParagraph,
      action: this.action
    });
  }

}
