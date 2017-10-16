# Tab Manager v2

[![CircleCI](https://circleci.com/gh/xcv58/Tab-Manager-v2.svg?style=svg)](https://circleci.com/gh/xcv58/Tab-Manager-v2)
[![Build Status](https://travis-ci.org/xcv58/Tab-Manager-v2.svg?branch=master)](https://travis-ci.org/xcv58/Tab-Manager-v2)
[![dependencies Status](https://david-dm.org/xcv58/Tab-Manager-v2/status.svg)](https://david-dm.org/xcv58/Tab-Manager-v2)
[![devDependencies Status](https://david-dm.org/xcv58/Tab-Manager-v2/dev-status.svg)](https://david-dm.org/xcv58/Tab-Manager-v2?type=dev)

[![Maintainability](https://api.codeclimate.com/v1/badges/37ba8a86e2a74b36c2a8/maintainability)](https://codeclimate.com/github/xcv58/Tab-Manager-v2/maintainability)


[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Chrome Web Store: https://xcv58.xyz/tabs

Tab Manager v2 is Chrome Extension that helps you manage your opend Chrome tabs easily. It's a forked version of https://github.com/joshperry/Tab-Manager. The Tab Manager v2 is rewritten by React, MobX with ES2017, and has different features with original Tab Manager.


# Usage

There is a playlist contains how to videos: https://www.youtube.com/playlist?list=PLtWVZzutpoqLdwaoAVhQPGCXU9sLwT3S7

# Development

You should be familiar with [React](https://facebook.github.io/react/), [MobX](https://mobx.js.org/), and [Chrome Extension API](https://developers.chrome.com/extensions/api_index) to develop this extension.

You should run below commands after clone this repo:

```shell
yarn
yarn start
```

Then you can load the `build/` folder in chrome://extensions page, please follow the [Load the extension](https://developers.chrome.com/extensions/getstarted#unpacked).

## Test

```shell
yarn test
```

## Packaging

```shell
yarn deploy
```

# Distribute

Follow the official guide to distribute extension: https://developers.chrome.com/extensions/hosting.
