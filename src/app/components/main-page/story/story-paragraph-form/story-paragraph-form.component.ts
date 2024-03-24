import { Component, Inject } from '@angular/core';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import games from 'src/assets/data/games.json';
import { RawParagraph } from 'src/app/models/raw-section';
import { MatDialog } from '@angular/material/dialog';
import { AnnotationFormComponent } from './annotation-form/annotation-form.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ImageInfo {
  game: string;
  name: string;
}
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
  existingImages: ImageInfo[] = [];
  gamesWithImages: { id: string, name: string }[] = [];

  paragraphForm = new FormGroup({
    texts: new FormArray([]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { textFormMetadata: TextFormMetadata, action: "adding" | "editing", paragraph?: RawParagraph },
    private dialog: MatDialog, private api: ApiService, public dialogRef: MatDialogRef<any>, private snackBar: MatSnackBar) {
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
          relatedTo: new FormGroup({
            1: new FormControl(text.relatedTo[1], [Validators.required, Validators.minLength(1)]),
            2: new FormControl(text.relatedTo[2]),
          }),
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

  ngOnInit() {
    this.getImageList();
  }

  getImageList() {
    this.api.get('story/images').subscribe((data) => {
      this.existingImages = data;
      this.refreshGamesWithImages();
    });
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
    if (!this.paragraphForm.value.texts || this.paragraphForm.value.texts.length == 0) return;
    for (let i = 0; i < this.paragraphForm.value.texts.length; i++) {
      const imageSection = (this.paragraphForm.get('texts') as FormArray).at(i).get('image');
      if (!imageSection) continue;
      if (imageSection.get('game')?.value && (!imageSection.get('name')?.value || !imageSection.get('alt')?.value)) {
        this.snackBar.open("Certaines données d'image sont incomplètes", "Fermer", { duration: 2000 });
        return;
      }
    }
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
            this.snackBar.open("Paragraphe modifié", "Fermer", { duration: 2000 });
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

  openAnnotationComponent() {
    this.dialog.open(AnnotationFormComponent, {
      disableClose: true
    });
  }

  openImageComponent() {
    this.dialog.open(ImageFormComponent, {
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.getImageList();
    });
  }

  refreshGamesWithImages() {
    this.gamesWithImages = [];
    const gamesId: string[] = [];
    for (const existingImage of this.existingImages) {
      if (!gamesId.includes(existingImage.game)) {
        gamesId.push(existingImage.game);
        const gameName = this.games.find((game) => game.id.toLowerCase() == existingImage.game.toLowerCase())?.name;
        if (!gameName) continue;
        this.gamesWithImages.push({ id: existingImage.game, name: gameName });
      }
    }
  }

  getSelectedImageGame(index: number) {
    return (this.paragraphForm.get('texts') as FormArray).at(index).get('image.game')?.value;
  }

  getImagesForGame(game: string) {
    return this.existingImages.filter((image) => image.game == game);
  }
}
