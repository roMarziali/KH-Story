import { Component } from '@angular/core';
import { Annotation } from 'src/app/models/annotation';
import { StoryService } from 'src/app/services/story.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-annotation-form',
  templateUrl: './annotation-form.component.html',
  styleUrl: './annotation-form.component.scss'
})
export class AnnotationFormComponent {

  displayedColumns: string[] = ['id', 'content'];
  dataSource!: MatTableDataSource<Annotation>;
  newAnnotationContent: string = '';

  constructor(private storyService: StoryService, private apiService: ApiService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.refreshAnnotations();
  }

  refreshAnnotations() {
    this.apiService.get('story/annotations').subscribe((data: Annotation[]) => {
      this.storyService.annotations = data;
      this.dataSource = new MatTableDataSource(this.storyService.annotations);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  copyToClipboard(annotationId: number) {
    const string = `[annotation:${annotationId}][/annotation]`
    navigator.clipboard.writeText(string).then(() => {
      this._snackBar.open('Annotation copiée dans le presse-papier', 'Fermer', {
        duration: 2000,
      });
    }).catch((err) => {
      console.error('Error copying text to clipboard', err);
    });
  }

  addAnnotation() {
    if (this.newAnnotationContent.length < 3) {
      alert('Annotation content must be at least 3 characters long');
      return;
    }
    this.apiService.post('story/annotations', { content: this.newAnnotationContent }).subscribe((data: Annotation) => {
      this._snackBar.open('Annotation ajoutée', 'Fermer', {
        duration: 2000,
      });
      this.refreshAnnotations();
      this.newAnnotationContent = '';
    });
  }

}
