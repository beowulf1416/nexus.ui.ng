import { Injectable, signal } from '@angular/core';





export class Note {
  
  constructor(
    readonly message: string,
    readonly type: 'info' | 'warn' | 'error',
    readonly el: null | string = null
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {



  // notifications = new Array<{
  //   message: string,
  //   type: string,
  //   el: null | string
  // }>();

  public readonly notifications = signal(new Array<Note>());
  public readonly show_notes = signal(false);


  constructor() {}


  info(
    msg: string,
    el: null | HTMLElement
  ) {
    console.info('//todo info()');
  }

  warn(
    msg: string,
    el: null | HTMLElement
  ) {
    console.info('//todo warn');
  }

  error(
    msg: string,
    el: null | HTMLElement
  ) {
    console.info('//todo error()');
  }

  toggle() {
    console.info('//todo open()');
    const current_value = this.show_notes();
    this.show_notes.set(!current_value);
  }
}
