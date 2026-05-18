import { test, expect } from '@playwright/test';

test.describe('Formulaire Newsletter', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroller jusqu'à la section newsletter
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
    await page.waitForTimeout(500);
  });

  // ── TEST 1 : Inscription réussie ───────────────────────────
  test('inscription réussie affiche le message de confirmation', async ({ page }) => {
    await page.route('/api/newsletter', async route => {
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    await page.fill('input[type="email"]', 'test@mood2fit.app');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Tu es dans la boucle.')).toBeVisible({ timeout: 5000 });
  });

  // ── TEST 2 : Email invalide ────────────────────────────────
  test('email invalide affiche une erreur', async ({ page }) => {
    await page.fill('input[type="email"]', 'email-invalide');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Email invalide')).toBeVisible();
  });

  // ── TEST 3 : Email déjà inscrit (409) ──────────────────────
  test('email déjà inscrit affiche le bon message', async ({ page }) => {
    await page.route('/api/newsletter', async route => {
      await route.fulfill({ status: 409, body: JSON.stringify({ error: 'Déjà inscrit' }) });
    });

    await page.fill('input[type="email"]', 'deja@inscrit.app');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Déjà dans la boucle !')).toBeVisible({ timeout: 5000 });
  });

  // ── TEST 4 : Rate limit (429) ──────────────────────────────
  test('rate limit affiche un message visible', async ({ page }) => {
    await page.route('/api/newsletter', async route => {
      await route.fulfill({ status: 429, body: JSON.stringify({ error: 'Trop de tentatives' }) });
    });

    await page.fill('input[type="email"]', 'test@mood2fit.app');
    await page.click('button[type="submit"]');

    await expect(page.getByText(/Trop de tentatives/)).toBeVisible({ timeout: 5000 });
  });

  // ── TEST 5 : Erreur réseau ─────────────────────────────────
  test('erreur réseau affiche un message visible', async ({ page }) => {
    await page.route('/api/newsletter', async route => {
      await route.abort('failed');
    });

    await page.fill('input[type="email"]', 'test@mood2fit.app');
    await page.click('button[type="submit"]');

    await expect(page.getByText(/Impossible d'envoyer/)).toBeVisible({ timeout: 5000 });
  });

  // ── TEST 6 : Champ vide bloqué par validation ──────────────
  test('champ email vide ne soumet pas', async ({ page }) => {
    let apiCalled = false;
    await page.route('/api/newsletter', async route => {
      apiCalled = true;
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    // L'API ne doit pas avoir été appelée
    expect(apiCalled).toBe(false);
  });

});