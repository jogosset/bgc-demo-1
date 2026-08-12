const ICONS = {
  peach: '<circle cx="12" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 6c1.5-3 4-3 3-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  beef: '<path d="M4 15c0-5 3.5-9 9-9 3.9 0 7 2.7 7 6 0 4-4 5-6 5-1 1.5-3 2-4.5 1.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7.5" cy="16.5" r="2.3" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  shrimp: '<path d="M5 16c0-6 4-11 10-11 2 0 4 1.5 4 3.5S17.5 12 15 12c1.5 1 2 3 1 4.5C14.5 19 8 20 5 16z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  clock: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  users: '<circle cx="9" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="17" cy="8" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M15.5 13c2.6.3 4.5 2.2 4.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
};

const THEMES = {
  green: 'var(--brook-green, #428445)',
  deep: 'var(--brook-green-deep, #35692f)',
  dark: 'var(--brook-ink, #40464b)',
};

function icon(name) {
  const key = (name || '').trim().toLowerCase();
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[key] || ''}</svg>`;
}

/**
 * loads and decorates the recipe-cards block
 * Cells per row: theme, icon, eyebrow, title, description, time, servings
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const list = document.createElement('div');
  list.className = 'recipe-cards-list';

  [...block.children].forEach((row) => {
    const [
      themeCell, iconCell, eyebrowCell, titleCell, descCell, timeCell, servingsCell,
    ] = [...row.children];
    const themeKey = (themeCell ? themeCell.textContent.trim().toLowerCase() : 'green');
    const bg = THEMES[themeKey] || THEMES.green;

    const card = document.createElement('article');
    card.className = 'recipe-cards-card';
    card.innerHTML = `
      <div class="recipe-cards-art" style="background:${bg};">${icon(iconCell ? iconCell.textContent : '')}</div>
      <div class="recipe-cards-body">
        <span class="recipe-cards-eyebrow">${eyebrowCell ? eyebrowCell.textContent.trim() : ''}</span>
        <h3>${titleCell ? titleCell.textContent.trim() : ''}</h3>
        <p>${descCell ? descCell.textContent.trim() : ''}</p>
        <div class="recipe-cards-meta">
          ${timeCell && timeCell.textContent.trim() ? `<span>${icon('clock')}${timeCell.textContent.trim()}</span>` : ''}
          ${servingsCell && servingsCell.textContent.trim() ? `<span>${icon('users')}${servingsCell.textContent.trim()}</span>` : ''}
        </div>
      </div>
    `;
    list.append(card);
  });

  block.replaceChildren(list);
}
