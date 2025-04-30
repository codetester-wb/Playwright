//Zelfde als example.spec.ts maar dan door gebruik te maken van AAA en POM (Page Object Model) om dubbele regels met dezelfde code te voorkomen
//En alle testen in een test.describe gezet, getiteld 'Playwright website'
import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';

//AAA
//POM

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.intro/;

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
    //await page.getByRole('link', { name: 'Get started' }).click();
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);    
};

test.describe('Playwright website', () => {
    test('has title', async ({ page }) => {
        //await page.goto('https://playwright.dev/'); VERVANGEN DOOR DE VARIABELE const URL en METHOD test.BeforeEach
      
        // Expect a title "to contain" a substring.
        //await expect(page).toHaveTitle(/Playwright/); VERVANGEN DOOR REGEL HIERONDER O.A. MET BEHULP VAN METHOD assertPageTitle OP home-page.ts
        await homePage.assertPageTitle();
      });
      
      test('get started link', async ( { page } ) => {
        //await page.goto('https://playwright.dev/'); VERVANGEN DOOR DE VARIABELE const URL en METHOD test.BeforeEach
      
        // Click the get started link.
        //await page.getByRole('link', { name: 'Get started' }).click(); VERANDERD, ZIE REGEL HIERONDER, MAAKT NU GEBRUIK VAN DE FUNCTION clickGetStarted
        await clickGetStarted(page);
      
        // Expects page to have a heading with the name of Installation.
        //await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
        await topMenuPage.assertPageUrl(pageUrl);
      });
      
      
      /**
       * 1. Open the page
       * 2. Click at Get started
       * 3. Mouse hover the language dropdown
       * 4. Click at Java
       * 5. Check the URL
       * 6. Check the text "Installing Playwright" is not displayed
       * 7. Check the text below is displayed
       * 
       * Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.
       */
      
      //test('check Java page', async ({ page }) =>{
      
        //page.goto('https://playwright.dev/'); VERVANGEN DOOR DE VARIABELE const URL en METHOD test.BeforeEach
      
        //await page.getByRole('link', {name: 'Get started'}).click(); VERANDERD, ZIE REGEL HIERONDER, MAAKT NU GEBRUIK VAN DE FUNCTION clickGetStarted
        

      test('check Java page', async ({ page }) => {
        await test.step('Act', async () => {
            //await page.getByRole('link', {name: 'Get started'}).click(); VERANDERD, ZIE REGEL HIERONDER, MAAKT NU GEBRUIK VAN DE FUNCTION clickGetStarted
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        });
      
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertNodeDescriptionNotVisible();
            await topMenuPage.assertJavaDescriptionVisible();
        });
    });
});