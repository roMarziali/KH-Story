import { Component } from '@angular/core';
import { StoryComponent } from '../story/story.component';

interface SourcesFilter {
  id: number,
  name: string,
  selected: boolean,
}

@Component({
  selector: 'app-story-params',
  templateUrl: './story-params.component.html',
  styleUrls: ['./story-params.component.scss']
})

export class StoryParamsComponent {
  sources: string[] = [];
  sourcesFilter: SourcesFilter[] = [];
  displayAnnotation: boolean = true;


  constructor(private StoryComponent: StoryComponent) {
    this.sources = this.StoryComponent.sources;
    for (const sourceId in this.sources) this.sourcesFilter.push({ id: parseInt(sourceId), name: this.sources[sourceId], selected: true });
    this.updateSourcesFilter();
    this.updateAnnotationFilter();

  }

  updateSourcesFilter() {
      this.StoryComponent.sourcesFilter =  this.minimizeSourceFilter();
  }

  minimizeSourceFilter() {
    const minSourcesFilter:number[] = []
    for (const source of this.sourcesFilter) {
      if (source.selected) minSourcesFilter.push(source.id);
    }
    return minSourcesFilter;
  }

  updateAnnotationFilter(){
    this.StoryComponent.displayAnnotation = this.displayAnnotation;
  }

}
