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
        it('should create multiple resized assets from the template', function(done) {

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

                for(i = 0; i < files.length; i++) {
                    var file = files[i];
                    expect(file.path).to.be.a.file();

                    var dimensions = sizeOf(file.path);
                    expect(dimensions.width).to.equal(file.width);
                    expect(dimensions.height).to.equal(file.height);
                }

                done();
                
            }, function(value) {
                console.log("Something else " + value);
            });
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
