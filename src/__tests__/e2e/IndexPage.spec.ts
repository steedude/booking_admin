import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Nothing', async () => {
  await expect(true).toBe(true);
});
