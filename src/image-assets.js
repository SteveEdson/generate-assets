var sharp = require('sharp'),
    ProgressBar = require('progress'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    polyfill = require("babel/polyfill"),
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
        console.log("Converting " + output + " with " + width + " - " + height);

        return new Promise(function(resolve, reject) {
            sharp(path)
                .resize(width, height)
                .max()
                .crop('center')
                .withoutEnlargement()
                .toFile(process.env.PWD + "/" + output, function (err) {
                    if (err) reject(err);

                    fs.chmodSync(process.env.PWD + "/" + output, '755');

                    ImageAssets.incrementBar();

                    resolve(process.env.PWD + "/" + output);
                });
        });
    }

    static resizeIconImage(path, width, height, output) {
        return new Promise(function(resolve, reject) {
            sharp(path)
                .resize(width, height)
                .max()
                .crop('center')
                .withoutEnlargement()
                .toFile(process.env.PWD + "/" + output, function (err) {
                    if (err) reject(err);

                    fs.chmodSync(process.env.PWD + "/" + output, '755');

                    ImageAssets.incrementBar();

                    resolve(process.env.PWD + "/" + output);
                });
        });
    }

    static generateAndroidSplashAssets(path) {
        console.log("Generating Android splash assets");

        var files = [
            {
                path: "Android/res/drawable-mdpi/splash.png",
                width: 1024,
                height: 1024
            },
            {
                path: "Android/res/drawable-hdpi/splash.png",
                width: 1024,
                height: 1024
            },
            {
                path: "Android/res/drawable-ldpi/splash.png",
                width: 512,
                height: 512
            },
            {
                path: "Android/res/drawable-xhdpi/splash.png",
                width: 2048,
                height: 2048
            },
            {
                path: "Android/res/drawable-xxhdpi/splash.png",
                width: 2048,
                height: 2048
            },
            {
                path: "Android/res/drawable-xxxhdpi/splash.png",
                width: 2048,
                height: 2048
            },
            {
                path: "Android/feature_graphic.png",
                width: 1024,
                height: 500
            }
        ];

        ImageAssets.setBar(files.length);

        var promises = [];

        for(var i = 0; i < files.length; i++) {
            var file = files[i];
            promises.push(ImageAssets.resizeSplashImage(path, file.width, file.height, file.path));
        }

        return promises;
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
        console.log("Generating iPad splash assets");

        var files = [
            {
                path: "iOS/Assets/Default~ipad.png",
                width: 768,
                height: 1004
            },
            {
                path: "iOS/Assets/Default@2x~ipad.png",
                width: 1536,
                height: 2008
            },
            {
                path: "iOS/Assets/Default-Landscape~ipad.png",
                width: 1024,
                height: 748
            },
            {
                path: "iOS/Assets/Default-Landscape@2x~ipad.png",
                width: 2048,
                height: 1496
            },
            {
                path: "iOS/Assets/Default-Portrait~ipad.png",
                width: 768,
                height: 1024
            },
            {
                path: "iOS/Assets/Default-Portrait@2x~ipad.png",
                width: 1536,
                height: 2048
            },
            {
                path: "iOS/Assets/Default-Landscape-768~ipad.png",
                width: 1024,
                height: 768
            },
            {
                path: "iOS/Assets/Default-Landscape-768@2x~ipad.png",
                width: 2048,
                height: 1536
            },
            {
                path: "iOS/Assets/Default.png",
                width: 320,
                height: 480
            },
            {
                path: "iOS/Assets/Default@2x.png",
                width: 640,
                height: 960
            },
            {
                path: "iOS/Assets/Default-568h@2x.png",
                width: 640,
                height: 1136
            }
        ];

        ImageAssets.setBar(files.length);

        var promises = [];

        for(var i = 0; i < files.length; i++) {
            var file = files[i];
            promises.push(ImageAssets.resizeSplashImage(path, file.width, file.height, file.path));
        }

        return promises;


        // console.log("Generating iPhone splash assets");
    }

    static generateIOSIconAssets(path) {
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
