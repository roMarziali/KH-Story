import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateSettings'
})
export class TranslateSettingsPipe implements PipeTransform {

  private translatedSettings: { [key: string]: string } = {
    annotations: "Annotations",
    references: "Liens wiki",
    Yes: "Oui",
    No: "Non",
  }

  transform(value: string): string {
    return this.translatedSettings[value] || value;
  }

}
