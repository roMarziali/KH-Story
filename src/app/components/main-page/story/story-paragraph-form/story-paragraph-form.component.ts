import { Component, Inject } from '@angular/core';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import games from 'src/assets/data/games.json';
import { Story, Chapter, ChapterSection, Paragraph, Image } from 'src/app/models/story';
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
  paragraph!: Paragraph;
  existingImages: ImageInfo[] = [];
  gamesWithImages: { id: string, name: string }[] = [];
  form = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(3)]),
    images: new FormArray([])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { textFormMetadata: TextFormMetadata, action: "adding" | "editing", paragraph: Paragraph },
    private dialog: MatDialog, private api: ApiService, public dialogRef: MatDialogRef<any>, private snackBar: MatSnackBar) {
    this.textFormMetadata = data.textFormMetadata;
    this.action = data.action;
    this.addTwoImageGroupInForm();
    if (this.action == "editing" && data.paragraph) {
      this.paragraph = data.paragraph;
      this.form.get('text')?.setValue(data.paragraph.text);
      if (data.paragraph.images && data.paragraph.images.length) {
        const imagesFormArray = this.form.get('images') as FormArray;
        let index = 0;
        for (const image of data.paragraph.images) {
          imagesFormArray.controls[index].get('game')?.setValue(image.game);
          imagesFormArray.controls[index].get('name')?.setValue(image.name);
          imagesFormArray.controls[index].get('alt')?.setValue(image.alt);
          index++;
        }
      }
    }
  }

  ngOnInit() {
    this.getImageList();
  }

  addTwoImageGroupInForm(){
    const imagesFormArray = this.form.get('images') as FormArray;
    for (let i = 0; i < 2; i++) {
      imagesFormArray.push(new FormGroup({
        game: new FormControl(''),
        name: new FormControl(''),
        alt: new FormControl('')
      }));
    }
  }

  getImageList() {
    this.api.get('story/images').subscribe((data) => {
      this.existingImages = data;
      this.refreshGamesWithImages();
    });
  }

  onSubmitParagraph() {
    if (this.form.invalid) return;
    const imageSection = this.form.get('image');
    if (imageSection) {
      if (imageSection.get('game')?.value && (!imageSection.get('name')?.value || !imageSection.get('alt')?.value)) {
        this.snackBar.open("Certaines données d'image sont incomplètes", "Fermer", { duration: 2000 });
        return;
      }
    }

    this.isLoading = true;
    if (this.action == "adding") {
      this.api.post('story/paragraph', { textFormMetadata: this.textFormMetadata, paragraph: this.form.value }).subscribe((data) => {
        if (data.status == "ok") {
          this.isLoading = false;
          this.dialogRef.close({ modified: true });
        }
      });
    } else if (this.action == "editing") {
      this.api.put(`story/paragraph/${this.textFormMetadata.chapterId}/${this.textFormMetadata.sectionId}/${this.textFormMetadata.paragraphId}`,
        { paragraph: this.form.value }).subscribe((data) => {
          if (data.status == "ok") {
            this.isLoading = false;
            this.dialogRef.close({ modified: true });
            this.snackBar.open("Paragraphe modifié", "Fermer", { duration: 2000 });
          }
        });
    }
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

  get images() {
    return this.form.controls.images;
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

  getImagesForSelectedGame(image: AbstractControl<any, any>): string[] {
    const selectedGame = image.get('game')?.value;
    if (!selectedGame) return [];
    const imagesForSelectedGame = this.existingImages.filter((image) => image.game.toLowerCase() == selectedGame.toLowerCase());
    return imagesForSelectedGame.map((image) => image.name);
  }
}
