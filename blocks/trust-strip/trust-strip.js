const ICONS = {
  truck: '<path d="M2 7h11v9H2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13 10h4l4 3.5V16h-8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="1.7" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="18" r="1.7" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  map: '<path d="M9 4L3 6.5v13L9 17l6 3 6-2.5v-13L15 7 9 4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 4v13M15 7v13" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  tag: '<path d="M11.3 3H4v7.3L14.5 20.8a1.5 1.5 0 0 0 2.1 0l4.2-4.2a1.5 1.5 0 0 0 0-2.1L11.3 3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="8.2" cy="7.2" r="1.4" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  star: '<path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20l1.4-6.3-4.8-4.3 6.4-.6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
};

function buildIcon(name) {
  const wrap = document.createElement('span');
  wrap.className = 'trust-strip-icon';
  const key = (name || '').trim().toLowerCase();
  wrap.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[key] || ICONS.star}</svg>`;
  return wrap;
}

/**
 * loads and decorates the trust-strip block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const [iconCell, headingCell, bodyCell] = cells;
    const iconName = iconCell ? iconCell.textContent : '';
    const item = document.createElement('div');
    item.className = 'trust-strip-item';
    item.append(buildIcon(iconName));

    const text = document.createElement('div');
    text.className = 'trust-strip-text';
    if (headingCell) {
      const h3 = document.createElement('h3');
      h3.textContent = headingCell.textContent.trim();
      text.append(h3);
    }
    if (bodyCell) {
      const p = document.createElement('p');
      p.textContent = bodyCell.textContent.trim();
      text.append(p);
    }
    item.append(text);
    row.replaceChildren(item);
    row.className = 'trust-strip-row';
  });
}
