var sharp = require('sharp'),
    ProgressBar = require('progress'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    bar = null,
    barLength = 0;

export default class ImageAssets {
    static createAndroidFolders() {
        mkdirp.sync(process.env.PWD + "/Android/res/drawable-ldpi");
        mkdirp.sync(process.env.PWD + "/Android/res/drawable-mdpi");
        mkdirp.sync(process.env.PWD + "/Android/res/drawable-hdpi");
        mkdirp.sync(process.env.PWD + "/Android/res/drawable-xhdpi");
        mkdirp.sync(process.env.PWD + "/Android/res/drawable-xxhdpi");
        mkdirp.sync(process.env.PWD + "/Android/res/drawable-xxxhdpi");
    }

    static createIOSFolders() {
        mkdirp.sync(process.env.PWD + "/iOS/Assets");
    }

    static resizeSplashImage(path, width, height, output) {
        sharp(path)
            .resize(width, height)
            .max()
            .crop('center')
            .withoutEnlargement()
            .toFile(process.env.PWD + "/" + output, function (err) {
                if (err) console.dir(err);

                fs.chmodSync(process.env.PWD + "/" + output, '755');

                ImageAssets.incrementBar();
            });
    }

    static resizeIconImage(path, width, height, output) {
        sharp(path)
            .resize(width, height)
            .max()
            .crop('center')
            .withoutEnlargement()
            .toFile(process.env.PWD + "/" + output, function (err) {
                if (err) console.dir(err);

                fs.chmodSync(process.env.PWD + "/" + output, '755');

                ImageAssets.incrementBar();
            });
    }

    static generateAndroidSplashAssets(path) {
        console.log("Generating Android splash assets");

        ImageAssets.setBar(5);

        // Splash images
        ImageAssets.resizeSplashImage(path, 1024, 1024, 'Android/res/drawable-mdpi/splash.png');
        ImageAssets.resizeSplashImage(path, 1024, 1024, 'Android/res/drawable-hdpi/splash.png');
        ImageAssets.resizeSplashImage(path, 512, 512,   'Android/res/drawable-ldpi/splash.png');
        ImageAssets.resizeSplashImage(path, 2048, 2048, 'Android/res/drawable-xhdpi/splash.png');
        ImageAssets.resizeSplashImage(path, 2048, 2048, 'Android/res/drawable-xxhdpi/splash.png');
        ImageAssets.resizeSplashImage(path, 2048, 2048, 'Android/res/drawable-xxxhdpi/splash.png');

        // Feature graphic for android
        ImageAssets.resizeSplashImage(path, 1024, 500, 'Android/feature_graphic.png');
    }

    static generateAndroidIconAssets() {
        console.log("Generating Android icon assets");

        ImageAssets.setBar(7);

        ImageAssets.resizeIconImage(path, 36, 36, "Android/res/drawable-ldpi/ic_launcher.png");
        ImageAssets.resizeIconImage(path, 48, 48, "Android/res/drawable-mdpi/ic_launcher.png");
        ImageAssets.resizeIconImage(path, 72, 72, "Android/res/drawable-hdpi/ic_launcher.png");
        ImageAssets.resizeIconImage(path, 96, 96, "Android/res/drawable-xhdpi/ic_launcher.png");
        ImageAssets.resizeIconImage(path, 144, 144, "Android/res/drawable-xxhdpi/ic_launcher.png");
        ImageAssets.resizeIconImage(path, 192, 192, "Android/res/drawable-xxxhdpi/ic_launcher.png");
        ImageAssets.resizeIconImage(path, 512, 512, "Android/web_icon.png");
    }

    static generateAndroidAssets(splash, splashPath, icons, iconsPath) {
        if (typeof splash == "undefined") splash = true;
        if (typeof icons == "undefined") icons = true;

        if (splash) ImageAssets.generateAndroidSplashAssets(splashPath);
        if (icons) ImageAssets.generateAndroidIconAssets(iconsPath);
    }

    static generateIOSSplashAssets(path) {
        ImageAssets.setBar(11);

        console.log("Generating iPad splash assets");

        ImageAssets.resizeSplashImage(path, 768, 1004, "iOS/Assets/Default~ipad.png");
        ImageAssets.resizeSplashImage(path, 1536, 2008, "iOS/Assets/Default@2x~ipad.png");
        ImageAssets.resizeSplashImage(path, 1024, 748, "iOS/Assets/Default-Landscape~ipad.png");
        ImageAssets.resizeSplashImage(path, 2048, 1496, "iOS/Assets/Default-Landscape@2x~ipad.png");
        ImageAssets.resizeSplashImage(path, 768, 1024, "iOS/Assets/Default-Portrait~ipad.png");
        ImageAssets.resizeSplashImage(path, 1536, 2048, "iOS/Assets/Default-Portrait@2x~ipad.png");
        ImageAssets.resizeSplashImage(path, 1024, 768, "iOS/Assets/Default-Landscape-768~ipad.png");
        ImageAssets.resizeSplashImage(path, 2048, 1536, "iOS/Assets/Default-Landscape-768@2x~ipad.png");

        console.log("Generating iPhone splash assets");

        ImageAssets.resizeSplashImage(path, 320, 480, "iOS/Assets/Default.png");
        ImageAssets.resizeSplashImage(path, 640, 960, "iOS/Assets/Default@2x.png");
        ImageAssets.resizeSplashImage(path, 640, 1136, "iOS/Assets/Default-568h@2x.png");
    }

    static generateIOSIconAssets() {
        ImageAssets.setBar(17);

        console.log("Generating iPhone icon assets");

        ImageAssets.resizeIconImage(path, 57, 57, "iOS/Assets/Icon.png");
        ImageAssets.resizeIconImage(path, 114, 114, "iOS/Assets/Icon@2x.png");
        ImageAssets.resizeIconImage(path, 120, 120, "iOS/Assets/Icon-120.png");
        ImageAssets.resizeIconImage(path, 72, 72, "iOS/Assets/Icon-72.png");
        ImageAssets.resizeIconImage(path, 144, 144, "iOS/Assets/Icon-72@2x.png");
        ImageAssets.resizeIconImage(path, 76, 76, "iOS/Assets/Icon-76.png");
        ImageAssets.resizeIconImage(path, 152, 152, "iOS/Assets/Icon-76@2x.png");
        ImageAssets.resizeIconImage(path, 29, 29, "iOS/Assets/Icon-Small.png");
        ImageAssets.resizeIconImage(path, 58, 58, "iOS/Assets/Icon-Small@2x.png");
        ImageAssets.resizeIconImage(path, 80, 80, "iOS/Assets/Icon-40@2x.png");
        ImageAssets.resizeIconImage(path, 50, 50, "iOS/Assets/Icon-Small-50.png");
        ImageAssets.resizeIconImage(path, 100, 100, "iOS/Assets/Icon-Small-50@2x.png");
        ImageAssets.resizeIconImage(path, 40, 40, "iOS/Assets/Icon-40.png");
        ImageAssets.resizeIconImage(path, 80, 80, "iOS/Assets/Icon-40@2x.png");

        console.log("Generating iTunes artwork");

        ImageAssets.resizeIconImage(path, 1024, 1024, "iOS/Assets/iTunesArtwork@2x.png");
        ImageAssets.resizeIconImage(path, 512, 512, "iOS/Assets/iTunesArtwork.png");

        console.log("Generating Lock Screen Image");

        ImageAssets.resizeIconImage(652, 652, "iOS/Assets/lock-screen.png");
    }

    static generateIOSAssets(splash, splashPath, icons, iconsPath) {

        if (typeof splash == "undefined") splash = true;
        if (typeof icons == "undefined") icons = true;

        if (splash) ImageAssets.generateIOSSplashAssets(splashPath);
        if (icons) ImageAssets.generateIOSIconAssets(iconsPath);
    }

    static setBar(length) {
        barLength = barLength + length;

        bar = new ProgressBar(':bar', {total: barLength});
    }

    static incrementBar() {
        if (bar != null) bar.tick();
    }
}
