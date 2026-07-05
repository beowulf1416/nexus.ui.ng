import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

if (
  typeof window !== 'undefined' &&
  (window as any).trustedTypes &&
  (window as any).trustedTypes.createPolicy
) {
  (window as any).trustedTypes.createPolicy('angular', {
    createHTML: (html: string) => html,
    createScriptURL: (url: string) => url,
    createScript: (script: string) => script,
    createStyleURL: (url: string) => url,
  });
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
