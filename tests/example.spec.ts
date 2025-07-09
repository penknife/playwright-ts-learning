import { test, expect } from '@playwright/test';

test('Playwright site has title', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});

test('Playwright site has a visible and working Get Started button', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const getStarted = page.getByRole('link', { name: 'Get started' });
  await expect(getStarted).toBeVisible();
  await getStarted.click();
  await expect(page).toHaveURL(/.*docs\/intro/);
});

test('Playwright Get Started page: switch from Node.js to .NET in header language dropdown', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.getByRole('link', { name: 'Get started' }).click();

  // The language dropdown should show Node.js by default
  const languageDropdown = page.getByRole('button', { name: /Node\.js/ });
  await expect(languageDropdown).toBeVisible();
  await languageDropdown.click();

  // Select the .NET option
  const dotnetOption = page.getByRole('link', { name: '.NET' });
  await dotnetOption.click();

  // Check that .NET is now selected (the dropdown button should show .NET)
  const dotnetDropdown = page.getByRole('button', { name: /.NET/ });
  await expect(dotnetDropdown).toBeVisible();
});

test('Playwright Getting Started: select .NET and navigate to Writing tests', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.getByRole('link', { name: 'Get started' }).click();

  // Switch to .NET in the language dropdown
  const languageDropdown = page.getByRole('button', { name: /Node\.js/ });
  await expect(languageDropdown).toBeVisible();
  await languageDropdown.click();

  const dotnetOption = page.getByRole('link', { name: '.NET' });
  await dotnetOption.click();

  // Verify .NET is selected
  const dotnetDropdown = page.getByRole('button', { name: /.NET/ });

  // Navigate to Writing Tests section
  await page.getByRole('link', { name: 'Writing tests', exact: true }).click();

  // Verify we're on the Writing tests page and it's showing .NET content
  await expect(page).toHaveURL(/.*docs\/writing-tests/);
  // Verify we're in the .NET docs
  await expect(page.locator('h1')).toHaveText('Writing tests');
  await expect(page.getByRole('navigation', { name: 'Main' })).toContainText('Playwright for .NET');
});



