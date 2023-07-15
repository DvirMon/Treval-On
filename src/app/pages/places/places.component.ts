import { Component, Input, OnDestroy, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionListChange, VacationListComponent } from 'src/app/vacation/vacation-list/vacation-list.component';
import { StoreService } from 'src/app/store/store.service';
import { Vacation } from 'src/app/store/vacations/vacation.model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'to-places',
  standalone: true,
  imports: [CommonModule, VacationListComponent],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, OnDestroy {

  @Input() userId!: string

  // private readonly storeService: StoreService = inject(StoreService);

  protected readonly vacations: Signal<Vacation[]>;

  protected  readonly selection: WritableSignal<Record<string, boolean>> = signal({});
  protected  selection$!: Observable<Record<string, boolean>>;

  constructor(
    private storeService : StoreService
  ) {
    this.vacations = this.storeService.getVacations();
  }

  ngOnInit(): void {
    this.selection$ = this.storeService.getSelectedFavorites(this.userId).pipe(
      tap((selection : Record<string, boolean>) => this.selection.set(selection))
    )
  }


  ngOnDestroy(): void {
    this.storeService.updateFavorites()

  }

  onSelectionChanged(event: SelectionListChange) {
    const { selection } = event;
    this.storeService.updateSelection(selection)
  }



}
