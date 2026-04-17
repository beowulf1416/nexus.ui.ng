import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  
  public readonly show_apps = signal(false);

  constructor() {}

  toggle_apps() {
    const current_value = this.show_apps();
    this.show_apps.set(!current_value);
  }
}
