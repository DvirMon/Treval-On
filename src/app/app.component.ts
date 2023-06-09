import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VacationItemComponent } from './components/vacation-item/vacation-item.component';

@Component({
  selector: 'to-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, VacationItemComponent]
})
export class AppComponent {
  title = 'travel-on';


}
