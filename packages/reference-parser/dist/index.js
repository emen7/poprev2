"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  generateUBReferenceUrl: () => generateUBReferenceUrl,
  parseUBReferences: () => parseUBReferences,
  replaceUBReferencesWithLinks: () => replaceUBReferencesWithLinks
});
module.exports = __toCommonJS(src_exports);
function parseUBReferences(text) {
  const references = [];
  const paperSectionPattern = /Paper\s+(\d+),\s+Section\s+(\d+)/gi;
  let match;
  while ((match = paperSectionPattern.exec(text)) !== null) {
    references.push({
      type: "paper-section",
      paper: parseInt(match[1], 10),
      section: parseInt(match[2], 10),
      originalText: match[0],
      position: {
        start: match.index,
        end: match.index + match[0].length
      }
    });
  }
  const shortPattern = /\b(\d+):(\d+)\b/g;
  while ((match = shortPattern.exec(text)) !== null) {
    references.push({
      type: "paper-section",
      paper: parseInt(match[1], 10),
      section: parseInt(match[2], 10),
      originalText: match[0],
      position: {
        start: match.index,
        end: match.index + match[0].length
      }
    });
  }
  return references;
}
function generateUBReferenceUrl(reference, baseUrl = "/reader") {
  return `${baseUrl}/paper/${reference.paper}/section/${reference.section}`;
}
function replaceUBReferencesWithLinks(text, baseUrl = "/reader") {
  const references = parseUBReferences(text);
  references.sort((a, b) => b.position.start - a.position.start);
  let result = text;
  for (const ref of references) {
    const url = generateUBReferenceUrl(ref, baseUrl);
    const link = `<a href="${url}" class="ub-reference">${ref.originalText}</a>`;
    result = result.substring(0, ref.position.start) + link + result.substring(ref.position.end);
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateUBReferenceUrl,
  parseUBReferences,
  replaceUBReferencesWithLinks
});
