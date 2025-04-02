// src/index.ts
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
export {
  generateUBReferenceUrl,
  parseUBReferences,
  replaceUBReferencesWithLinks
};
