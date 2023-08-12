import { Component } from '@angular/core';
import { ContentParametersService } from 'src/app/services/content-parameters.service';
@Component({
  selector: 'app-content-filters',
  templateUrl: './content-filters.component.html',
  styleUrls: ['./content-filters.component.scss']
})
export class ContentFiltersComponent {

  constructor(public contentParametersService: ContentParametersService) { }


}
