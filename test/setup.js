/* setup.js */

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!DOCTYPE html><html><head><meta charset="utf-8"><script>require("source-map-support/source-map-support.js").install()</script><link href="styles.css" rel="stylesheet"></head><body><div id="app"></div><script type="text/javascript" src="renderer.js"></script></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

// Add requestFrameAnimation shim
global.requestAnimationFrame = callback => setTimeout(callback, 0);