import { Component, Inject } from '@angular/core';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-story-paragraph-form',
  templateUrl: './story-paragraph-form.component.html',
  styleUrl: './story-paragraph-form.component.scss'
})
export class StoryParagraphFormComponent {
  isLoading: boolean = false;
  textFormMetadata!: TextFormMetadata;
  action!: "adding" | "editing";

  paragraphForm = new FormGroup({
    paragraph: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { textFormMetadata: TextFormMetadata, action: "adding" | "editing" }, private api: ApiService, public dialogRef: MatDialogRef<any>) {
    this.textFormMetadata = data.textFormMetadata;
    this.action = data.action;
  }

  onSubmitParagraph() {
    if (this.paragraphForm.invalid) return;
    console.log("submission");
  }
}
