var assert = require("assert"),
    ImageAssets = require('../../lib/image-assets'),
    chai = require('chai');

chai.use(require('chai-fs'));

// TODO: Write more tests using chai FS and or node image-size (https://github.com/netroy/image-size)
var baseDir = process.env.PWD;

describe('Resizing', function() {
    describe('iOS', function () {
        it('should create multiple resized assets from the template');
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
