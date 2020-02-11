import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { themes } from './themes';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme: string;
  themes: Array<string>;

  constructor(
    private overlayContainer: OverlayContainer,
    private storageService: StorageService
  ) {
    const themeLoad = this.storageService.load('individual-trello-theme', false);
    this.themes = themes;
    if (this.themes.find(theme => theme === themeLoad)) {
      this.changeTheme(themeLoad);
    } else {
      this.changeTheme(this.themes[0]);
    }
  }

  changeTheme(theme) {
    this.theme = theme;
    this.themes.forEach(t => this.overlayContainer.getContainerElement().classList.remove(t) );
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.storageService.save('individual-trello-theme', theme, false);
  }
}
