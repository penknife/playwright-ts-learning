import { Page } from "@playwright/test";
import HeaderNavigationMenu from "./header-navigation-menu";

export default abstract class BasePage {
//   abstract navigateTo(url: string): Promise<void>;
//   abstract getTitle(): Promise<string>;
protected page: Page;
headerNavigationMenu: HeaderNavigationMenu;

constructor(page: Page) {
  this.page = page;
  this.headerNavigationMenu = new HeaderNavigationMenu(page);
}

}