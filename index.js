const path = require('path');
const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');
const { assert } = require('chai');

const DRIVER_PATH = path.join(__dirname, "drivers/");

function setup() {
    let service = new chrome.ServiceBuilder(DRIVER_PATH + "chromedriver.exe").build();
    chrome.setDefaultService(service);

    let chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--start-maximized");

    let chromeCapabilities = webdriver.Capabilities.chrome();

    let instance = new webdriver.Builder()
        .withCapabilities(chromeCapabilities)
        .setChromeOptions(chromeOptions)
        .build();

    return instance;
}

async function demo() {
    let driver = setup();
    (await driver).get("https://es.wikipedia.org/");
    let element = (await driver).findElement(webdriver.By.xpath("//input[@name='search']"));
    element.sendKeys("Mexico", webdriver.Key.ENTER);

    await driver.sleep(3000);
    element = (await driver).findElement(webdriver.By.xpath("//a[@title='México']"));
    (await element).click();

    await driver.sleep(3000);
    element = (await driver).findElement(webdriver.By.xpath("//h1"));
    let title = (await element).getText();
    console.log(element)

    //assert.equal(title,"México","Strings don't match")

    await driver.sleep(3000);
    (await driver).quit();

}

demo();