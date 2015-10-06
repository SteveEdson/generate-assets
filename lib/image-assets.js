'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var sharp = require('sharp'),
    ProgressBar = require('progress'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    bar = null,
    barLength = 0;

var ImageAssets = (function () {
    function ImageAssets() {
        _classCallCheck(this, ImageAssets);
    }

    _createClass(ImageAssets, null, [{
        key: 'createAndroidFolders',
        value: function createAndroidFolders() {
            mkdirp.sync(process.env.PWD + "/Android/res/drawable-ldpi");
            mkdirp.sync(process.env.PWD + "/Android/res/drawable-mdpi");
            mkdirp.sync(process.env.PWD + "/Android/res/drawable-hdpi");
            mkdirp.sync(process.env.PWD + "/Android/res/drawable-xhdpi");
            mkdirp.sync(process.env.PWD + "/Android/res/drawable-xxhdpi");
            mkdirp.sync(process.env.PWD + "/Android/res/drawable-xxxhdpi");
        }
    }, {
        key: 'createIOSFolders',
        value: function createIOSFolders() {
            mkdirp.sync(process.env.PWD + "/iOS/Assets");
        }
    }, {
        key: 'resizeSplashImage',
        value: function resizeSplashImage(width, height, output) {
            sharp(process.env.PWD + '/splash-template.png').resize(width, height).max().crop('center').withoutEnlargement().toFile(process.env.PWD + "/" + output, function (err) {
                if (err) console.dir(err);

                fs.chmodSync(process.env.PWD + "/" + output, '755');

                ImageAssets.incrementBar();
            });
        }
    }, {
        key: 'resizeIconImage',
        value: function resizeIconImage(width, height, output) {
            sharp(process.env.PWD + '/icon-template.png').resize(width, height).max().crop('center').withoutEnlargement().toFile(process.env.PWD + "/" + output, function (err) {
                if (err) console.dir(err);

                fs.chmodSync(process.env.PWD + "/" + output, '755');

                ImageAssets.incrementBar();
            });
        }
    }, {
        key: 'generateAndroidSplashAssets',
        value: function generateAndroidSplashAssets() {
            console.log("Generating Android splash assets");

            ImageAssets.setBar(5);

            // Splash images
            ImageAssets.resizeSplashImage(1024, 1024, 'Android/res/drawable-mdpi/splash.png');
            ImageAssets.resizeSplashImage(1024, 1024, 'Android/res/drawable-hdpi/splash.png');
            ImageAssets.resizeSplashImage(512, 512, 'Android/res/drawable-ldpi/splash.png');
            ImageAssets.resizeSplashImage(2048, 2048, 'Android/res/drawable-xhdpi/splash.png');
            ImageAssets.resizeSplashImage(2048, 2048, 'Android/res/drawable-xxhdpi/splash.png');
            ImageAssets.resizeSplashImage(2048, 2048, 'Android/res/drawable-xxxhdpi/splash.png');

            // Feature graphic for android
            ImageAssets.resizeSplashImage(1024, 500, 'Android/feature_graphic.png');
        }
    }, {
        key: 'generateAndroidIconAssets',
        value: function generateAndroidIconAssets() {
            console.log("Generating Android icon assets");

            ImageAssets.setBar(7);

            ImageAssets.resizeIconImage(36, 36, "Android/res/drawable-ldpi/ic_launcher.png");
            ImageAssets.resizeIconImage(48, 48, "Android/res/drawable-mdpi/ic_launcher.png");
            ImageAssets.resizeIconImage(72, 72, "Android/res/drawable-hdpi/ic_launcher.png");
            ImageAssets.resizeIconImage(96, 96, "Android/res/drawable-xhdpi/ic_launcher.png");
            ImageAssets.resizeIconImage(144, 144, "Android/res/drawable-xxhdpi/ic_launcher.png");
            ImageAssets.resizeIconImage(192, 192, "Android/res/drawable-xxxhdpi/ic_launcher.png");
            ImageAssets.resizeIconImage(512, 512, "Android/web_icon.png");
        }
    }, {
        key: 'generateAndroidAssets',
        value: function generateAndroidAssets(splash, icons) {
            if (typeof splash == "undefined") splash = true;
            if (typeof icons == "undefined") icons = true;

            if (splash) ImageAssets.generateAndroidSplashAssets();
            if (icons) ImageAssets.generateAndroidIconAssets();
        }
    }, {
        key: 'generateIOSSplashAssets',
        value: function generateIOSSplashAssets() {
            ImageAssets.setBar(11);

            console.log("Generating iPad splash assets");

            ImageAssets.resizeSplashImage(768, 1004, "iOS/Assets/Default~ipad.png");
            ImageAssets.resizeSplashImage(1536, 2008, "iOS/Assets/Default@2x~ipad.png");
            ImageAssets.resizeSplashImage(1024, 748, "iOS/Assets/Default-Landscape~ipad.png");
            ImageAssets.resizeSplashImage(2048, 1496, "iOS/Assets/Default-Landscape@2x~ipad.png");
            ImageAssets.resizeSplashImage(768, 1024, "iOS/Assets/Default-Portrait~ipad.png");
            ImageAssets.resizeSplashImage(1536, 2048, "iOS/Assets/Default-Portrait@2x~ipad.png");
            ImageAssets.resizeSplashImage(1024, 768, "iOS/Assets/Default-Landscape-768~ipad.png");
            ImageAssets.resizeSplashImage(2048, 1536, "iOS/Assets/Default-Landscape-768@2x~ipad.png");

            console.log("Generating iPhone splash assets");

            ImageAssets.resizeSplashImage(320, 480, "iOS/Assets/Default.png");
            ImageAssets.resizeSplashImage(640, 960, "iOS/Assets/Default@2x.png");
            ImageAssets.resizeSplashImage(640, 1136, "iOS/Assets/Default-568h@2x.png");
        }
    }, {
        key: 'generateIOSIconAssets',
        value: function generateIOSIconAssets() {
            ImageAssets.setBar(17);

            console.log("Generating iPhone icon assets");

            ImageAssets.resizeIconImage(57, 57, "iOS/Assets/Icon.png");
            ImageAssets.resizeIconImage(114, 114, "iOS/Assets/Icon@2x.png");
            ImageAssets.resizeIconImage(120, 120, "iOS/Assets/Icon-120.png");
            ImageAssets.resizeIconImage(72, 72, "iOS/Assets/Icon-72.png");
            ImageAssets.resizeIconImage(144, 144, "iOS/Assets/Icon-72@2x.png");
            ImageAssets.resizeIconImage(76, 76, "iOS/Assets/Icon-76.png");
            ImageAssets.resizeIconImage(152, 152, "iOS/Assets/Icon-76@2x.png");
            ImageAssets.resizeIconImage(29, 29, "iOS/Assets/Icon-Small.png");
            ImageAssets.resizeIconImage(58, 58, "iOS/Assets/Icon-Small@2x.png");
            ImageAssets.resizeIconImage(80, 80, "iOS/Assets/Icon-40@2x.png");
            ImageAssets.resizeIconImage(50, 50, "iOS/Assets/Icon-Small-50.png");
            ImageAssets.resizeIconImage(100, 100, "iOS/Assets/Icon-Small-50@2x.png");
            ImageAssets.resizeIconImage(40, 40, "iOS/Assets/Icon-40.png");
            ImageAssets.resizeIconImage(80, 80, "iOS/Assets/Icon-40@2x.png");

            console.log("Generating iTunes artwork");

            ImageAssets.resizeIconImage(1024, 1024, "iOS/Assets/iTunesArtwork@2x.png");
            ImageAssets.resizeIconImage(512, 512, "iOS/Assets/iTunesArtwork.png");

            console.log("Generating Lock Screen Image");

            ImageAssets.resizeIconImage(652, 652, "iOS/Assets/lock-screen.png");
        }
    }, {
        key: 'generateIOSAssets',
        value: function generateIOSAssets(splash, icons) {

            if (typeof splash == "undefined") splash = true;
            if (typeof icons == "undefined") icons = true;

            if (splash) ImageAssets.generateIOSSplashAssets();
            if (icons) ImageAssets.generateIOSIconAssets();
        }
    }, {
        key: 'setBar',
        value: function setBar(length) {
            barLength = barLength + length;

            bar = new ProgressBar(':bar', { total: barLength });
        }
    }, {
        key: 'incrementBar',
        value: function incrementBar() {
            if (bar != null) bar.tick();
        }
    }]);

    return ImageAssets;
})();

exports['default'] = ImageAssets;
module.exports = exports['default'];