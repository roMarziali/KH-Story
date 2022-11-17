import { Component, OnInit } from '@angular/core';

interface Skill {
  name: string;
  selected: boolean;
  disabled: boolean;
  subskills?: Skill[];
}

/** @title Checkboxes with reactive forms */
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  title = 'angular-material-checkbox-list';

  allChecked: boolean = false;

  skill: Skill = {
    name: 'All Skills',
    selected: false,
    disabled: false,
    subskills: [
      { name: 'HTML', selected: false, disabled: false },
      { name: 'CSS', selected: true, disabled: false },
      { name: 'JavaScript', selected: false, disabled: false }
    ]
  };

  // Return true if selected items are less then total(allChecked) but more then 0
  isFewSelected(): boolean {
    return (this.skill.subskills ? this.skill.subskills.filter(t => t.selected).length > 0 && !this.allChecked : false);
  }

  // Update Master and list checkboxes
  setAll(selected: boolean) {
    this.allChecked = selected;
    if (this.skill.subskills == null) {
      return;
    }
    this.skill.subskills.forEach(t => t.selected = selected);
  }

  // Check master checkbox if all items selected
  updateAllComplete() {
    console.log(this.skill.subskills);
    this.allChecked = this.skill.subskills != null && this.skill.subskills.every(t => t.selected);
  }
}


