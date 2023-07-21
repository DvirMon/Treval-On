import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlipCardService {

  private _isFlipped: WritableSignal<boolean> = signal(true);

  public flip(): void {
    this._isFlipped.update((value: boolean) => !value);
  }

  public getFipState(): Signal<boolean> {
    return this._isFlipped;
  }

}
