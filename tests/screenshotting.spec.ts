import { test, expect } from '@playwright/test'

test('Screenshot demos', async ({ page, browserName}, testInfo) => {
    await page.goto('https://www.edgewordstraining.co.uk/webdriver2/docs/basicHtml.html')
    await page.screenshot({ path: './manualscreenshots/page-screenshot.png' });
    await page.screenshot({ path: './manualscreenshots/whole-page-screenshot.png', fullPage: true });
    await page.locator('#htmlTable').screenshot({
        path: './manualscreenshots/htmltable.png',
        mask: [page.locator('#TableVal2')],
        maskColor: 'rgba(214, 21, 179,0.5)',
        style: `#htmlTable tr:nth-child(3) {border: 10px solid red}
            table#htmlTable {border-collapse: collapse}
    ` //HTML table rows cannot have a border unless the table's border collapse model is set to collapse
    })
    if(browserName==='chromium' ){
        await page.pdf({path: './manualscreenshots/printed.pdf'})
      }

      console.log("This should be captured automatically in to the report")

      await testInfo.attach('Masked Screenshot', {path:'./manualscreenshots/htmltable.png'})
      await testInfo.attach('Some attached text', {body: 'Some text', contentType: 'text/plain'})
      let screenshot = await page.screenshot()
      await testInfo.attach('No file screenshot', {body: screenshot, contentType: 'image/png'})
})