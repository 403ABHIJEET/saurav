import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.abdn.ac.uk/registry/courses/');
  try {
    await page.getByRole('button', { name: 'End tour' }).click({ timeout: 2000 });
  } catch (e) { }

  const viewDegrees = page.locator('[title^="View"]');
  const count1 = await viewDegrees.count();

  for (let i = 0; i < count1 - 1; i++) {
    const degreeLink = page.locator('[title^="View"]').nth(i);
    await degreeLink.click();
    await page.waitForLoadState('networkidle');

    const viewSpecializations = page.locator('a.btn-action', { hasText: 'View' });
    const count2 = await viewSpecializations.count();
    console.log(`Specializations found: ${count2}`);

    for (let j = 0; j < count2; j++) {
      const specializationLink = page.locator('a.btn-action', { hasText: 'View' }).nth(j);
      await specializationLink.click();
      await page.waitForLoadState('networkidle');
      try {
        await page.getByRole('button', { name: 'End tour' }).click({ timeout: 2000 });
      } catch (e) { }
      const viewCourses = page.locator('a.more-info', { hasText: 'More' });
      const count3 = await viewCourses.count();
      console.log(`Courses found: ${count3}`);

      for (let k = 0; k < count3; k++) {
        const courseLink = page.locator('a.more-info', { hasText: 'More' }).nth(k);
        await courseLink.click();
        await page.waitForLoadState('networkidle');
        try {
          await page.getByRole('button', { name: 'End tour' }).click({ timeout: 2000 });
        } catch (e) { }
        await page.waitForTimeout(1000);
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }

      await page.goBack();
      await page.waitForLoadState('networkidle');
    }

    await page.goBack();
    await page.waitForLoadState('networkidle');
  }

});