// Optional trailing config rows recognized on top of the normal hero content
// (picture, heading, paragraphs, CTA link). Authors add a row per setting,
// e.g. a row reading "Background Color" | "#35692f". Any row that doesn't
// match one of these keys is left alone and rendered as regular content.
const CONFIG_KEYS = ['background color', 'text color'];

/**
 * loads and decorates the hero block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length !== 2) return;
    const key = cells[0].textContent.trim().toLowerCase();
    if (!CONFIG_KEYS.includes(key)) return;
    const value = cells[1].textContent.trim();
    if (value) block.style.setProperty(`--hero-${key.replace(' ', '-')}`, value);
    row.remove();
  });
}
