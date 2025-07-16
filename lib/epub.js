"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _book = _interopRequireDefault(require("./book"));
var _rendition = _interopRequireDefault(require("./rendition"));
var _epubcfi = _interopRequireDefault(require("./epubcfi"));
var _contents = _interopRequireDefault(require("./contents"));
var utils = _interopRequireWildcard(require("./utils/core"));
var _constants = require("./utils/constants");
var _iframe = _interopRequireDefault(require("./managers/views/iframe"));
var _default2 = _interopRequireDefault(require("./managers/default"));
var _continuous = _interopRequireDefault(require("./managers/continuous"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Creates a new Book
 * @param {string|ArrayBuffer} url URL, Path or ArrayBuffer
 * @param {object} options to pass to the book
 * @returns {Book} a new Book object
 * @example ePub("/path/to/book.epub", {})
 */
function ePub(url, options) {
  return new _book.default(url, options);
}
ePub.VERSION = _constants.EPUBJS_VERSION;
if (typeof global !== "undefined") {
  global.EPUBJS_VERSION = _constants.EPUBJS_VERSION;
}
ePub.Book = _book.default;
ePub.Rendition = _rendition.default;
ePub.Contents = _contents.default;
ePub.CFI = _epubcfi.default;
ePub.utils = utils;
var _default = exports.default = ePub;