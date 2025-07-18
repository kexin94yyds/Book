"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pathWebpack = _interopRequireDefault(require("path-webpack"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Creates a Path object for parsing and manipulation of a path strings
 *
 * Uses a polyfill for Nodejs path: https://nodejs.org/api/path.html
 * @param	{string} pathString	a url string (relative or absolute)
 * @class
 */
class Path {
  constructor(pathString) {
    var protocol;
    var parsed;
    protocol = pathString.indexOf("://");
    if (protocol > -1) {
      pathString = new URL(pathString).pathname;
    }
    parsed = this.parse(pathString);
    this.path = pathString;
    if (this.isDirectory(pathString)) {
      this.directory = pathString;
    } else {
      this.directory = parsed.dir + "/";
    }
    this.filename = parsed.base;
    this.extension = parsed.ext.slice(1);
  }

  /**
   * Parse the path: https://nodejs.org/api/path.html#path_path_parse_path
   * @param	{string} what
   * @returns {object}
   */
  parse(what) {
    return _pathWebpack.default.parse(what);
  }

  /**
   * @param	{string} what
   * @returns {boolean}
   */
  isAbsolute(what) {
    return _pathWebpack.default.isAbsolute(what || this.path);
  }

  /**
   * Check if path ends with a directory
   * @param	{string} what
   * @returns {boolean}
   */
  isDirectory(what) {
    return what.charAt(what.length - 1) === "/";
  }

  /**
   * Resolve a path against the directory of the Path
   *
   * https://nodejs.org/api/path.html#path_path_resolve_paths
   * @param	{string} what
   * @returns {string} resolved
   */
  resolve(what) {
    return _pathWebpack.default.resolve(this.directory, what);
  }

  /**
   * Resolve a path relative to the directory of the Path
   *
   * https://nodejs.org/api/path.html#path_path_relative_from_to
   * @param	{string} what
   * @returns {string} relative
   */
  relative(what) {
    var isAbsolute = what && what.indexOf("://") > -1;
    if (isAbsolute) {
      return what;
    }
    return _pathWebpack.default.relative(this.directory, what);
  }
  splitPath(filename) {
    return this.splitPathRe.exec(filename).slice(1);
  }

  /**
   * Return the path string
   * @returns {string} path
   */
  toString() {
    return this.path;
  }
}
var _default = exports.default = Path;