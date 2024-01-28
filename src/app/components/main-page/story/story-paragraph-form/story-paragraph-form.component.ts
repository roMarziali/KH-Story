import { Component, Inject } from '@angular/core';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, ValidationErrors, FormArray } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import games from 'src/assets/data/games.json';
import { RawParagraph } from 'src/app/models/raw-section';

@Component({
  selector: 'app-story-paragraph-form',
  templateUrl: './story-paragraph-form.component.html',
  styleUrl: './story-paragraph-form.component.scss'
})
export class StoryParagraphFormComponent {
  isLoading: boolean = false;
  textFormMetadata!: TextFormMetadata;
  action!: "adding" | "editing";
  games = games;
  rawParagraph!: RawParagraph;

  paragraphForm = new FormGroup({
    texts: new FormArray([]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { textFormMetadata: TextFormMetadata, action: "adding" | "editing", paragraph?: RawParagraph }, private api: ApiService, public dialogRef: MatDialogRef<any>) {
    this.textFormMetadata = data.textFormMetadata;
    this.action = data.action;
    if (this.action == "adding") {
      this.addTextToForm();
    }
    if (this.action == "editing" && data.paragraph) {
      this.rawParagraph = data.paragraph;
      this.rawParagraph.texts.forEach((text) => {
        const newTextSubForm = new FormGroup({
          text: new FormControl(text.text, [Validators.required, Validators.minLength(3)]),
          relatedTo: new FormControl(text.relatedTo, [Validators.required, Validators.minLength(1)]),
          image: new FormGroup({
            game: new FormControl(text.image?.game, [Validators.minLength(2)]),
            name: new FormControl(text.image?.name, [Validators.minLength(3)]),
            alt: new FormControl(text.image?.alt, [Validators.minLength(3)]),
          }),
        });
        (this.paragraphForm.get('texts') as FormArray).push(newTextSubForm);
      });
    }
  }

  addTextToForm() {
    const newTextSubForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.minLength(3)]),
      relatedTo: new FormControl([], [Validators.required, Validators.minLength(1)]),
      image: new FormGroup({
        game: new FormControl('', [Validators.minLength(2)]),
        name: new FormControl('', [Validators.minLength(3)]),
        alt: new FormControl('', [Validators.minLength(3)]),
      }),
    });
    (this.paragraphForm.get('texts') as FormArray).push(newTextSubForm);
  }

  onSubmitParagraph() {
    if (this.paragraphForm.invalid) return;
    this.isLoading = true;
    if (this.action == "adding") {
      this.api.post('story/paragraph', { textFormMetadata: this.textFormMetadata, paragraph: this.paragraphForm.value }).subscribe((data) => {
        if (data.status == "ok") {
          this.isLoading = false;
          this.dialogRef.close({ modified: true });
        }
      });
    } else if (this.action == "editing") {
      this.api.put(`story/paragraph/${this.textFormMetadata.chapterId}/${this.textFormMetadata.sectionId}/${this.textFormMetadata.paragraphId}`,
        { paragraph: this.paragraphForm.value }).subscribe((data) => {
          if (data.status == "ok") {
            this.isLoading = false;
            this.dialogRef.close({ modified: true });
          }
        });
    }
  }

  deleteTextFromForm(index: number) {
    (this.paragraphForm.get('texts') as FormArray).removeAt(index);
  }

  get texts() {
    return this.paragraphForm.controls.texts;
  }
}
