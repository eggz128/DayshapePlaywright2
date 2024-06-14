import {test, expect} from '@playwright/test'

test("compare runtime images", async ({page, browserName}, testInfo)=>{
    await page.goto("https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html");

    await page.locator('#textInput').fill("Hello World"); //Set intial state
    
    //ToDo: capture screenshot of text box in memory
    //Capture in mem is easy - doing the expect on it after, not so much as PlayWright expect .toMatchSnapshot() expects the screenshot to be on disk
    
    //const originalimage = await page.locator('#textInput').screenshot();
    //originalimage is now a buffer object with the screenshot. You could use a 3rd party js lib to do the comparison... but if we're sticking to Playwright only...

    //await expect(page.locator('#textInput')).toHaveScreenshot('textbox')
    //No good as PW wants to capture the screenshot on the first run and use that screenshot for following runs. We want to capture and use on this run. So...

    await page.locator('#textInput').screenshot({path: `${testInfo.snapshotDir}/textbox-${browserName}-${testInfo.snapshotSuffix}.png`})
    //screenshots will need to vary by browser and OS, and be saved in to the test snapshot directory for .toMatchSnapshot() to find them
    
    
    //Change element text
    await page.locator('#textInput').fill("Hello world"); //Alter the state (right now this is the same as initially set so following expect *should* pass)
                                                            //change to e.g. "Hello world"

    //Recapture screenshot, compare to previous (on disk) version.
    expect(await page.locator('#textInput').screenshot()).toMatchSnapshot('textbox.png')

    //Now go look at the html report
});