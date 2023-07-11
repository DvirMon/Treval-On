import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationListComponent } from 'src/app/vacation/vacation-list/vacation-list.component';



@Component({
  selector: 'to-home',
  standalone: true,
  imports: [CommonModule, VacationListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Input() userId! : string

}
