import { Injectable, EventEmitter } from '@angular/core';

export interface TextFormIdentifier {
  previousTitle?: number,
  previousParagraph?: number,
  relatedTitle?: number,
  relatedParagraph?: number,
  type?: 'title' | 'paragraph'
  action?: 'editing' | 'adding'
}

@Injectable({
  providedIn: 'root'
})
export class TextFormService {

  displayedTextForms: TextFormIdentifier[] = [];
  displayedTextFormsChange: EventEmitter<TextFormIdentifier[]> = new EventEmitter();

  isDisplayedTextForm(textForm: TextFormIdentifier): boolean {
    if (textForm.action === 'editing') {
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
    const displayedTextForm = this.displayedTextForms.find(tf => {
      return tf.previousTitle === textForm.previousTitle &&
        tf.previousParagraph === textForm.previousParagraph &&
        tf.relatedTitle === textForm.relatedTitle &&
        tf.relatedParagraph === textForm.relatedParagraph
    });
    return displayedTextForm?.type || 'paragraph';
  }

  removeDisplayedTextForm(textForm: TextFormIdentifier): void {
    this.displayedTextForms = this.displayedTextForms.filter(tf => {
      return tf.previousTitle !== textForm.previousTitle ||
        tf.previousParagraph !== textForm.previousParagraph ||
        tf.relatedTitle !== textForm.relatedTitle ||
        tf.relatedParagraph !== textForm.relatedParagraph
    });
    this.displayedTextFormsChange.emit(this.displayedTextForms);
  }
}
