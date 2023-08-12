import { Component } from '@angular/core';

@Component({
  selector: 'app-user-content-manager',
  templateUrl: './user-content-manager.component.html',
  styleUrls: ['./user-content-manager.component.scss']
})
export class UserContentManagerComponent {
  displayedCards = {
    filters: false,
    settings: false,
    visibility: false
  }

  toggleDisplayedCard(cardName: 'filters' | 'settings' | 'visibility') {
    this.displayedCards[cardName] = !this.displayedCards[cardName];
  }
}
