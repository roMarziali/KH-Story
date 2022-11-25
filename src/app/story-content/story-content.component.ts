import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-story-content',
  templateUrl: './story-content.component.html',
  styleUrls: ['./story-content.component.scss']
})
export class StoryContentComponent {

  storySegments: any = [];
  @Input() storedSourcesFilter: Number[] = [];

  constructor() {
    this.storySegments = this.getStorySegments()
  }

  displayMethod(storySegment: any) {
    for (const source of storySegment.sources) {
      if (this.storedSourcesFilter.includes(source)) return "mainDisplay";
    }
    if (storySegment.alternative) {
      for (const source of storySegment.alternative.sources) {
        if (this.storedSourcesFilter.includes(source)) return "alternatedDisplay";
      }
    }
    return "noDisplay";
  }

  getStorySegments(): object[] {
    return [
      {
        "order": 1,
        "content": "Ère des Contes de Fées",
        "class": "h1",
        "sources": [0, 8]
      },

      {
        "order": 2,
        "content": "Les Îles du Destin",
        "class": "h2",
        "sources": [1]
      },

      {
        "order": 3,
        "content": "Rencontre avec un inconnu",
        "class": "h3",
        "sources": [2, 3, 6]
      },
      {
        "order": 4,
        "content": "Ceci est l'histoire de Sora",
        "class": "body",
        "sources": [2, 4, 5],
        "alternative": {
          "content": "Ceci est l'histoire d'un garçon armé d'une clé géante",
          "sources": [7, 8]
        },
        "annotation": {
          "content": "Ceci est une annotation !"
        },
        "retcon": {
          "content": "Dans le tout premier jeu, Sora est armé d'une tronçonneuse"
        }
      }
    ]
  }

}

interface SourcesFilter {
  name: string,
  selected: boolean,
}
