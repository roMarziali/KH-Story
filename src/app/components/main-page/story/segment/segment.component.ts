import { Component, Input } from '@angular/core';
import { Segment } from 'src/app/models/segment';
import { SettingsService } from 'src/app/services/settings.service';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss']
})
export class SegmentComponent {

  @Input() segment: Segment = {
    id: 0,
    type: '',
    order: null,
    texts: {}
  };

  text: string = '';
  private apiImage: string = environment.apiImage;


  constructor(private settingsService: SettingsService, private cdr: ChangeDetectorRef) {
    this.settingsService.filtersChange.subscribe(() => {
      this.setText();
    });
  }

  ngOnInit() {
    this.setText();
  }

  ngOnDestroy() {
    this.settingsService.filtersChange.unsubscribe();
  }

  setText() {
    const texts = this.segment.texts;
    for (const key in texts) {
      const text = texts[key].text;
      const relatedTo = texts[key].relatedTo;
      if (relatedTo.length === 0) continue;
      if (this.settingsService.isAtLeastOneFilterSelected(relatedTo)) {
        this.text = text;
        return;
      }
    }
    this.text = "";
  }

  get relatedImageSource(): string {
    if (!this.segment.image) return "";
    return `${this.apiImage}/${this.segment.image.game}/${this.segment.image.name}`;
  }

}
