exports.Login = async function (page, username, password) {
  await page.click("[id$='dnnLogin_enhancedLoginLink']");
  const frames = await page.frames();
  const popup = frames.find((f) => f.name() === "iPopUp");
  if (popup) {
    const un = await popup.waitForSelector("[id$='Login_DNN_txtUsername']");
    await un.click("[id$='Login_DNN_txtUsername']");
    await page.keyboard.type(username);
    await popup.click("[id$='Login_DNN_txtPassword']");
    await page.keyboard.type(password);
    await popup.click("[id$='Login_DNN_cmdLogin']");
    await page.waitForNavigation();
  }
};

exports.LoginInline = async function (page, username, password) {
  await page.click("[id$='dnnLogin_enhancedLoginLink']");
  await page.waitForSelector("[id$='Login_DNN_txtUsername']");
  await page.click("[id$='Login_DNN_txtUsername']");
  await page.keyboard.type(username);
  await page.click("[id$='Login_DNN_txtPassword']");
  await page.keyboard.type(password);
  await page.click("[id$='Login_DNN_cmdLogin']");
  await page.waitForNavigation();
};

exports.ChangePassword = async function (page, newPassword) {
  await page.waitForSelector("[id$='PasswordReset_txtPassword']");
  await page.click("[id$='PasswordReset_txtPassword']");
  await page.keyboard.type(newPassword);
  await page.click("[id$='PasswordReset_txtConfirmPassword']");
  await page.keyboard.type(newPassword);
  await page.click("[id$='PasswordReset_cmdChangePassword']");
  await page.waitForNavigation();
};

exports.Logoff = async function (page) {
  await page.waitForSelector(".LoginLink");
  await page.click(".LoginLink");
};
