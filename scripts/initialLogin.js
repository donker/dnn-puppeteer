const puppeteer = require("puppeteer");
const sttngs = require("../utils/settings");
const settings = sttngs.getSettings();
const login = require("../dnn/authentication");

async function run() {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(settings.dnnWebsite);
    await login.Login(page, settings.hostUsername, "dnnhost");
    await page.waitFor(2000);
    await login.ChangePassword(page, settings.hostPassword)
    await page.waitFor(2000);
    browser.close();
  }
  
  run();
  