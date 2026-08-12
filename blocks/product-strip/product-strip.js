const ICONS = {
  peach: '<circle cx="12" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 6c1.5-3 4-3 3-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  tomato: '<circle cx="12" cy="14" r="7.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 7l2 2M16 7l-2 2M12 5l0 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  shrimp: '<path d="M5 16c0-6 4-11 10-11 2 0 4 1.5 4 3.5S17.5 12 15 12c1.5 1 2 3 1 4.5C14.5 19 8 20 5 16z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  beef: '<path d="M4 15c0-5 3.5-9 9-9 3.9 0 7 2.7 7 6 0 4-4 5-6 5-1 1.5-3 2-4.5 1.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7.5" cy="16.5" r="2.3" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  bread: '<path d="M3 12c0-5 4-9 9-9s9 4 9 9v6H3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  corn: '<ellipse cx="12" cy="13" rx="5" ry="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 6c3-3 7-3 10 0M12 5v16" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  carton: '<path d="M6 8l6-4 6 4v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
};

function buildIcon(name) {
  const key = (name || '').trim().toLowerCase();
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[key] || ICONS.jar || ''}</svg>`;
}

/**
 * loads and decorates the product-strip block
 * Cells per row: [icon name] [name, unit, price, optional badge — one per paragraph]
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const scroller = document.createElement('div');
  scroller.className = 'product-strip-scroll';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const [iconCell, textCell] = cells;
    const lines = textCell ? [...textCell.children].filter((el) => el.textContent.trim()) : [];
    const [nameLine, unitLine, priceLine, badgeLine] = lines;
    const badgeText = badgeLine ? badgeLine.textContent.trim() : '';

    const card = document.createElement('article');
    card.className = 'product-strip-card';
    card.innerHTML = `
      ${badgeText ? `<span class="product-strip-badge">${badgeText}</span>` : ''}
      <div class="product-strip-icon">${buildIcon(iconCell ? iconCell.textContent : '')}</div>
      <h3>${nameLine ? nameLine.textContent.trim() : ''}</h3>
      <p class="product-strip-unit">${unitLine ? unitLine.textContent.trim() : ''}</p>
      <p class="product-strip-price">${priceLine ? priceLine.textContent.trim() : ''}</p>
    `;
    scroller.append(card);
  });

  block.replaceChildren(scroller);
}
