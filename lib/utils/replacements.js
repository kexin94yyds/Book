"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceBase = replaceBase;
exports.replaceCanonical = replaceCanonical;
exports.replaceLinks = replaceLinks;
exports.replaceMeta = replaceMeta;
exports.substitute = substitute;
var _core = require("./core");
var _url = _interopRequireDefault(require("./url"));
var _path = _interopRequireDefault(require("./path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function replaceBase(doc, section) {
  var base;
  var head;
  var url = section.url;
  var absolute = url.indexOf("://") > -1;
  if (!doc) {
    return;
  }
  head = (0, _core.qs)(doc, "head");
  base = (0, _core.qs)(head, "base");
  if (!base) {
    base = doc.createElement("base");
    head.insertBefore(base, head.firstChild);
  }

  // Fix for Safari crashing if the url doesn't have an origin
  if (!absolute && window && window.location) {
    url = window.location.origin + url;
  }
  base.setAttribute("href", url);
}
function replaceCanonical(doc, section) {
  var head;
  var link;
  var url = section.canonical;
  if (!doc) {
    return;
  }
  head = (0, _core.qs)(doc, "head");
  link = (0, _core.qs)(head, "link[rel='canonical']");
  if (link) {
    link.setAttribute("href", url);
  } else {
    link = doc.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", url);
    head.appendChild(link);
  }
}
function replaceMeta(doc, section) {
  var head;
  var meta;
  var id = section.idref;
  if (!doc) {
    return;
  }
  head = (0, _core.qs)(doc, "head");
  meta = (0, _core.qs)(head, "link[property='dc.identifier']");
  if (meta) {
    meta.setAttribute("content", id);
  } else {
    meta = doc.createElement("meta");
    meta.setAttribute("name", "dc.identifier");
    meta.setAttribute("content", id);
    head.appendChild(meta);
  }
}

// TODO: move me to Contents
function replaceLinks(contents, fn) {
  var links = contents.querySelectorAll("a[href]");
  if (!links.length) {
    return;
  }
  var base = (0, _core.qs)(contents.ownerDocument, "base");
  var location = base ? base.getAttribute("href") : undefined;
  var replaceLink = function (link) {
    var href = link.getAttribute("href");
    if (href.indexOf("mailto:") === 0) {
      return;
    }
    var absolute = href.indexOf("://") > -1;
    if (absolute) {
      link.setAttribute("target", "_blank");
    } else {
      var linkUrl;
      try {
        linkUrl = new _url.default(href, location);
      } catch (error) {
        // NOOP
      }
      link.onclick = function () {
        if (linkUrl && linkUrl.hash) {
          fn(linkUrl.Path.path + linkUrl.hash);
        } else if (linkUrl) {
          fn(linkUrl.Path.path);
        } else {
          fn(href);
        }
        return false;
      };
    }
  }.bind(this);
  for (var i = 0; i < links.length; i++) {
    replaceLink(links[i]);
  }
}
function substitute(content, urls, replacements) {
  urls.forEach(function (url, i) {
    if (url && replacements[i]) {
      // Account for special characters in the file name.
      // See https://stackoverflow.com/a/6318729.
      url = url.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      content = content.replace(new RegExp(url, "g"), replacements[i]);
    }
  });
  return content;
}