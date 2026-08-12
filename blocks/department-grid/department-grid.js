const ICONS = {
  peach: '<circle cx="12" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 6c1.5-3 4-3 3-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  shrimp: '<path d="M5 16c0-6 4-11 10-11 2 0 4 1.5 4 3.5S17.5 12 15 12c1.5 1 2 3 1 4.5C14.5 19 8 20 5 16z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  bread: '<path d="M3 12c0-5 4-9 9-9s9 4 9 9v6H3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  milk: '<path d="M9 3h6l1 4-1.5 2v11a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V9L8 7z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  jar: '<path d="M7 8h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  cup: '<path d="M6 3h12l-1.5 15a2 2 0 0 1-2 1.8H9.5a2 2 0 0 1-2-1.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  flower: '<circle cx="12" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="6" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="18" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  heart: '<path d="M12 20s-7.5-4.6-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2 4.4-9.5 9-9.5 9z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  paw: '<circle cx="7" cy="9" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="6.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="9" r="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7.5 13.5c1-2 2.6-3 4.5-3s3.5 1 4.5 3c1 2-.5 4-4.5 4s-5.5-2-4.5-4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
};

function buildIcon(name) {
  const key = (name || '').trim().toLowerCase();
  return `<span class="department-grid-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[key] || ICONS.jar}</svg></span>`;
}

/**
 * loads and decorates the department-grid block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'department-grid-list';

  [...block.children].forEach((row, i) => {
    const cells = [...row.children];
    const [iconCell, labelCell] = cells;
    const iconName = iconCell ? iconCell.textContent : '';
    const link = labelCell ? labelCell.querySelector('a') : null;

    const li = document.createElement('li');
    li.className = 'department-grid-tile';
    if (i < 2) li.classList.add('department-grid-tile--wide');

    let labelText = '';
    if (link) labelText = link.textContent;
    else if (labelCell) labelText = labelCell.textContent.trim();
    const a = document.createElement('a');
    a.href = link ? link.href : '#';
    a.innerHTML = `${buildIcon(iconName)}<span>${labelText}</span>`;

    li.append(a);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
