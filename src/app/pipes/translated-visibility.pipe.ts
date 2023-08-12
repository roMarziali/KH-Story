import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translatedVisibility'
})
export class TranslatedVisibilityPipe implements PipeTransform {

  private translatedSettings: { [key: string]: string } = {
    nightMode: "Mode nuit",
    "font-police": "Police",
    "font-size": "Taille de police",
  }

  transform(value: string): string {
    return this.translatedSettings[value] || value;
  }


}
