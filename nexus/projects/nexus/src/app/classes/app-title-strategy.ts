import { Injectable } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title)

  override updateTitle(state: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(state) || this.title.getTitle();
    this.title.setTitle(`Nexus | ${pageTitle}`);
  }
}
