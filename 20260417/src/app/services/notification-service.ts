import { Injectable, signal } from '@angular/core';





export class Note {
  
  constructor(
    readonly message: string,
    readonly type: 'info' | 'warn' | 'error'
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public readonly notifications = signal<Array<Note>>([]);
  public readonly show_notes = signal(false);

  private _notes: Array<Note> = new Array<Note>();

  constructor() {}

  get notes() {
    return this._notes;
  }

  info(
    msg: string,
    component: any | null
  ) {
    console.info('//todo info()');
    const n = new Note(msg, 'info');
    this.notifications.set([...this.notifications(), n]);
  }

  warn(
    msg: string,
    component: any | null
  ) {
    console.info('//todo warn');
    const n = new Note(msg, 'warn');
    this.notifications.set([...this.notifications(), n]);
  }

  error(
    msg: string,
    component?: any | null
  ) {
    console.info('//todo error()');

    console.debug(component);
    if (component !== null && component.error) {
      component.error = msg;
    }
    const n = new Note(msg, 'error');
    this.notifications.set([...this.notifications(), n])
  }

  toggle() {
    console.info('//todo open()');
    const current_value = this.show_notes();
    this.show_notes.set(!current_value);
  }
}
