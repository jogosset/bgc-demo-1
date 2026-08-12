/**
 * loads and decorates the cta-banner block
 * Row cells: [copy: heading + paragraph] [cta link]
 * @param {Element} block The block element
 */
export default async function decorate(block) {
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
