async function smoothDrag(page, locator: string,  dragDistance: number, smoothSteps: number){

    let indStepDistance = dragDistance/smoothSteps;
    let stepsPerformed = 0;
    while(stepsPerformed < smoothSteps){
      await page.dragAndDrop(locator, locator, { targetPosition: { x: indStepDistance, y: 0 }, force: true })
      stepsPerformed++
    }
}

export { smoothDrag } 

