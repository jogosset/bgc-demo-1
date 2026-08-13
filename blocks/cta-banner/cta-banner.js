// Optional trailing config row recognized on top of the normal content row
// (copy + CTA link). Authors add a row reading "Background Color" | "#40464b".
const CONFIG_KEYS = ['background color'];

/**
 * loads and decorates the cta-banner block
 * Row 1 cells: [copy: heading + paragraph] [cta link]
 * Optional trailing row: "Background Color" | color
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  [...block.children].slice(1).forEach((row) => {
    const cells = [...row.children];
    if (cells.length !== 2) return;
    const key = cells[0].textContent.trim().toLowerCase();
    if (!CONFIG_KEYS.includes(key)) return;
    const value = cells[1].textContent.trim();
    if (value) block.style.setProperty(`--cta-banner-${key.replace(' ', '-')}`, value);
    row.remove();
  });

  const row = block.firstElementChild;
  if (!row) return;
  const [copyCell, ctaCell] = [...row.children];

  if (copyCell) copyCell.className = 'cta-banner-copy';

  const link = ctaCell ? ctaCell.querySelector('a') : null;
  if (link) {
    link.classList.add('cta-banner-cta');
    ctaCell.className = 'cta-banner-action';
  }

  row.className = 'cta-banner-row';
}
