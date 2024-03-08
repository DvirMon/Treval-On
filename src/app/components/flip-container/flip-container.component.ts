import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Signal,
  inject,
  input,
} from "@angular/core";
import { FlipContainerService } from "./flip-container.service";

@Component({
  selector: "to-flip-container",
  standalone: true,
  templateUrl: "./flip-container.component.html",
  styleUrls: ["./flip-container.component.scss"],
  animations: [
    trigger("flip", [
      state(
        "front",
        style({
          transform: "rotateY(0deg)",
        })
      ),
      state(
        "back",
        style({
          transform: "rotateY(180deg)",
        })
      ),
      transition("front <=> back", [animate("0.5s")]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipCardComponent {
  @Output() flip: EventEmitter<void> = new EventEmitter();

  public readonly isFlipped: Signal<boolean>;
  constructor() {
    this.isFlipped = inject(FlipContainerService).getFlipState();
  }

  public onClick() {
    this.flip.emit();
  }

  handleKeyUp(event: KeyboardEvent): KeyboardEvent {
    return event;
  }
}
