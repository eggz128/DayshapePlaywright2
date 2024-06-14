import { test, expect } from '@playwright/test';
import { smoothDrag } from './helperfunctions/helperlib'

test.beforeEach(async ({page})=>{
  //await page.goto('/') //go to baseUrl set in config file
  console.log('Runs before each test')
})
test.afterEach(async ({page})=>{
  console.log('Runs after each test')
})
test.beforeAll(async ({page})=>{
  console.log('Runs once at start of test file')
  
})
test.afterAll(async ({page})=>{
  console.log('Runs once after all tests in file have completed')
})

//Created via VSCode recording tool
test.describe('A suite', () => {

  test.skip('firsttest', async ({ page }) => {
    //page.setDefaultTimeout(5000)
    await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
    await page.pause()
    await page.getByText('Dismiss').click()
    await page.getByRole('searchbox', { name: 'Search for:' }).click();
    await page.getByLabel('Search for:').nth(0).fill('cap'); //Clears and enters text - doesnt simulate keypresses
    //await page.getByLabel('Search for:').nth(0).clear(); //Clears but doesn't simulate keypresses to perform the action. You could simulate a real user...
    await page.getByLabel('Search for:').nth(0).press('Control+a') //...like this
    await page.getByLabel('Search for:').nth(0).press('Backspace')
    await page.getByLabel('Search for:').nth(0).pressSequentially('capbelt', { delay: 500 }) //Simulates actual keypresses, and you can slow the text entry
    await page.getByRole('searchbox', { name: 'Search for:' }).press('Enter');
    await page.getByRole('button', { name: 'Add to cart' }).click();

    //cy.get('#content).content('a','View cart ').click() //Cypress Equiv
    //await driver.findElement(By.cssSelectior, '#content').findElement(By.linkText, 'View cart').click() //WebDriverJS equic
    //<browser>....<find something on the page>...<do something with it> (including chaining other queries)

    await page.locator('#content').getByRole('link', { name: 'View cart', /*exact: true,*/ }).click({ timeout: 4000 });

    //Old way of clicking an element located via css selector. Still works, but prefer the above style.
    //await page.click('#content')


    await page.getByLabel('Remove this item').click();
    await page.getByRole('link', { name: 'Return to shop' }).click();
    //await page.locator('#menu-item-42').getByRole('link', { name: 'Home' }).click();
    await page.locator('#menu-item-42 >> a:text("Home")').click();
    //assertion - notice the text of h1 is not captured first thenasserted on. Instead the locator is passed to expect. This allows the assertion to retry if the element is not found.
    await expect(page.locator('h1')).toContainText('Welcome');

  });
  test.describe('An inner suite', () => {
    test('filtering', async ({ page }) => {
      await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html')
      const rows = page.locator('tr')
      await rows.filter({ hasText: 'Text' })//Filter down to rows that contain the text "Text"
        .filter({ has: page.locator('textarea') }) //Further filter to row that contains textarea element -- **fix me** this example doesnt work yet
        .fill("Found text area")

    })

    test('all products', {tag: ['@smoke','@regression'], annotation: [
      {type: "some custom category" , description: "Some custom description"}
    ]}, async ({ page }) => {
      await page.goto('https://www.edgewordstraining.co.uk/demo-site/');
      const newProducts = await page.getByLabel('Recent Products');
      for (const prod of await newProducts.locator('h2:not(.section-title)').all()) { //gathers a collection of all() matching elements
        console.log(await prod.textContent()); //then loops over each individual match logging the text
      };

    });
  })

})


test('drag drop slider', async ({ page }) => {
  await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/cssXPath.html')

  await page.locator('#apple').scrollIntoViewIfNeeded();
  //Dragging 'outside' of an element normally fails due to 'actionability' checks. force:true tells Playwright just to do the action skipping any checks.
  //await page.dragAndDrop('#slider a', '#slider a', {targetPosition: {x: 100, y:0}, force: true}) //While this moves the gripper it wont change the size of the apple - this is due to the JS on the page that does the resizing not firing properly for large movements

  //So instead do lots of little jumps. Just make sure that you 'jump' far enough to get 'outside' the gripper each time
  // await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })
  // await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })
  // await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })
  // await page.dragAndDrop('#slider a', '#slider a', { targetPosition: { x: 20, y: 0 }, force: true })

  //You should be able to hover over an element in a specific position
  //Remeember that we (users) dont normally** 'warp' the mouse to a particular location, but instead gradually move to the target
  //You may need to simulate that with a series of smaller hovers converging on the target
  //await page.locator('canvas').hover({position: {x:100, y:100}})

  //**normally -- Touch screens can move the pointer instantly to a particular location

  await smoothDrag(page, '#slider a', 100, 5)

})

//Comment to test CI