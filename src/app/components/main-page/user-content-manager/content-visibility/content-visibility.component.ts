import { Component } from '@angular/core';
import { ContentParametersService } from 'src/app/services/content-parameters.service';
@Component({
  selector: 'app-content-visibility',
  templateUrl: './content-visibility.component.html',
  styleUrls: ['./content-visibility.component.scss']
})
export class ContentVisibilityComponent {

  constructor(public contentParametersService: ContentParametersService) { }

}
