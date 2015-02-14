var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

var VNode = require('virtual-dom/vnode/vnode');
var VText = require('virtual-dom/vnode/vtext');
var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
});

var vTrees = {};

var Reactize = {
  version: "0.0.3"
};

Reactize.initialize = function(element) {
  var vTree = convertHTML(element.innerHTML.trim());
  vTrees[element.id] = vTree;
};

Reactize.applyDiff = function(replacementElement, targetElement) {
  var replacementVtree = convertHTML(replacementElement.innerHTML.trim());
  var patches = diff(vTrees[targetElement.id], replacementVtree);
  targetElement = patch(targetElement, patches);
  vTrees[targetElement.id] = replacementVtree;
};

Reactize.applyDiffFromHTMLString = function(htmlString, targetElement) {
    var replacementVtree = convertHTML(htmlString.trim());
    var replacementElement = createElement(replacementVtree);
    Reactize.applyDiff(replacementElement, targetElement);
  };

module.exports = global.Reactize = Reactize;