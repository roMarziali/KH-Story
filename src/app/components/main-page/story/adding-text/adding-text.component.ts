import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TextFormService } from 'src/app/services/text-form.service';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';

@Component({
  selector: 'app-adding-text',
  templateUrl: './adding-text.component.html',
  styleUrl: './adding-text.component.scss'
})
export class AddingTextComponent {

  constructor(private authService: AuthService, private textFormService: TextFormService) { }
  @Input() relatedTo: 'section' | 'paragraph' = 'section';
  @Input() textFormMetadata!: TextFormMetadata;

  addTitle() {
    this.textFormMetadata.type = 'title';
    this.textFormService.addDisplayedTextForm(this.textFormMetadata);
  }

  addParagraph() {
    console.log("add paragraph");
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  get isDisplayedTextForm() {
    if (!this.textFormMetadata) return false;
    return this.textFormService.isDisplayedTextForm(this.textFormMetadata);
  }

  get displayParagraphOption() :boolean{
    if (!this.textFormMetadata) return false;
    return (this.textFormMetadata.previousSectionId !== 0);
  }

}
