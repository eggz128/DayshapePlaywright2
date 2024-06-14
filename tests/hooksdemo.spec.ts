import { test, expect } from '@playwright/test';
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

test.describe('Suite', ()=>{
    test('Test one', async ({page})=>{
        await page.goto('https://www.google.com')
    })
    
    test('Test two', async ({page})=>{
        await page.goto('https://www.bing.com')
    })
})

