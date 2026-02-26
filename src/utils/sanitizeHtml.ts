import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content from TipTap editor or WordPress-migrated content.
 * Decodes HTML entities (TipTap may double-encode) then runs DOMPurify.
 */
export function sanitizeHtml(html: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return DOMPurify.sanitize(textarea.value, {
    ADD_TAGS: ['iframe', 'style'],
    ADD_ATTR: [
      'style',
      'allow',
      'allowfullscreen',
      'frameborder',
      'scrolling',
      'loading',
      'referrerpolicy',
    ],
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
}
