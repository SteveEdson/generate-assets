var assert = require("assert"),
    ImageAssets = require('../../lib/image-assets'),
    sizeOf = require('image-size'),
    chai = require('chai'),
    expect = chai.expect;

chai.use(require('chai-fs'));

// TODO: Write more tests using chai FS and or node image-size (https://github.com/netroy/image-size)
var baseDir = process.env.PWD;

describe('Core', function() {
  describe('Class funtions', function() {
    it('should throw an error when used as a function', function() {
      expect(ImageAssets).to.throw(TypeError);
    });
  });
});

describe('Resizing', function() {
    describe('iOS', function () {
        it('should create multiple resized assets from the template', function() {

            ImageAssets.createIOSFolders();
            ImageAssets.generateIOSSplashAssets("./sample-splash-template.png");

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
              }
            ];

            for(i = 0; i < files.length; i++) {
                var file = files[i];
                expect(file.path).to.be.a.file();

                var dimensions = sizeOf(file.path);
                expect(dimensions.width).to.equal(file.width);
                expect(dimensions.height).to.equal(file.height);
            }
        });
    });

    describe('Android', function () {
        it('should create multiple resized assets from the template');
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
