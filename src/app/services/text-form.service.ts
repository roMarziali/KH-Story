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
    return this.displayedTextForms.some(tf => {
      return tf.previousSectionId === TextFormMetadata.previousSectionId &&
        tf.previousParagraphId === TextFormMetadata.previousParagraphId &&
        tf.chapterId === TextFormMetadata.chapterId
    });
  }

  addDisplayedTextForm(TextFormMetadata: TextFormMetadata): void {
    if (this.isDisplayedTextForm(TextFormMetadata)) return;
    this.displayedTextForms.push(TextFormMetadata);
    this.displayedTextFormsChange.emit(this.displayedTextForms);
  }

  getDisplayedTextFormType(TextFormMetadata: TextFormMetadata): 'title' | 'paragraph' {
    const displayedTextForm = this.displayedTextForms.find(tf => {
      return tf.previousSectionId === TextFormMetadata.previousSectionId &&
        tf.previousParagraphId === TextFormMetadata.previousParagraphId &&
        tf.relatedSectionId === TextFormMetadata.relatedSectionId &&
        tf.relatedParagraphId === TextFormMetadata.relatedParagraphId &&
        tf.chapterId === TextFormMetadata.chapterId
    });
    return displayedTextForm?.type || 'paragraph';
  }

  undisplayedTextForm(TextFormMetadata: TextFormMetadata): void {
    const searchedTextFormIndex = this.displayedTextForms.findIndex(tf => {
      return tf.previousSectionId === TextFormMetadata.previousSectionId &&
        tf.previousParagraphId === TextFormMetadata.previousParagraphId &&
        tf.relatedSectionId === TextFormMetadata.relatedSectionId &&
        tf.relatedParagraphId === TextFormMetadata.relatedParagraphId &&
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
