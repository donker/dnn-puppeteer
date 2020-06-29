const fs = require("fs");
const defaultSettings = require("../settings.json");

exports.getSettings = function () {
  var path = "./settings.local.json";
  var settings = Object.assign({}, defaultSettings);
  if (fs.existsSync(path)) {
    let localSettings = JSON.parse(fs.readFileSync(path));
    settings = Object.assign(defaultSettings, localSettings);
  }
  return settings;
};
