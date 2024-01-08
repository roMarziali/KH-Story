import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {

  @Input() iconeName!: string;
  @Input() height!: number;
  @Input() alt!: string;

  get source(): string {
    return '../../../../assets/icons/' + this.iconeName;
  }

}
