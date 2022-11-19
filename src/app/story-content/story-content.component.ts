import { Component } from '@angular/core';

@Component({
  selector: 'app-story-content',
  templateUrl: './story-content.component.html',
  styleUrls: ['./story-content.component.scss']
})
export class StoryContentComponent {

  storyContent: object = {};

  constructor() {
    this.storyContent = this.getContent()
  }

  getContent(): object {
    return {
      "insertAnIdToken": {
        "order": 4,
        "content": "Ceci est l'histoire de Sora",
        "type": "text",
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
      },

      "insertAnIdToken2": {
        "order": 1,
        "content": "Ère des Contes de Fées",
        "type": "titre1",
        "sources": [0]
      },

      "insertAnIdToken3": {
        "order": 2,
        "content": "Les Îles du Destin",
        "type": "titre2",
        "sources": [0]
      },

      "insertAnIdToken4": {
        "order": 3,
        "content": "Rencontre avec un inconnu",
        "type": "titre2",
        "sources": [0]
      }
    }

  }
}
