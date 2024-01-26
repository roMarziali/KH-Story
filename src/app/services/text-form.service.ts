import { Injectable, EventEmitter } from '@angular/core';
import { TextFormIdentifier } from '../models/text-form-identifier';

@Injectable({
  providedIn: 'root'
})
export class TextFormService {

  displayedTextForms: TextFormIdentifier[] = [];
  displayedTextFormsChange: EventEmitter<TextFormIdentifier[]> = new EventEmitter();

  isDisplayedTextForm(textFormIdentifier: TextFormIdentifier): boolean {
    if (textFormIdentifier.action === 'editing') {
      return this.displayedTextForms.some(tf => {
        return tf.relatedTitle === textFormIdentifier.relatedTitle &&
          tf.relatedParagraph === textFormIdentifier.relatedParagraph &&
          tf.chapterId === textFormIdentifier.chapterId
      });
    } else if (textFormIdentifier.action === 'adding') {
      return this.displayedTextForms.some(tf => {
        return tf.previousTitle === textFormIdentifier.previousTitle &&
          tf.previousParagraph === textFormIdentifier.previousParagraph &&
          tf.chapterId === textFormIdentifier.chapterId
      });
    }
    return false;
  }

  addDisplayedTextForm(textFormIdentifier: TextFormIdentifier): void {
    if (this.isDisplayedTextForm(textFormIdentifier)) return;
    this.displayedTextForms.push(textFormIdentifier);
    this.displayedTextFormsChange.emit(this.displayedTextForms);
  }

  getDisplayedTextFormType(textFormIdentifier: TextFormIdentifier): 'title' | 'paragraph' {
    const displayedTextForm = this.displayedTextForms.find(tf => {
      return tf.previousTitle === textFormIdentifier.previousTitle &&
        tf.previousParagraph === textFormIdentifier.previousParagraph &&
        tf.relatedTitle === textFormIdentifier.relatedTitle &&
        tf.relatedParagraph === textFormIdentifier.relatedParagraph &&
        tf.chapterId === textFormIdentifier.chapterId
    });
    return displayedTextForm?.type || 'paragraph';
  }

  removeDisplayedTextForm(textFormIdentifier: TextFormIdentifier): void {
    const searchedTextFormIndex = this.displayedTextForms.findIndex(tf => {
      return tf.previousTitle === textFormIdentifier.previousTitle &&
        tf.previousParagraph === textFormIdentifier.previousParagraph &&
        tf.relatedTitle === textFormIdentifier.relatedTitle &&
        tf.relatedParagraph === textFormIdentifier.relatedParagraph &&
        tf.chapterId === textFormIdentifier.chapterId
    });
    if (searchedTextFormIndex === -1) return;
    this.displayedTextForms.splice(searchedTextFormIndex, 1);
    this.displayedTextFormsChange.emit(this.displayedTextForms);
  }

  undisplayAllTextForms(): void {
    this.displayedTextForms = [];
    this.displayedTextFormsChange.emit(this.displayedTextForms);
  }
}
