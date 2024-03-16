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
} from "@angular/core";
import { FlipContainerService } from "./flip-container.service";

@Component({
  selector: "to-flip-container",
  standalone: true,
  template: `
    <div
      [@flip]="isFlipped() ? 'back' : 'front'"
      (click)="onClick()"
      (keyup)="handleKeyUp($event)"
      tabindex="0">
      <div class="card-inner">
        <div class="card-front">
          <ng-content select=".front"></ng-content>
        </div>
        <div class="card-back">
          <ng-content select=".back"></ng-content>
        </div>
      </div>
    </div>
  `,
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
