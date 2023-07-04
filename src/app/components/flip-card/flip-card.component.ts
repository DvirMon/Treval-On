import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FlipCardService } from './flip-card.service';

@Component({
  selector: 'to-flip-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
  animations: [
    trigger('flip', [
      state('front', style({
        transform: 'rotateY(0deg)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front <=> back', [
        animate('0.5s')
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FlipCardService]

})
export class FlipCardComponent {

  // @Input({ required: true }) isFlipped: boolean = false
  @Input() width!: number
  @Input() height!: number

  @Output() flip: EventEmitter<void> = new EventEmitter();

  protected readonly isFlipped: Signal<boolean>
  constructor(
  ) {

    this.isFlipped = inject(FlipCardService).getFipState()
  }

  protected onCardClick() {
    this.flip.emit()
  }
}
