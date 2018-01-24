# Electric IRC
[![Coverage Status](https://coveralls.io/repos/github/aszecsei/electric-irc/badge.svg?branch=master)](https://coveralls.io/github/aszecsei/electric-irc?branch=master)

**Electric IRC** leverages TypeScript, React, and Electron to create a native IRC client. Below, I'll write a few notes that relate to this project and to its technologies.

## Yarn
This project uses the [yarn](https://yarnpkg.com/en/) package manager. Yarn has several benefits over NPM, the most relevant of which is a lockfile and easy dependency deletions/additions.

## TypeScript
[TypeScript](https://www.typescriptlang.org) is a statically-typed extension of JavaScript. It uses `.ts` extensions.

Often times, external modules will not have TypeScript definitions in place. In order to use these modules, you might:
1. Find an external module definition through [DefinitelyTyped](http://definitelytyped.org) and add the typing as a dependency, or
2. Create your own typing in the `@types` folder in the root of this directory if necessary (this is incredibly not-fun and should probably be avoided).

## React
[React](https://reactjs.org) is a library for component-based UI design. It uses `.jsx` extensions normally, but when using TypeScript these are `.tsx` extensions. Most tutorials use the JavaScript version, but it should be relatively straightforward to translate into TypeScript.

## Electron
[Electron](https://electronjs.org) builds cross-platform, native applications using a web back-end. Visual Studio Code, Atom, Discord, and Slack are all built using it, to name a few.

## SCSS
[SCSS](http://sass-lang.com) is a CSS extension that allows for some nifty things like variables. The styling is split up into multiple folders, which are all eventually imported into a single main SCSS file.

One SCSS file should be created per component, and each SCSS file should aim to use as few magic numbers/colors as possible, preferring to use and re-use variables across the entire application.

## WebPack
This project uses WebPack behind the scenes. If the configuration needs to be edited, it **will** be a rough time, because WebPack is dense and awful. The configuration *can* be edited if we need to, but...it should be avoided if at all possible.

## Electric IRC
To run this project in a development environment, use `yarn start`. This will open up Electron and load the app through a test server.

To package this app,use `yarn dist`. This compiles the application into a native executable, as well as generates an installer for the application.

# Testing
This app uses [Spectron](https://electronjs.org/spectron) along with [Mocha](https://mochajs.org), [Chai](http://chaijs.com), and [Sinon](sinonjs.org/) (using [Sinon-Chai](https://github.com/domenic/sinon-chai)). I haven't quite figured out the setup for Spectron yet - if you want to test electron integration (as opposed to React components/web logic) this will take some effort.

All test files should be placed within the `test` folder and have the extension `*.spec.ts` or `*.spec.tsx`.

[Istanbul](https://istanbul.js.org) is used for code coverage. Running `yarn test` will go through all tests and generate a code coverage report. Note that this may include irrelevant JavaScript files - add these folders or files to the `package.json` in the `nyc.exclude` array.

Until we get Spectron figured out, I've removed all of our "main" files from Istanbul's code coverage metrics, as we can't effectively unit-test them.