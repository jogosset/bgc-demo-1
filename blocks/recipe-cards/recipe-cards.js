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

// Icon name implies a default art-panel theme, so authors only need one icon cell.
const ICON_THEME = {
  peach: 'green', beef: 'deep', shrimp: 'dark',
};

// Optional trailing config rows recognized on top of the normal recipe rows
// (icon/image + text). Authors add a row per setting, e.g. a row reading
// "Card Background" | "#fff8ec". Any row that doesn't match one of these
// keys is left alone and treated as a recipe row.
const CONFIG_KEYS = ['card background', 'text color'];

function icon(name) {
  const key = (name || '').trim().toLowerCase();
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[key] || ''}</svg>`;
}

/**
 * loads and decorates the recipe-cards block
 * Cells per row: [icon name, or an image from the assets picker]
 *                [eyebrow, title, description, "time · servings" — one per paragraph]
 * Optional trailing rows: "Card Background" | color, "Text Color" | color
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length !== 2) return;
    const key = cells[0].textContent.trim().toLowerCase();
    if (!CONFIG_KEYS.includes(key)) return;
    const value = cells[1].textContent.trim();
    if (value) block.style.setProperty(`--recipe-cards-${key.replace(' ', '-')}`, value);
    row.remove();
  });

  const list = document.createElement('div');
  list.className = 'recipe-cards-list';

  [...block.children].forEach((row) => {
    const [iconCell, textCell] = [...row.children];
    const iconImg = iconCell ? iconCell.querySelector('img') : null;
    const iconName = (iconCell && !iconImg ? iconCell.textContent.trim().toLowerCase() : '');
    const bg = THEMES[ICON_THEME[iconName]] || THEMES.green;

    const lines = textCell ? [...textCell.children].filter((el) => el.textContent.trim()) : [];
    const [eyebrowLine, titleLine, descLine, metaLine] = lines;
    const [timeText, servingsText] = metaLine
      ? metaLine.textContent.split('·').map((s) => s.trim())
      : [];

    const card = document.createElement('article');
    card.className = 'recipe-cards-card';
    card.innerHTML = `
      <div class="recipe-cards-art"${iconImg ? '' : ` style="background:${bg};"`}>${iconImg ? '' : icon(iconName)}</div>
      <div class="recipe-cards-body">
        <span class="recipe-cards-eyebrow">${eyebrowLine ? eyebrowLine.textContent.trim() : ''}</span>
        <h3>${titleLine ? titleLine.textContent.trim() : ''}</h3>
        <p>${descLine ? descLine.textContent.trim() : ''}</p>
        <div class="recipe-cards-meta">
          ${timeText ? `<span>${icon('clock')}${timeText}</span>` : ''}
          ${servingsText ? `<span>${icon('users')}${servingsText}</span>` : ''}
        </div>
      </div>
    `;
    if (iconImg) card.querySelector('.recipe-cards-art').append(iconCell.querySelector('picture') || iconImg);
    list.append(card);
  });

  block.replaceChildren(list);
}
