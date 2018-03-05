#! /usr/bin/env node
const inquirer = require("inquirer"),
    ImageAssets = require("./image-assets").default,
    updateNotifier = require("update-notifier"),
    pkg = require("../package.json");

updateNotifier({
    pkg: pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7 // 1 week
}).notify();

const questions = [
    {
        type: "confirm",
        name: "generateAndroidSplash",
        message: "Generate Android Splash images",
        default: true
    },
    {
        type: "confirm",
        name: "generateAndroidIcons",
        message: "Generate Android Icon images",
        default: true
    },
    {
        type: "confirm",
        name: "generateIOSSplash",
        message: "Generate iOS Splash images",
        default: true
    },
    {
        type: "confirm",
        name: "generateIOSIcons",
        message: "Generate iOS Icon images",
        default: true
    }
];

inquirer.prompt(questions, function (answers) {

    var splashPath = process.env.PWD + '/splash-template.png';
    var iconPath = process.env.PWD + '/icon-template.png';

    if (answers.generateAndroidSplash || answers.generateAndroidIcons) {
        ImageAssets.createAndroidFolders();

        ImageAssets.generateAndroidAssets(answers.generateAndroidSplash, splashPath, answers.generateAndroidIcons, iconPath);
    }

    if (answers.generateIOSSplash || answers.generateIOSIcons) {
        ImageAssets.createIOSFolders();
        ImageAssets.generateIOSAssets(answers.generateIOSSplash, splashPath, answers.generateIOSIcons, iconPath);
    }
});
