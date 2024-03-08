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
  input
} from "@angular/core";
import { FlipCardService } from "./flip-card.service";

@Component({
  selector: "to-flip-card",
  standalone: true,
  templateUrl: "./flip-card.component.html",
  styleUrls: ["./flip-card.component.scss"],
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
  width = input<number>();
  height = input<number>();

  @Output() flip: EventEmitter<void> = new EventEmitter();

  public readonly isFlipped: Signal<boolean>;
  constructor() {
    this.isFlipped = inject(FlipCardService).getFipState();
  }

  public onClick() {
    this.flip.emit();
  }

  handleKeyUp(event: KeyboardEvent): KeyboardEvent {
    return event
  }
}
