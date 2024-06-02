const { test, describe, expect } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:8080')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('can navigate from main page to Ivysaur', async ({ page }) => {
    await page.goto('http://localhost:8080')
    await Promise.all([
      page.waitForResponse('**/*'),
      page.click('text=ivysaur')
    ])
    await page.waitForLoadState('networkidle')
    const content = await page.textContent('body')
    expect(content).toContain('chlorophyll')
  })
})
