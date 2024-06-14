import { test, expect } from '@playwright/test';

test('First test', async ({ page })=> {
    //cy.visit('https://www.google.com')
    await page.goto('https://www.google.com');
    //cy.contains('Login).click()
    //Like cypress commands generally follow the form ..tool/browser...find something in page...do something with it
    await page.getByText('Login').click();
    //await page.close() //Don't generally need to close the page/browser as Playwright will safely reuse an existing browser with a new context (so no cross talk between tests)
    
});

