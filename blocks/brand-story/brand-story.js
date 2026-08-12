/**
 * loads and decorates the brand-story block
 * Row 1: [badge year] [rich copy: heading + paragraphs]
 * Rows 2+: [stat value] [stat label]
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const [introRow, ...statRows] = rows;
  const [yearCell, copyCell] = introRow ? [...introRow.children] : [];
  const year = yearCell ? yearCell.textContent.trim() : '';

  const wrap = document.createElement('div');
  wrap.className = 'brand-story-inner';

  const seal = document.createElement('div');
  seal.className = 'brand-story-seal';
  seal.innerHTML = `
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>
    <span class="brand-story-seal-year">${year}</span>
  `;

  const copy = document.createElement('div');
  copy.className = 'brand-story-copy';
  if (copyCell) copy.append(...copyCell.childNodes);

  if (statRows.length) {
    const stats = document.createElement('div');
    stats.className = 'brand-story-stats';
    statRows.forEach((row) => {
      const [valueCell, labelCell] = [...row.children];
      const stat = document.createElement('div');
      stat.innerHTML = `<strong>${valueCell ? valueCell.textContent.trim() : ''}</strong><span>${labelCell ? labelCell.textContent.trim() : ''}</span>`;
      stats.append(stat);
    });
    copy.append(stats);
  }

  wrap.append(seal, copy);
  block.replaceChildren(wrap);
}
