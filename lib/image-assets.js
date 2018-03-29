'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sharp = require('sharp'),
    ProgressBar = require('progress'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    Promise = require("bluebird"),
    bar = null,
    barLength = 0;

var ImageAssets = function () {
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
        value: function resizeSplashImage(path, width, height, output) {

            return new Promise(function (resolve, reject) {
                sharp(path).resize(width, height).max().crop('center').withoutEnlargement().toFile(process.env.PWD + "/" + output, function (err) {
                    if (err) reject(err);

                    fs.chmodSync(process.env.PWD + "/" + output, '755');

                    //ImageAssets.incrementBar();

                    resolve(process.env.PWD + "/" + output);
                });
            });
        }
    }, {
        key: 'resizeIconImage',
        value: function resizeIconImage(path, width, height, output) {
            return new Promise(function (resolve, reject) {
                sharp(path).resize(width, height).max().crop('center').withoutEnlargement().toFile(process.env.PWD + "/" + output, function (err) {
                    if (err) reject(err);

                    fs.chmodSync(process.env.PWD + "/" + output, '755');

                    ImageAssets.incrementBar();

                    resolve(process.env.PWD + "/" + output);
                });
            });
        }
    }, {
        key: 'generateAndroidSplashAssets',
        value: function generateAndroidSplashAssets(path) {

            var files = [{
                path: "Android/res/drawable-mdpi/splash.png",
                width: 1024,
                height: 1024
            }, {
                path: "Android/res/drawable-hdpi/splash.png",
                width: 1024,
                height: 1024
            }, {
                path: "Android/res/drawable-ldpi/splash.png",
                width: 512,
                height: 512
            }, {
                path: "Android/res/drawable-xhdpi/splash.png",
                width: 2048,
                height: 2048
            }, {
                path: "Android/res/drawable-xxhdpi/splash.png",
                width: 2048,
                height: 2048
            }, {
                path: "Android/res/drawable-xxxhdpi/splash.png",
                width: 2048,
                height: 2048
            }, {
                path: "Android/feature_graphic.png",
                width: 1024,
                height: 500
            }];

            //ImageAssets.setBar(files.length);

            var promises = [];

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                promises.push(ImageAssets.resizeSplashImage(path, file.width, file.height, file.path));
            }

            return promises;
        }
    }, {
        key: 'generateAndroidIconAssets',
        value: function generateAndroidIconAssets(path) {

            var files = [{
                path: "Android/res/drawable-ldpi/ic_launcher.png",
                width: 36,
                height: 36
            }, {
                path: "Android/res/drawable-mdpi/ic_launcher.png",
                width: 48,
                height: 48
            }, {
                path: "Android/res/drawable-hdpi/ic_launcher.png",
                width: 72,
                height: 72
            }, {
                path: "Android/res/drawable-xhdpi/ic_launcher.png",
                width: 96,
                height: 96
            }, {
                path: "Android/res/drawable-xxhdpi/ic_launcher.png",
                width: 144,
                height: 144
            }, {
                path: "Android/res/drawable-xxxhdpi/ic_launcher.png",
                width: 192,
                height: 192
            }, {
                path: "Android/web_icon.png",
                width: 512,
                height: 512
            }];

            ImageAssets.setBar(files.length);

            var promises = [];

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                promises.push(ImageAssets.resizeIconImage(path, file.width, file.height, file.path));
            }

            return promises;
        }
    }, {
        key: 'generateAndroidAssets',
        value: function generateAndroidAssets(splash, splashPath, icons, iconsPath) {
            if (typeof splash == "undefined") splash = true;
            if (typeof icons == "undefined") icons = true;

            if (splash) ImageAssets.generateAndroidSplashAssets(splashPath);
            if (icons) ImageAssets.generateAndroidIconAssets(iconsPath);
        }
    }, {
        key: 'generateIOSSplashAssets',
        value: function generateIOSSplashAssets(path) {

            var files = [{
                path: "iOS/Assets/Default~ipad.png",
                width: 768,
                height: 1004
            }, {
                path: "iOS/Assets/Default@2x~ipad.png",
                width: 1536,
                height: 2008
            }, {
                path: "iOS/Assets/Default-Landscape~ipad.png",
                width: 1024,
                height: 748
            }, {
                path: "iOS/Assets/Default-Landscape@2x~ipad.png",
                width: 2048,
                height: 1496
            }, {
                path: "iOS/Assets/Default-Portrait~ipad.png",
                width: 768,
                height: 1024
            }, {
                path: "iOS/Assets/Default-Portrait@2x~ipad.png",
                width: 1536,
                height: 2048
            }, {
                path: "iOS/Assets/Default-Landscape-768~ipad.png",
                width: 1024,
                height: 768
            }, {
                path: "iOS/Assets/Default-Landscape-768@2x~ipad.png",
                width: 2048,
                height: 1536
            }, {
                path: "iOS/Assets/Default.png",
                width: 320,
                height: 480
            }, {
                path: "iOS/Assets/Default@2x.png",
                width: 640,
                height: 960
            }, {
                path: "iOS/Assets/Default-568h@2x.png",
                width: 640,
                height: 1136
            }];

            ImageAssets.setBar(files.length);

            var promises = [];

            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                promises.push(ImageAssets.resizeSplashImage(path, file.width, file.height, file.path));
            }

            return promises;
        }
    }, {
        key: 'generateIOSIconAssets',
        value: function generateIOSIconAssets(path) {

            var files = [{
                path: "iOS/Assets/Icon.png",
                width: 57,
                height: 57
            }, {
                path: "iOS/Assets/Icon@2x.png",
                width: 114,
                height: 114
            }, {
                path: "iOS/Assets/Icon-120.png",
                width: 120,
                height: 120
            }, {
                path: "iOS/Assets/Icon-72.png",
                width: 72,
                height: 72
            }, {
                path: "iOS/Assets/Icon-72@2x.png",
                width: 144,
                height: 144
            }, {
                path: "iOS/Assets/Icon-76.png",
                width: 76,
                height: 76
            }, {
                path: "iOS/Assets/Icon-76@2x.png",
                width: 152,
                height: 152
            }, {
                path: "iOS/Assets/Icon-Small.png",
                width: 29,
                height: 29
            }, {
                path: "iOS/Assets/Icon-Small@2x.png",
                width: 58,
                height: 58
            }, {
                path: "iOS/Assets/Icon-Small@3x.png",
                width: 87,
                height: 87
            }, {
                path: "iOS/Assets/Icon-40.png",
                width: 40,
                height: 40
            }, {
                path: "iOS/Assets/Icon-40@2x.png",
                width: 80,
                height: 80
            }, {
                path: "iOS/Assets/Icon-50.png",
                width: 50,
                height: 50
            }, {
                path: "iOS/Assets/Icon-50@2x.png",
                width: 100,
                height: 100
            }, {
                path: "iOS/Assets/Icon-60.png",
                width: 60,
                height: 60
            }, {
                path: "iOS/Assets/Icon-60@2x.png",
                width: 120,
                height: 120
            }, {
                path: "iOS/Assets/Icon-60@3x.png",
                width: 180,
                height: 180
            }, {
                path: "iOS/Assets/Icon-Small-50.png",
                width: 50,
                height: 50
            }, {
                path: "iOS/Assets/Icon-Small-50@2x.png",
                width: 100,
                height: 100
            }, {
                path: "iOS/Assets/iTunesArtwork@2x.png",
                width: 1024,
                height: 1024
            }, {
                path: "iOS/Assets/iTunesArtwork.png",
                width: 512,
                height: 512
            }, {
                path: "iOS/Assets/lock-screen.png",
                width: 652,
                height: 652
            }];

            ImageAssets.setBar(files.length);

            var promises = [];

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                promises.push(ImageAssets.resizeIconImage(path, file.width, file.height, file.path));
            }

            return promises;
        }
    }, {
        key: 'generateIOSAssets',
        value: function generateIOSAssets(splash, splashPath, icons, iconsPath) {

            if (typeof splash == "undefined") splash = true;
            if (typeof icons == "undefined") icons = true;

            if (splash) ImageAssets.generateIOSSplashAssets(splashPath);
            if (icons) ImageAssets.generateIOSIconAssets(iconsPath);
        }
    }, {
        key: 'setBar',
        value: function setBar(length) {
            //barLength = barLength + length;

            //bar = new ProgressBar(':bar', {total: barLength});
        }
    }, {
        key: 'incrementBar',
        value: function incrementBar() {
            //if (bar != null) bar.tick();
        }
    }]);

    return ImageAssets;
}();

exports.default = ImageAssets;