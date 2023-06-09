import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'to-vacation-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './vacation-item-button.component.html',
  styleUrls: ['./vacation-item-button.component.scss'],
  animations: [
    trigger('iconAnimation', [
      state('default', style({
        transform: 'scale(1)',
        color: '#9E9E9E'
      })),
      state('selectedChanged', style({
        transform: 'scale(1.2)',
        color: '#fb3958'
      })),
      state('selected', style({
        transform: 'scale(1)',
        color: '#fb3958'
      })),
      transition('default <=> selectedChanged', animate('0.2s ease')),
      transition('selected <=> selectedChanged', animate('0.2s ease'))
    ])
  ],
})
export class VacationItemButtonComponent {

  @Input() selected!: string | null

  @Output() changed: EventEmitter<string> = new EventEmitter();


  public onClick() {
    this.changed.emit(this.selected as string)
  }
}
