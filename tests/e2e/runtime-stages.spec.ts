import { expect, test, type Page } from '@playwright/test';

async function selectStage(page: Page, stageTitle: string) {
  await page.getByRole('button', { name: new RegExp(stageTitle, 'i') }).click();
  await expect(page.getByRole('heading', { name: new RegExp(stageTitle, 'i') })).toBeVisible();
}

function collectBrowserErrors(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  return {
    assertClean() {
      expect(pageErrors, 'unexpected uncaught browser page errors').toEqual([]);
      expect(consoleErrors, 'unexpected browser console errors').toEqual([]);
    },
  };
}

test.describe('runtime examples', () => {
  test('stage 06 keeps REPL focus after submitting a command', async ({ page }) => {
    const browserErrors = collectBrowserErrors(page);

    await page.goto('/');
    await selectStage(page, 'REPL console');

    const replInput = page.locator('[data-part="repl-input"]');
    await replInput.fill('status');
    await replInput.press('Enter');

    await expect(page.getByText(/history entries:/i)).toBeVisible();
    await expect(replInput).toBeFocused();
    await expect(replInput).toHaveValue('');
    browserErrors.assertClean();
  });

  test('stage 08 routes VM notify.show intents to the host toast', async ({ page }) => {
    const browserErrors = collectBrowserErrors(page);

    await page.goto('/');
    await selectStage(page, 'VM events and intents');

    await page.getByRole('button', { name: 'Notify host' }).click();
    await expect(page.getByText('Notification dispatched from QuickJS')).toBeVisible();
    browserErrors.assertClean();
  });

  test('stage 09 preserves Kanban theme CSS in the browser bundle', async ({ page }) => {
    const browserErrors = collectBrowserErrors(page);

    await page.goto('/');
    await selectStage(page, 'VM Kanban runtime');
    await expect(page.getByText('VM-authored Kanban')).toBeVisible();
    await expect(page.getByText('Publish VM packages')).toBeVisible();

    const styles = await page.evaluate(() => {
      const kb = document.querySelector('[data-part="kb"]');
      const board = document.querySelector('[data-part="kb-board"]');
      const column = document.querySelector('[data-part="kb-column"]');
      const rules = Array.from(document.styleSheets).flatMap((sheet) => {
        try {
          return Array.from(sheet.cssRules).map((rule) => rule.cssText);
        } catch {
          return [];
        }
      });

      return {
        kbDisplay: kb ? getComputedStyle(kb).display : null,
        boardDisplay: board ? getComputedStyle(board).display : null,
        boardOverflowX: board ? getComputedStyle(board).overflowX : null,
        columnWidth: column ? getComputedStyle(column).width : null,
        hasKanbanCssRule: rules.some((rule) => rule.includes('[data-part="kb-board"]')),
      };
    });

    expect(styles).toMatchObject({
      kbDisplay: 'flex',
      boardDisplay: 'flex',
      boardOverflowX: 'auto',
      hasKanbanCssRule: true,
    });
    expect(styles.columnWidth).toBe('200px');
    browserErrors.assertClean();
  });
});
