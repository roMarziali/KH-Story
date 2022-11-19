import { Component } from '@angular/core';

@Component({
  selector: 'app-story-content',
  templateUrl: './story-content.component.html',
  styleUrls: ['./story-content.component.scss']
})
export class StoryContentComponent {

  storySegments: any = [];

  constructor() {
    this.storySegments = this.getStorySegments()
  }

  getStorySegments(): object[] {
    return [
      {
        "order": 1,
        "content": "Ère des Contes de Fées",
        "class": "h1",
        "sources": [0]
      },

      {
        "order": 2,
        "content": "Les Îles du Destin",
        "class": "h2",
        "sources": [0]
      },

      {
        "order": 3,
        "content": "Rencontre avec un inconnu",
        "class": "h3",
        "sources": [0]
      },
      {
        "order": 4,
        "content": "Ceci est l'histoire de Sora",
        "class": "body",
        "sources": [1, 2, 5],
        "alternative": {
          "content": "Ceci est l'histoire d'un garçon armé d'une clé géante",
          "source": [4, 6]
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
