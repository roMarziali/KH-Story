import { Component } from '@angular/core';
import { Segment } from 'src/app/models/segment';
import { ApiService } from 'src/app/services/api.service';
import { AnnotationsService } from 'src/app/services/annotations.service';
import { ContentParametersService } from 'src/app/services/content-parameters.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  segments: Segment[] = [];

  constructor(private api: ApiService, private annotations: AnnotationsService, private contentParameters: ContentParametersService) { }

  ngOnInit() {
    this.annotations.getAnnotations(); // A appeler avant les segments car les segments vont utiliser les annotations
    this.api.get('story/segments').subscribe((data) => {
      this.segments = data
      this.sortSegments();
    });
  }

  sortSegments() {
    this.segments.sort((a, b) => {
      if (a.order === null) return 1;
      if (b.order === null) return -1;
      return a.order - b.order;
    });
  }

  getCSS(property: string): string | number | boolean {
    return this.contentParameters.visibility.find(v => v.id === property)?.value || '';
  }

  getCSSWidth(): number {
    const width = this.contentParameters.visibility.find(v => v.id === "width")?.value
    if (!width || typeof (width) !== "number") return 95;
    else {
      return width - 5;
    }
  }


}
