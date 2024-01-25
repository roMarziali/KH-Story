import { Component, Input } from '@angular/core';
import { TextFormService } from 'src/app/services/text-form.service';

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
  displayed: boolean = false;

  constructor(private textFormService: TextFormService) {
    this.textFormService.displayedTextFormsChange.subscribe(() => {
      this.displayed = this.textFormService.isDisplayedTextForm({
        previousTitle: this.previousTitle,
        previousParagraph: this.previousParagraph,
        relatedTitle: this.relatedTitle,
        relatedParagraph: this.relatedParagraph,
        action: this.action
      });
    });
  }

}
