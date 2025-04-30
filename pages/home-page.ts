import { type Locator, type Page, expect } from "@playwright/test";

export class HomePage{
    //variables
    readonly page: Page;
    //await page.getByRole('link', { name: 'Get started' }).click();
    readonly getStartedButton: Locator;
    //await expect(page).toHaveTitle(/Playwright/);
    readonly pageTitle: RegExp;

    //constructor
    constructor (page: Page) {
        this.page = page;
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.pageTitle = /Playwright/;
    }

    //methods
    async clickGetStarted(){
        await this.getStartedButton.click();
    }

    async assertPageTitle(){
        await expect(this.page).toHaveTitle(this.pageTitle);
    }
}

export default HomePage;