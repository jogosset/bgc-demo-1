// Fallback glyphs, used only when a product row has no image — kept for
// backward compatibility with rows authored before images were supported.
const ICONS = {
  peach: '<circle cx="12" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 6c1.5-3 4-3 3-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  tomato: '<circle cx="12" cy="14" r="7.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 7l2 2M16 7l-2 2M12 5l0 2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  shrimp: '<path d="M5 16c0-6 4-11 10-11 2 0 4 1.5 4 3.5S17.5 12 15 12c1.5 1 2 3 1 4.5C14.5 19 8 20 5 16z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  beef: '<path d="M4 15c0-5 3.5-9 9-9 3.9 0 7 2.7 7 6 0 4-4 5-6 5-1 1.5-3 2-4.5 1.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7.5" cy="16.5" r="2.3" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  bread: '<path d="M3 12c0-5 4-9 9-9s9 4 9 9v6H3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  corn: '<ellipse cx="12" cy="13" rx="5" ry="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 6c3-3 7-3 10 0M12 5v16" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  carton: '<path d="M6 8l6-4 6 4v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
};

// Optional trailing config row recognized on top of the normal product rows
// (image/icon + text). Authors add a row reading "Card Background" | "#fff8ec".
// Any row that doesn't match this key is left alone and treated as a product row.
const CONFIG_KEYS = ['card background'];

function buildIcon(name) {
  const key = (name || '').trim().toLowerCase();
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[key] || ''}</svg>`;
}

/**
 * loads and decorates the product-strip block
 * Cells per row: [product image, or an icon name]
 *                [name, price, optional original price, optional badge — one per paragraph]
 * Optional trailing row: "Card Background" | color
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length !== 2) return;
    const key = cells[0].textContent.trim().toLowerCase();
    if (!CONFIG_KEYS.includes(key)) return;
    const value = cells[1].textContent.trim();
    if (value) block.style.setProperty(`--product-strip-${key.replace(' ', '-')}`, value);
    row.remove();
  });

  const scroller = document.createElement('div');
  scroller.className = 'product-strip-scroll';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const [mediaCell, textCell] = cells;
    const mediaImg = mediaCell ? mediaCell.querySelector('img') : null;

    const lines = textCell ? [...textCell.children].filter((el) => el.textContent.trim()) : [];
    const [nameLine, priceLine, ...rest] = lines;

    // Whichever of the (up to two) trailing lines looks like a price
    // ("$3.99") is the original/strikethrough price; the other is the badge.
    let originalPriceText = '';
    let badgeText = '';
    rest.forEach((line) => {
      const text = line.textContent.trim();
      if (/^\$/.test(text)) originalPriceText = text;
      else badgeText = text;
    });

    const card = document.createElement('article');
    card.className = 'product-strip-card';
    card.innerHTML = `
      <div class="product-strip-media">
        ${badgeText ? `<span class="product-strip-badge">${badgeText}</span>` : ''}
        ${mediaImg ? '' : buildIcon(mediaCell ? mediaCell.textContent : '')}
      </div>
      <div class="product-strip-body">
        <h3>${nameLine ? nameLine.textContent.trim() : ''}</h3>
        <p class="product-strip-price">
          ${priceLine ? `<span class="product-strip-price-now">${priceLine.textContent.trim()}</span>` : ''}
          ${originalPriceText ? `<span class="product-strip-price-was">${originalPriceText}</span>` : ''}
        </p>
        <button type="button" class="product-strip-cta">Add to Cart</button>
      </div>
    `;
    if (mediaImg) card.querySelector('.product-strip-media').prepend(mediaCell.querySelector('picture') || mediaImg);
    scroller.append(card);
  });

  block.replaceChildren(scroller);
}
