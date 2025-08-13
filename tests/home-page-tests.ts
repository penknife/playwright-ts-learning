import test, { expect } from "@playwright/test";
import { get } from "http";


test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev');
});

test('Playwright site has title', async ({ page }) => {
  await expect(page, 'Playwright site does not have the expected title').toHaveTitle(/Playwright/);
});

test('Playwright site has a visible and working Get Started button', async ({ page }) => {
  const getStarted = page.getByRole('link', { name: 'Get started' });
  await getStarted.click();
  await expect(page, 'Get started page is not opened after click on get Started button').toHaveURL(/.*docs\/intro/);
});

test('Playwright Get Started page: switch from Node.js to .NET in header language dropdown', async ({ page }) => {
  await page.getByRole('link', { name: 'Get started' }).click();

  // The language dropdown should show Node.js by default
  const languageDropdown = page.getByRole('button', { name: /Node\.js/ });
  await languageDropdown.click();

  // Select the .NET option
  const dotnetOption = page.getByRole('link', { name: '.NET' });
  await dotnetOption.click();

  // Check that .NET is now selected (the dropdown button should show .NET)
  const dotnetDropdown = page.getByRole('button', { name: /.NET/ });
  await expect(dotnetDropdown).toBeVisible();
});

test('Playwright Getting Started: select .NET and navigate to Writing tests', async ({ page }) => {
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

test('I want to be sure that Getting Started menu is working correctly', async ({ page }) => {
  // test data 
  const expectedMenuItems = [
    'Installation',
    'Writing tests',
    'Generating tests',
    'Running and debugging tests',
    'Trace viewer',
    'Setting up CI'
  ];
  // preconditions
  await page.getByRole('link', { name: 'Get started' }).click();
  
  const getStartedMenu = page.locator('li', { hasText: 'Getting Started' }).first();
  for (const item of expectedMenuItems) {
    const menuItem = getStartedMenu.locator('li', { hasText: item });
    await menuItem.click();
    const header = page.locator('h1', { hasText: item });
    await expect(header, `Header for ${item} is not visible`).toBeVisible();
  }
});

test('I want to be sure that Getting Started menu is working correctly version 2', async ({ page }) => {
  // test data 
  const expectedMenuItems = [
    'Installation',
    'Writing tests',
    'Generating tests',
    'Running and debugging tests',
    'Trace viewer',
    'Setting up CI'
  ];
  // preconditions
  await page.getByRole('link', { name: 'Get started' }).click();
  
  const getStartedMenu = page.locator('li', { hasText: 'Getting Started' }).first();
  const allMenuItems = await getStartedMenu.locator('li').all();
  for (const itemMenu of allMenuItems) {
    await itemMenu.click();
    const headerName = await page.locator('h1').textContent();
    expect(expectedMenuItems, `Header for ${itemMenu} is not visible`).toContain(headerName);
  }
});

test('I want to be sure that Getting Started menu has correct items', async ({ page }) => {
  // test data 
  const expectedMenuItems = [
    'Installation',
    'Writing tests',
    'Generating tests',
    'Running and debugging tests',
    'Trace viewer',
    'Setting up CI'
  ];
  // preconditions
  await page.getByRole('link', { name: 'Get started' }).click();
  
  const getStartedMenu = page.locator('li', { hasText: 'Getting Started' }).first();
  const allMenuItems = await getStartedMenu.locator('li').all();
  for (const itemMenu of allMenuItems) {
    const itemMenuName = await itemMenu.textContent();
    expect(expectedMenuItems, `Header for ${itemMenu} is not visible`).toContain(itemMenuName);
  }
});