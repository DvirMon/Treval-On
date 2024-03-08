import { Injectable, Signal, WritableSignal, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FlipContainerService {
  private _isFlipped: WritableSignal<boolean> = signal(false);

  public flip(): void {
    this._isFlipped.update((value: boolean) => !value);
  }

  public getFlipState(): Signal<boolean> {
    return this._isFlipped;
  }
}
