import { expect, Locator, Page } from "@playwright/test";

export default class HeaderNavigationMenu {
  constructor(private page: Page) {}

async selectProgrammingLanguage(language: string): Promise<void> {
  const languageDropdownMenu = this.page.locator('div.dropdown--hoverable');
  await languageDropdownMenu.hover();

  const languageOption = this.page.getByRole('link', { name: language });
  await languageOption.click();
}

async getSelectedLanguage(): Promise<string> {
  const selectedLanguageButton = this.page.locator('div.dropdown--hoverable');
  const text = await selectedLanguageButton.textContent();
  return text ?? "";
}

async verifyLanguageOptionSelected(language: string): Promise<void> {
  const dotnetDropdown = this.page.getByRole('button', { name: language});
  await expect(dotnetDropdown).toBeVisible();
}

async getLanguageOptionsLocator(language: string): Promise<Locator> {
  return this.page.getByRole('button', { name: language});
}

}
