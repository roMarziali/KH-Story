import { Component } from '@angular/core';
import { ContentParametersService } from 'src/app/services/content-parameters.service';

@Component({
  selector: 'app-user-content-manager',
  templateUrl: './user-content-manager.component.html',
  styleUrls: ['./user-content-manager.component.scss']
})
export class UserContentManagerComponent {

  constructor(public contentParametersService: ContentParametersService) { }

}
