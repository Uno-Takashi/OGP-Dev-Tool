import type { OGPTag } from '../../domain/entities/OGPMetadata';

function downloadBlob(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function exportOGPAsJson(tags: OGPTag[]): void {
  const data: Record<string, string> = {};
  for (const tag of tags) {
    if (tag.contentValue !== null) {
      data[tag.ogpType] = tag.contentValue;
    }
  }
  downloadBlob(JSON.stringify(data, null, 2), 'ogp-metadata.json', 'application/json');
}

function escapeAttr(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

export function exportOGPAsHtml(tags: OGPTag[]): void {
  const metaLines = tags
    .filter((tag) => tag.contentValue !== null)
    .map(
      (tag) =>
        `  <meta ${escapeAttr(tag.name)}="${escapeAttr(tag.ogpType)}" ${escapeAttr(tag.content)}="${escapeAttr(tag.contentValue!)}" />`
    );

  const html = [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <meta charset="UTF-8" />',
    ...metaLines,
    '</head>',
    '<body></body>',
    '</html>',
  ].join('\n');

  downloadBlob(html, 'ogp-metadata.html', 'text/html');
}
