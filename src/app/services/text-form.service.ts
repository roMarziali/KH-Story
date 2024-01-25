import { Injectable, EventEmitter } from '@angular/core';

export interface TextFormIdentifier {
  previousTitle?: number,
  previousParagraph?: number,
  relatedTitle?: number,
  relatedParagraph?: number,
  type?: 'title' | 'paragraph'
  action?: 'modifying' | 'adding'
}

@Injectable({
  providedIn: 'root'
})
export class TextFormService {

  displayedTextForms: TextFormIdentifier[] = [];
  displayedTextFormsChange: EventEmitter<TextFormIdentifier[]> = new EventEmitter();

  isDisplayedTextForm(textForm: TextFormIdentifier): boolean {
    if (textForm.action === 'modifying') {
      return this.displayedTextForms.some(tf => {
        return tf.relatedTitle === textForm.relatedTitle &&
          tf.relatedParagraph === textForm.relatedParagraph
      });
    } else if (textForm.action === 'adding') {
      return this.displayedTextForms.some(tf => {
        return tf.previousTitle === textForm.previousTitle &&
          tf.previousParagraph === textForm.previousParagraph
      });
    }
    return false;
  }

  addDisplayedTextForm(textForm: TextFormIdentifier): void {
    if (this.isDisplayedTextForm(textForm)) return;
    this.displayedTextForms.push(textForm);
    this.displayedTextFormsChange.emit(this.displayedTextForms);
  }

  getDisplayedTextFormType(textForm: TextFormIdentifier): 'title' | 'paragraph' {
    if (textForm.action === 'modifying') {
      return 'title';
    } else if (textForm.action === 'adding') {
      return 'paragraph';
    }
    return 'paragraph';
  }
}
