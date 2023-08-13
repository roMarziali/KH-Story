import { Component } from '@angular/core';
import { ContentParametersService } from 'src/app/services/content-parameters.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

constructor(public contentParametersService: ContentParametersService) { }

}
