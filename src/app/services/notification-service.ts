import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  info(
    msg: string,
    el: null | string
  ) {
    console.info('//todo info()');
  }

  warn(
    msg: string,
    el: null | string
  ) {
    console.info('//todo warn');
  }

  error(
    msg: string,
    el: null | string
  ) {
    console.info('//todo error()');
  }
}
