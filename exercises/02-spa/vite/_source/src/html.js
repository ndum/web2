// Turns the characters that mean something in HTML into plain text,
// so a name like <b>Tent</b> appears as it was typed and never becomes an element
export function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
