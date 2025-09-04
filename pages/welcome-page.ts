import { Page } from "@playwright/test";
import BasePage from "./base-page";
import DocsPage from "./docs-page";

export default class WelcomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToDocsByGetStartedBtn(): Promise<DocsPage> {
     const getStartedBtn = this.page.getByRole('link', { name: 'Get started' });
     await getStartedBtn.click();
     return new DocsPage(this.page);
  }
}
