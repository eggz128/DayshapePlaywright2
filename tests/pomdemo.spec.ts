import {test, expect}  from '@playwright/test'
import HomePOM from './POMClasses/homepagepom';
import LoginPOM from './POMClasses/loginpagepom';

test('traditional test',async ({page})=>{
    //Mixes element locators, user actions and assertions together
    //Can result in a lot of repeated code across tests
    //When a common locator breaks (or a common series of interactions - like logging in)
    //Then the same fixes must be (re)applied accross all affected tests
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    await page.getByRole('link', { name: 'Login To Restricted Area' }).click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').click();
    await page.getByRole('row', { name: 'User Name?' }).locator('#username').fill('edgewords');
    await page.locator('#password').click();
    await page.locator('#password').fill('edgewords123');
    await page.getByRole('link', { name: 'Submit' }).click();
    await expect(page.locator('h1')).toContainText('Add A Record To the Database');
})

test('pom version', async ({page})=>{
    //In a POM solution, classes are created that model the pages (or sub components) of the web app
    //These hide the exact details of what elements and how they are interacted with from the test
    //but provide an easily readable and reasonable API to perform those actions to the test 
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
    const HomePage = new HomePOM(page)
    await HomePage.goLogin()

    const LoginPage = new LoginPOM(page)
    await LoginPage.loginWithValidUsernamePassword('edgewords','edgewords123')
    //For negative testing (i.e. trying usernames/passwords that should not work) an alternative method like:
    //attemptLoginWithInvalidData() should be provided
    //This makes the test easier to read and understand.

    //Need a new POM for the Add Record Page
    //assertions belong in the test - not in the POM. Tests are for testing ("When I do x, y should happen"). POMs are for the hows of interacting ("This is how x is done")
    //Test should ask the POM to return some value, then assert on that return value
    
})