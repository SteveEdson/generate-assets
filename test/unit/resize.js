var assert = require("assert"),
    ImageAssets = require('../../lib/image-assets'),
    sizeOf = require('image-size'),
    rimraf = require('rimraf'),
    chai = require('chai'),
    expect = chai.expect;

chai.use(require('chai-fs'));

// TODO: Write more tests using chai FS and or node image-size (https://github.com/netroy/image-size)
var baseDir = process.env.PWD;

// Delete folders before running
before(function() {
    rimraf.sync(baseDir + "/iOS/");
    rimraf.sync(baseDir + "/Android/");
});

describe('Core', function() {
    describe('Class functions', function() {
        it('should throw an error when used as a function', function() {
            expect(ImageAssets).to.throw(TypeError);
        });
    });
});

describe('Setup', function() {
    describe('iOS Folders', function () {
        it('should create the necessary iOS directory structure', function() {
            // Create the folders
            ImageAssets.createIOSFolders();

            expect(baseDir + "/iOS/Assets").to.be.a.directory();
        });
    });

    describe('Android Folders', function () {
        it('should create the necessary Android directory structure', function() {
            // Create the folders
            ImageAssets.createAndroidFolders();

            expect(baseDir + "/Android/res/drawable-ldpi").to.be.a.directory();
            expect(baseDir + "/Android/res/drawable-mdpi").to.be.a.directory();
            expect(baseDir + "/Android/res/drawable-hdpi").to.be.a.directory();
            expect(baseDir + "/Android/res/drawable-xhdpi").to.be.a.directory();
            expect(baseDir + "/Android/res/drawable-xxhdpi").to.be.a.directory();
            expect(baseDir + "/Android/res/drawable-xxxhdpi").to.be.a.directory();
        });
    });
});

describe('Resizing', function() {
    describe('iOS splash template', function () {
        it('should create multiple resized assets with the correct sizes', function(done) {

            var files = [
                {
                    "path": baseDir + "/iOS/Assets/Default~ipad.png",
                    "width": 768,
                    "height": 1004
                },
                {
                    "path": baseDir + "/iOS/Assets/Default@2x~ipad.png",
                    "width": 1536,
                    "height": 2008
                },
                {
                    "path": baseDir + "/iOS/Assets/Default-Landscape~ipad.png",
                    "width": 1024,
                    "height": 748
                },
                {
                    "path": baseDir + "/iOS/Assets/Default-Landscape@2x~ipad.png",
                    "width": 2048,
                    "height": 1496
                },
                {
                    "path": baseDir + "/iOS/Assets/Default-Portrait~ipad.png",
                    "width": 768,
                    "height": 1024
                },
                {
                    "path": baseDir + "/iOS/Assets/Default-Portrait@2x~ipad.png",
                    "width": 1536,
                    "height": 2048
                },
                {
                    "path": baseDir + "/iOS/Assets/Default-Landscape-768~ipad.png",
                    "width": 1024,
                    "height": 768
                },
                {
                    "path": baseDir + "/iOS/Assets/Default-Landscape-768@2x~ipad.png",
                    "width": 2048,
                    "height": 1536
                },
                {
                    "path": baseDir + "/iOS/Assets/Default.png",
                    "width": 320,
                    "height": 480
                },
                {
                    "path": baseDir + "/iOS/Assets/Default@2x.png",
                    "width": 640,
                    "height": 960
                },
                {
                    "path": baseDir + "/iOS/Assets/Default-568h@2x.png",
                    "width": 640,
                    "height": 1136
                }
            ];

            ImageAssets.createIOSFolders();
            var promises = ImageAssets.generateIOSSplashAssets(__dirname + "/sample-splash-template.png");

            Promise.all(promises).then(function() {

                for(var i = 0; i < files.length; i++) {
                    var file = files[i];
                    expect(file.path).to.be.a.file();

                    var dimensions = sizeOf(file.path);
                    expect(dimensions.width).to.equal(file.width);
                    expect(dimensions.height).to.equal(file.height);
                }

                done();

            }, function(value) {
                throw Error(value);
            });
        });
    });

    describe('iOS icons template', function () {
        it('should create multiple resized assets with the correct sizes', function(done) {

            var files = [
                {
                    path: baseDir + "/iOS/Assets/Icon.png",
                    width: 57,
                    height: 57
                },
                {
                    path: baseDir + "/iOS/Assets/Icon@2x.png",
                    width: 114,
                    height: 114
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-120.png",
                    width: 120,
                    height: 120
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-72.png",
                    width: 72,
                    height: 72
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-72@2x.png",
                    width: 144,
                    height: 144
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-76.png",
                    width: 76,
                    height: 76
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-76@2x.png",
                    width: 152,
                    height: 152
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-Small.png",
                    width: 29,
                    height: 29
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-Small@2x.png",
                    width: 58,
                    height: 58
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-40.png",
                    width: 40,
                    height: 40
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-40@2x.png",
                    width: 80,
                    height: 80
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-Small-50.png",
                    width: 50,
                    height: 50
                },
                {
                    path: baseDir + "/iOS/Assets/Icon-Small-50@2x.png",
                    width: 100,
                    height: 100
                },
                {
                    path: baseDir + "/iOS/Assets/iTunesArtwork@2x.png",
                    width: 1024,
                    height: 1024
                },
                {
                    path: baseDir + "/iOS/Assets/iTunesArtwork.png",
                    width: 512,
                    height: 512
                },
                {
                    path: baseDir + "/iOS/Assets/lock-screen.png",
                    width: 652,
                    height: 652
                }
            ];

            ImageAssets.createIOSFolders();
            var promises = ImageAssets.generateIOSIconAssets(__dirname + "/sample-icon-template.png");

            Promise.all(promises).then(function() {

                for(var i = 0; i < files.length; i++) {
                    var file = files[i];
                    expect(file.path).to.be.a.file();

                    var dimensions = sizeOf(file.path);
                    expect(dimensions.width).to.equal(file.width);
                    expect(dimensions.height).to.equal(file.height);
                }

                done();

            }, function(value) {
                throw Error(value);
            });
        });
    });

    describe('Android splash template', function () {
        it('should create multiple resized assets with the correct sizes', function(done) {

            this.timeout(30000);

            var files = [
                {
                    path: baseDir + "/Android/res/drawable-mdpi/splash.png",
                    width: 1024,
                    height: 1024
                },
                {
                    path: baseDir + "/Android/res/drawable-hdpi/splash.png",
                    width: 1024,
                    height: 1024
                },
                {
                    path: baseDir + "/Android/res/drawable-ldpi/splash.png",
                    width: 512,
                    height: 512
                },
                {
                    path: baseDir + "/Android/res/drawable-xhdpi/splash.png",
                    width: 2048,
                    height: 2048
                },
                {
                    path: baseDir + "/Android/res/drawable-xxhdpi/splash.png",
                    width: 2048,
                    height: 2048
                },
                {
                    path: baseDir + "/Android/res/drawable-xxxhdpi/splash.png",
                    width: 2048,
                    height: 2048
                },
                {
                    path: baseDir + "/Android/feature_graphic.png",
                    width: 1024,
                    height: 500
                }
            ];

            ImageAssets.createAndroidFolders();
            var promises = ImageAssets.generateAndroidSplashAssets(__dirname + "/sample-splash-template.png");

            Promise.all(promises).then(function() {

                for(var i = 0; i < files.length; i++) {
                    var file = files[i];

                    expect(file.path).to.be.a.file();

                    var dimensions = sizeOf(file.path);
                    expect(dimensions.width).to.equal(file.width);
                    expect(dimensions.height).to.equal(file.height);
                }

                done();

            }, function(value) {
                throw Error(value);
            });
        });
    });

    describe('Android icons template', function () {
        it('should create multiple resized assets with the correct sizes', function(done) {

            var files = [
                {
                    path: baseDir + "/Android/res/drawable-ldpi/ic_launcher.png",
                    width: 36,
                    height: 36
                },
                {
                    path: baseDir + "/Android/res/drawable-mdpi/ic_launcher.png",
                    width: 48,
                    height: 48
                },
                {
                    path: baseDir + "/Android/res/drawable-hdpi/ic_launcher.png",
                    width: 72,
                    height: 72
                },
                {
                    path: baseDir + "/Android/res/drawable-xhdpi/ic_launcher.png",
                    width: 96,
                    height: 96
                },
                {
                    path: baseDir + "/Android/res/drawable-xxhdpi/ic_launcher.png",
                    width: 144,
                    height: 144
                },
                {
                    path: baseDir + "/Android/res/drawable-xxxhdpi/ic_launcher.png",
                    width: 192,
                    height: 192
                },
                {
                    path: baseDir + "/Android/web_icon.png",
                    width: 512,
                    height: 512
                },
            ];

            ImageAssets.createAndroidFolders();
            var promises = ImageAssets.generateAndroidIconAssets(__dirname + "/sample-icon-template.png");

            Promise.all(promises).then(function() {

                for(var i = 0; i < files.length; i++) {
                    var file = files[i];
                    expect(file.path).to.be.a.file();

                    var dimensions = sizeOf(file.path);
                    expect(dimensions.width).to.equal(file.width);
                    expect(dimensions.height).to.equal(file.height);
                }

                done();

            }, function(value) {
                throw Error(value);
            });
        });
    });
});

