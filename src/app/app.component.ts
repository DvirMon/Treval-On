import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'to-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet,],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {
  title = 'travel-on';


}
