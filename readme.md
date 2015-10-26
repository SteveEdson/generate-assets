[![Build Status](https://travis-ci.org/SteveEdson/generate-assets.svg?branch=master)](https://travis-ci.org/SteveEdson/generate-assets)
[![Coverage
Status](https://coveralls.io/repos/SteveEdson/generate-assets/badge.svg?branch=master&service=github)](https://coveralls.io/github/SteveEdson/generate-assets?branch=master)

# Mobile App Image Generator

To use, install and run `$ generate_assets` from a directory containing `splash_template.png` and `icon_template.png`. Assets will be created in *Android* and *iOS* folders.

## Requirements (Mac)

The following requirements are required for *Sharp* (the image processor).

Install libvips via homebrew:

`brew install homebrew/science/vips --with-webp --with-graphicsmagick`

A missing or incorrectly configured Xcode Command Line Tools installation can lead to a library not found for -ljpeg error. If so, please try: `xcode-select --install`.

The gettext dependency of libvips can lead to a library not found for -lintl error. If so, please try `brew link gettext --force`.

**For other platforms, see the [Sharp documentation](http://sharp.dimens.io/en/stable/install/)**

## Usage

### CLI

Create a folder containing `splash_template.png` and `icon_template.png`. Run the command `generate_assets` and follow the instructions.

### Library

The library can be used directly by requiring the `image-assets` lib.

Examples include `ImageAssets.generateAndroidSplashAssets(path);`
