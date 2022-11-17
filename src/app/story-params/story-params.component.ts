import { Component } from '@angular/core';
import { StoryComponent } from '../story/story.component';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';


@Component({
  selector: 'app-story-params',
  templateUrl: './story-params.component.html',
  styleUrls: ['./story-params.component.scss']
})
export class StoryParamsComponent {
  games: string[] = [];

  // reprendre avec ça puis tenter de basculer sur un angular material (sinon, virer le angular material pour les checkbox) https://www.itsolutionstuff.com/post/angular-dynamic-checkbox-list-exampleexample.html
  selectedGames: { [key: string]: boolean; } = {}

  constructor(private StoryComponent: StoryComponent) {
    this.games = this.StoryComponent.games;
    for (const game of this.games) this.selectedGames[game] = true;

  }

}
