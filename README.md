# dnn-puppeteer
Puppeteer (web automation) project for DNN Platform

## Summary
Puppeteer is an [Open Source](https://github.com/puppeteer/puppeteer) project that will download a version of Chrome and use it to do what you tell it to do.
The idea is that you use it to test a website that you might be working on. You use selectors a la jQuery to see if something exists on the page and then
manipulate the page by clicking, entering text, etc.

This dnn-puppeteer project includes my own work to abstract some of this and give me some powerful methods that can be used for DNN. Like 
`Login(username, password)` which will look for the login button, click it and fill in the login form and submit.

