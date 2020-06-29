exports.Login = async function(page, username, password) {
    await page.click("#dnn_dnnLogin_enhancedLoginLink");
    const frames = await page.frames();
    const popup = frames.find(f => f.name() === "iPopUp");
    if (popup) {
      const un = await popup.waitForSelector(
        "#dnn_ctr_Login_Login_DNN_txtUsername"
      );
      await un.click("#dnn_ctr_Login_Login_DNN_txtUsername");
      await page.keyboard.type(username);
      await popup.click("#dnn_ctr_Login_Login_DNN_txtPassword");
      await page.keyboard.type(password);
      await popup.click("#dnn_ctr_Login_Login_DNN_cmdLogin");
      await page.waitForNavigation();
    }
  };

exports.ChangePassword = async function(page, newPassword) {
  await page.waitForSelector(
    "#dnn_ctr_PasswordReset_txtPassword"
  );
  await page.click("#dnn_ctr_PasswordReset_txtPassword");
  await page.keyboard.type(newPassword);
  await page.click("#dnn_ctr_PasswordReset_txtConfirmPassword");
  await page.keyboard.type(newPassword);
  await page.click("#dnn_ctr_PasswordReset_cmdChangePassword");
  await page.waitForNavigation();
}
