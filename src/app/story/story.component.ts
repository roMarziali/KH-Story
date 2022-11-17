import { Component } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  private _games = [
    "Kingdom Hearts",
    "Kingdom Hearts: Chain of Memories",
    "Kingdom Hearts II",
    "Kingdom Hearts Coded",
    "Kingdom Hearts 358/2 Days",
    "Kingdom Hearts Birth By Sleep Final Mix",
    "Kingdom Hearts 3D: Dream Drop Distance",
    "Kingdom Hearts 0.2 Birth by Sleep -A fragmentary passage",
    "Kingdom Hearts χ Back Cover",
    "Kingdom Hearts χ/Union χ/Unchained χ",
    "Kingdom Hearts III",
    "Kingdom Hearts Dark Road",
    "Kingdom Hearts Melody of Memory",
  ]

  public get games() {
    return this._games
  }

}
