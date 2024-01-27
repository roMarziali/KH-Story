import { Injectable, EventEmitter } from '@angular/core';
import { TextFormMetadata } from '../models/text-form-identifier';

@Injectable({
  providedIn: 'root'
})
export class TextFormService {

  displayedTextForms: TextFormMetadata[] = [];
  displayedTextFormsChange: EventEmitter<TextFormMetadata[]> = new EventEmitter();
  modifiedStoryEvent: EventEmitter<void> = new EventEmitter();

  isDisplayedTextForm(TextFormMetadata: TextFormMetadata): boolean {
    if (TextFormMetadata.action === 'editing') {
      return this.displayedTextForms.some(tf => {
        return tf.relatedTitle === TextFormMetadata.relatedTitle &&
          tf.relatedParagraph === TextFormMetadata.relatedParagraph &&
          tf.chapterId === TextFormMetadata.chapterId
      });
    } else if (TextFormMetadata.action === 'adding') {
      return this.displayedTextForms.some(tf => {
        return tf.previousTitle === TextFormMetadata.previousTitle &&
          tf.previousParagraph === TextFormMetadata.previousParagraph &&
          tf.chapterId === TextFormMetadata.chapterId
      });
    }
    return false;
  }

  addDisplayedTextForm(TextFormMetadata: TextFormMetadata): void {
    if (this.isDisplayedTextForm(TextFormMetadata)) return;
    this.displayedTextForms.push(TextFormMetadata);
    this.displayedTextFormsChange.emit(this.displayedTextForms);
  }

  getDisplayedTextFormType(TextFormMetadata: TextFormMetadata): 'title' | 'paragraph' {
    const displayedTextForm = this.displayedTextForms.find(tf => {
      return tf.previousTitle === TextFormMetadata.previousTitle &&
        tf.previousParagraph === TextFormMetadata.previousParagraph &&
        tf.relatedTitle === TextFormMetadata.relatedTitle &&
        tf.relatedParagraph === TextFormMetadata.relatedParagraph &&
        tf.chapterId === TextFormMetadata.chapterId
    });
    return displayedTextForm?.type || 'paragraph';
  }

  undisplayedTextForm(TextFormMetadata: TextFormMetadata): void {
    const searchedTextFormIndex = this.displayedTextForms.findIndex(tf => {
      return tf.previousTitle === TextFormMetadata.previousTitle &&
        tf.previousParagraph === TextFormMetadata.previousParagraph &&
        tf.relatedTitle === TextFormMetadata.relatedTitle &&
        tf.relatedParagraph === TextFormMetadata.relatedParagraph &&
        tf.chapterId === TextFormMetadata.chapterId
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
