import { Component } from '@angular/core';
import { StoryComponent } from '../story/story.component';

interface GameFilter {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-story-params',
  templateUrl: './story-params.component.html',
  styleUrls: ['./story-params.component.scss']
})

export class StoryParamsComponent {
  games: string[] = [];
  gameFilters: GameFilter[] = [];

  constructor(private StoryComponent: StoryComponent) {
    this.games = this.StoryComponent.games;
    for (const game of this.games) this.gameFilters.push({ name: game, selected: true });
  }


}
