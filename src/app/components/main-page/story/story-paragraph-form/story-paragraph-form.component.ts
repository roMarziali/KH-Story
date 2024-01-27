import { Component, Inject } from '@angular/core';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, ValidationErrors, FormArray } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import games from 'src/assets/data/games.json';

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

  paragraphForm = new FormGroup({
    texts: new FormArray([]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { textFormMetadata: TextFormMetadata, action: "adding" | "editing" }, private api: ApiService, public dialogRef: MatDialogRef<any>) {
    this.textFormMetadata = data.textFormMetadata;
    this.action = data.action;
    if (this.action == "adding") {
      this.addTextToForm();
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
    console.log(this.paragraphForm.value);
    if (this.paragraphForm.invalid) return;
    console.log("submission");
  }

  deleteTextFromForm(index: number) {
    (this.paragraphForm.get('texts') as FormArray).removeAt(index);
  }

  get texts() {
    return this.paragraphForm.controls.texts;
  }
}
