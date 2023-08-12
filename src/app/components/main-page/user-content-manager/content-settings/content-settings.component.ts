import { Component } from '@angular/core';
import { ContentParametersService } from 'src/app/services/content-parameters.service';

@Component({
  selector: 'app-content-settings',
  templateUrl: './content-settings.component.html',
  styleUrls: ['./content-settings.component.scss']
})
export class ContentSettingsComponent {

  constructor(public contentParametersService: ContentParametersService) { }

}
