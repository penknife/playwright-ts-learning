import WelcomePage from "../pages/welcome-page";
import { test as base } from '@playwright/test';

type TestFixtures = {
  welcomePage: WelcomePage;
};

export const test = base.extend<TestFixtures>({
  welcomePage: async ({ page }, use) => {
    const welcomeP = new WelcomePage(page);
    await use(welcomeP);   // передаємо в тест
  }
});
export { expect } from '@playwright/test';