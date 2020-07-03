const fs = require("fs");
const puppeteer = require("puppeteer");
const login = require("../dnn/authentication");
const txtgen = require("txtgen");

async function run() {
  var siteFile = process.argv[2];
  var site = {};
  if (fs.existsSync(siteFile)) {
    site = JSON.parse(fs.readFileSync(siteFile));
  }
  var users = site.users;
  var nrUsers = +process.argv[3];
  var nrMessages = +process.argv[4];

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  console.log("Firing up Chrome");
  const page = await browser.newPage();
  await page.goto(site.url);
  await page.waitFor(1000);

  for (var uid = 0; uid < nrUsers; uid++) {
    var index = getRandomArbitrary(0, users.length);
    var sendingUser = users[index];
    console.log(`Logging in as ${sendingUser.displayName}`);
    if (site.loginPopup) {
      await login.Login(page, sendingUser.userName, site.defaultPassword);
    } else {
      await login.LoginInline(page, sendingUser.userName, site.defaultPassword);
    }

    console.log("Heading over to messaging page");
    await page.waitForSelector("#dnn_dnnUser_messageLink");
    await page.click("#dnn_dnnUser_messageLink");
    await page.waitForSelector(".ComposeMessage");

    if (users.length > 0) {
      for (var i = 0; i < nrMessages; i++) {
        var user = users[getRandomArbitrary(0, users.length)];
        await writeMessage(
          page,
          user.displayName,
          txtgen.sentence(),
          txtgen.paragraph()
        );
        if (i + 1 < nrMessages) {
          console.log("Need to wait");
          await page.waitFor(40000);
        }
      }
    }

    await page.waitFor(2000);
    console.log("Logging Off");
    await login.Logoff(page);
    console.log("Logged Off");
    await page.waitFor(2000);
  }

  browser.close();
}

run();

async function writeMessage(page, displayName, title, message) {
  console.log(`Sending a message to ${displayName}`);
  await page.click(".ComposeMessage");
  await page.waitFor(500);
  await page.waitForSelector("#token-input-to");
  await page.click("#token-input-to");
  await page.keyboard.type(displayName.substring(0, 5));
  await page.waitFor(1000);
  var dropdown = await page.$("li.user");
  await dropdown.click();
  await page.click("#subject");
  await page.keyboard.type(title);
  await page.waitFor(500);
  await page.click("#bodytext");
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyA");
  await page.keyboard.up("Control");
  await page.keyboard.press("Backspace");
  await page.keyboard.type(message);
  await page.waitFor(500);
  var dialogBtn = await page.$(".ui-dialog-buttonset button.dnnTertiaryAction");
  await dialogBtn.click();
  await page.waitFor(2000);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
