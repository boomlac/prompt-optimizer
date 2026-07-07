// chrome-messaging.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChromeMessagingService {
  analysis$ = new Subject<any>();

  constructor() {
    if (typeof chrome !== 'undefined' && chrome?.runtime?.onMessage) {
      chrome.runtime.onMessage.addListener((msg: any) => {
        if (msg.type === 'PROMPT_ANALYSIS') {
          this.analysis$.next(msg.payload);
        }
      });
    }
  }
}
