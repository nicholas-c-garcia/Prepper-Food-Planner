// This Test automatically:
// 1. Views public recipes
// 2. Saves public recipes

const { Builder, By, until } = require("selenium-webdriver");

const driver = new Builder().forBrowser("firefox").build();

(async function loginAutomation() {
    try {

        await driver.get('http://localhost:3000/');

        //Log in to test account
        const loginLink = await driver.findElement(By.xpath("//a[contains(text(), 'Log In')]"));
        await loginLink.click();

        await driver.wait(until.elementLocated(By.css('#emailInput')));
        const emailInput = await driver.findElement(By.css('#emailInput'));
        await emailInput.sendKeys('test@selenium.com');

        const passwordInput = await driver.findElement(By.css('#password'));
        await passwordInput.sendKeys('selenium');

        const loginButton = await driver.findElement(By.xpath('//button[contains(text(), "Login")]'));
        await loginButton.click();

        //Navigate to FindRecipes 
        await driver.wait(until.elementLocated(By.xpath("//a[contains(@class, 'link') and contains(text(), 'Find Recipes')]")), 10000);
        const myRecipesLink = await driver.findElement(By.xpath("//a[contains(@class, 'link') and contains(text(), 'Find Recipes')]"));
        await driver.wait(until.elementIsVisible(myRecipesLink), 10000);
        await myRecipesLink.click();

        //Search recipe
        const searchBox = await driver.findElement(By.css('.find-recipe-input'));
        await searchBox.sendKeys('chicken');

        // Wait for the recipes to filter
        await driver.sleep(2000); 

        const firstRecipe = await driver.findElement(By.css('.foundRecipe:not(.hide)'));
        await firstRecipe.click();

        // Wait for the recipe details to be displayed and the save button to become visible
        await driver.sleep(1000);

        // Click the save button
        const headerButtons = await driver.findElements(By.css(".header-button-icons"));
        const saveButton = headerButtons[1];
        await saveButton.click();

    } catch (error) {
        console.error('Error in login automation:', error);
    } finally {
        await driver.sleep(3000);
        await driver.quit();
    }
})();