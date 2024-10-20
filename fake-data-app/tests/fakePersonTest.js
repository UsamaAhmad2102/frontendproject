const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const chromeDriverPath = require('chromedriver').path;

async function testFakePerson() {
    const service = new chrome.ServiceBuilder(chromeDriverPath);
    let driver = await new Builder().forBrowser('chrome').setChromeService(service).build();

    try {
        await driver.get('http://localhost:3000');

        let numberOfPersonsInput = await driver.wait(until.elementLocated(By.css('input[type="number"]')), 5000);

        await driver.sleep(2000);

        await numberOfPersonsInput.clear();

        await numberOfPersonsInput.sendKeys('3');

        await driver.sleep(1000);

        let generateButton = await driver.wait(until.elementLocated(By.css('button')), 5000);
        await generateButton.click();

        await driver.sleep(1500);

        await driver.wait(until.elementLocated(By.css('div h3')), 5000);

        let persons = await driver.findElements(By.css('div h3'));

        console.log(`Generated persons count: ${persons.length}`);
        assert.strictEqual(persons.length, 3, 'Expected 3 persons to be generated');
        console.log('Test passed: Correct number of persons generated');

        await driver.sleep(2000);

    } finally {
        await driver.quit();
    }
}

testFakePerson();
