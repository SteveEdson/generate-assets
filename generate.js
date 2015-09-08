var chalk = require('chalk'),
    sharp = require('sharp'),
    inquirer = require("inquirer"),
    ProgressBar = require('progress'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    bar = null,
    barLength = 0;

var questions = [
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
    },
];


function createAndroidFolders() {
    mkdirp.sync(process.env.PWD + "/Android/res/drawable-ldpi");
    mkdirp.sync(process.env.PWD + "/Android/res/drawable-mdpi");
    mkdirp.sync(process.env.PWD + "/Android/res/drawable-hdpi");
    mkdirp.sync(process.env.PWD + "/Android/res/drawable-xhdpi");
    mkdirp.sync(process.env.PWD + "/Android/res/drawable-xxhdpi");
    mkdirp.sync(process.env.PWD + "/Android/res/drawable-xxxhdpi");
}

function createIOSFolders() {
    mkdirp.sync(process.env.PWD + "/iOS/Splash");

}

function setBar(length) {
    barLength = barLength + length;

    bar = new ProgressBar(':bar', {total: barLength});
}

function incrementBar() {
    if (bar != null) bar.tick();
}

function resizeSplashImage(width, height, output) {
    sharp(process.env.PWD + '/splash-template.png')
        .resize(width, height)
        .max()
        .crop('center')
        .withoutEnlargement()
        .toFile(process.env.PWD + "/" + output, function (err) {
            if (err) console.dir(err);

            incrementBar();
        });
}

function resizeIconImage(width, height, output) {
    sharp(process.env.PWD + '/icon-template.png')
        .resize(width, height)
        .max()
        .crop('center')
        .withoutEnlargement()
        .toFile(process.env.PWD + "/" + output, function (err) {
            if (err) console.dir(err);

            incrementBar();
        });
}

function generateAndroidSplashAssets() {
    console.log("Generating Android splash assets");

    setBar(5);

    // Splash images
    resizeSplashImage(1024, 1024, 'Android/res/drawable-mdpi/splash.png');
    resizeSplashImage(1024, 1024, 'Android/res/drawable-hdpi/splash.png');
    resizeSplashImage(512, 512, 'Android/res/drawable-ldpi/splash.png');

    resizeSplashImage(2048, 2048, 'Android/res/drawable-xhdpi/splash.png');

    // Next two are not needed as they are the same, will fallback to the highest available res

    //resizeSplashImage(2048, 2048, 'Android/res/drawable-xxhdpi/splash.png');
    //resizeSplashImage(2048, 2048, 'Android/res/drawable-xxxhdpi/splash.png');

    // Feature graphic for android
    resizeSplashImage(1024, 500, 'Android/feature_graphic.png');
}

function generateAndroidIconAssets() {
    console.log("Generating Android icon assets");

    setBar(7);

    resizeIconImage(36, 36, "Android/res/drawable-ldpi/ic_launcher.png");
    resizeIconImage(48, 48, "Android/res/drawable-mdpi/ic_launcher.png");
    resizeIconImage(72, 72, "Android/res/drawable-hdpi/ic_launcher.png");
    resizeIconImage(96, 96, "Android/res/drawable-xhdpi/ic_launcher.png");
    resizeIconImage(144, 144, "Android/res/drawable-xxhdpi/ic_launcher.png");
    resizeIconImage(192, 192, "Android/res/drawable-xxxhdpi/ic_launcher.png");
    resizeIconImage(512, 512, "Android/web_icon.png");
}

function generateAndroidAssets(splash, icons) {
    if (typeof splash == "undefined") splash = true;
    if (typeof icons == "undefined") icons = true;

    if (splash) generateAndroidSplashAssets();
    if (icons) generateAndroidIconAssets();
}

function generateIOSSplashAssets() {
    setBar(11);

    console.log("Generating iPad splash assets");

    resizeSplashImage(768, 1004, "iOS/Splash/Default~ipad.png");
    resizeSplashImage(1536, 2008, "iOS/Splash/Default@2x~ipad.png");
    resizeSplashImage(1024, 748, "iOS/Splash/Default-Landscape~ipad.png");
    resizeSplashImage(2048, 1496, "iOS/Splash/Default-Landscape@2x~ipad.png");
    resizeSplashImage(768, 1024, "iOS/Splash/Default-Portrait~ipad.png");
    resizeSplashImage(1536, 2048, "iOS/Splash/Default-Portrait@2x~ipad.png");
    resizeSplashImage(1024, 768, "iOS/Splash/Default-Landscape-768~ipad.png");
    resizeSplashImage(2048, 1536, "iOS/Splash/Default-Landscape-768@2x~ipad.png");

    console.log("Generating iPhone splash assets");

    resizeSplashImage(320, 480, "iOS/Splash/Default.png");
    resizeSplashImage(640, 960, "iOS/Splash/Default@2x.png");
    resizeSplashImage(640, 1136, "iOS/Splash/Default-568h@2x.png");

}

function generateIOSIconAssets() {
    setBar(17);

    console.log("Generating iPhone icon assets");

    resizeIconImage(57, 57, "iOS/Splash/Icon.png");
    resizeIconImage(114, 114, "iOS/Splash/Icon@2x.png");
    resizeIconImage(120, 120, "iOS/Splash/Icon-120.png");
    resizeIconImage(72, 72, "iOS/Splash/Icon-72.png");
    resizeIconImage(144, 144, "iOS/Splash/Icon-72@2x.png");
    resizeIconImage(76, 76, "iOS/Splash/Icon-76.png");
    resizeIconImage(152, 152, "iOS/Splash/Icon-76@2x.png");
    resizeIconImage(29, 29, "iOS/Splash/Icon-Small.png");
    resizeIconImage(58, 58, "iOS/Splash/Icon-Small@2x.png");
    resizeIconImage(80, 80, "iOS/Splash/Icon-40@2x.png");
    resizeIconImage(50, 50, "iOS/Splash/Icon-Small-50.png");
    resizeIconImage(100, 100, "iOS/Splash/Icon-Small-50@2x.png");
    resizeIconImage(40, 40, "iOS/Splash/Icon-40.png");
    resizeIconImage(80, 80, "iOS/Splash/Icon-40@2x.png");

    console.log("Generating iTunes artwork");

    resizeIconImage(1024, 1024, "iOS/Splash/iTunesArtwork@2x.png");
    resizeIconImage(512, 512, "iOS/Splash/iTunesArtwork.png");

    console.log("Generating Lock Screen Image");

    resizeIconImage(652, 652, "iOS/Splash/lock-screen.png");
}

function generateIOSAssets(splash, icons) {

    if (typeof splash == "undefined") splash = true;
    if (typeof icons == "undefined") icons = true;

    if (splash) generateIOSSplashAssets();
    if (icons) generateIOSIconAssets();
}


inquirer.prompt(questions, function (answers) {

    if (answers.generateAndroidSplash || answers.generateAndroidIcons) {
        createAndroidFolders();
        generateAndroidAssets(answers.generateAndroidSplash, answers.generateAndroidIcons);
    }

    if (answers.generateIOSSplash || answers.generateIOSIcons) {
        createIOSFolders();
        generateIOSAssets(answers.generateIOSSplash, answers.generateIOSIcons);
    }
});
