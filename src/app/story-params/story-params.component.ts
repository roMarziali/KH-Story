import { Component, EventEmitter, Output } from '@angular/core';
import { StoryComponent } from '../story/story.component';

interface SourcesFilter {
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
  @Output() sourceFilterModified = new EventEmitter()

  constructor(private StoryComponent: StoryComponent) {
    this.sources = this.StoryComponent.sources;
    for (const source of this.sources) this.sourcesFilter.push({ name: source, selected: true });
    this.StoryComponent.sourcesFilter = this.sourcesFilter;
  }

  updateSourcesFilter() {
    this.sourceFilterModified.emit(this.sourcesFilter);
  }

}
