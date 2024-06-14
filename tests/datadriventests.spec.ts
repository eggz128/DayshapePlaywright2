import { expect } from '@playwright/test'
import data from './test-data/credentials.json'

import HomePOM from './POMClasses/homepagepom';
import LoginPOM from './POMClasses/loginpagepom';

import { test } from './my-test'

for(let credentials of data){
    test(`data driven using ${credentials.username}`, async({page})=>{
        await page.goto('https://www.edgewordstraining.co.uk/webdriver2');
      
        //We should be on Home page so init the HomePOM
      
        const HomePage = new HomePOM(page);
        await HomePage.goLogin();
        const LoginPage = new LoginPOM(page);
        await LoginPage.loginWithValidUsernamePassword(credentials.username, credentials.password);
        
        await expect(page.locator('h1')).toHaveText('Add A Record To the Database')
    });
}

test(`data driven using environment variables`, async({page})=>{
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
  
    //We should be on Home page so init the HomePOM
  
    const HomePage = new HomePOM(page);
    await HomePage.goLogin();
    const LoginPage = new LoginPOM(page);
    await LoginPage.loginWithValidUsernamePassword(process.env.USERNAME ?? "", process.env.PASSWORD ?? "");
    
    await expect(page.locator('h1')).toHaveText('Add A Record To the Database')
});

test(`data driven using project options`, async({page, person})=>{
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/');
  
    //We should be on Home page so init the HomePOM
  
    const HomePage = new HomePOM(page);
    await HomePage.goLogin();
    const LoginPage = new LoginPOM(page);
    await LoginPage.loginWithValidUsernamePassword(person, "edgewords123");
    
    //await expect(page.locator('h1')).toHaveText('Add A Record To the Database')
});