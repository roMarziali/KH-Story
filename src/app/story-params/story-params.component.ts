import { Component } from '@angular/core';
import { StoryComponent } from '../story/story.component';

interface sourceFilter {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-story-params',
  templateUrl: './story-params.component.html',
  styleUrls: ['./story-params.component.scss']
})

export class StoryParamsComponent {
  sources: string[] = [];
  sourceFilters: sourceFilter[] = [];

  constructor(private StoryComponent: StoryComponent) {
    this.sources = this.StoryComponent.sources;
    for (const source of this.sources) this.sourceFilters.push({ name: source, selected: true });
  }


}
