import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Re-encodes a picture at a given target width using the shared image
 * optimization helper, keeping the element in place in the DOM.
 * @param {Element} picture The picture element to optimize
 * @param {string} width Target width, passed to createOptimizedPicture
 */
function optimize(picture, width) {
  if (!picture) return picture;
  const img = picture.querySelector('img');
  if (!img) return picture;
  const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width }]);
  picture.replaceWith(optimized);
  return optimized;
}

/**
 * Reads the block's optional settings rows into a config object. Every
 * settings row is a [Label] / [Value] pair; unrecognized labels are
 * ignored. Row 1 (the main content row) is handled separately in
 * decorate() and is NOT part of this scan.
 * @param {Element[]} rows Settings rows (block children after row 1)
 */
function readSettings(rows) {
  const config = {};
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;
    const label = cells[0].textContent.trim().toLowerCase();
    const valueCell = cells[1];
    switch (label) {
      case 'badge':
      case 'tag':
      case 'background color':
      case 'text color':
        config[label] = valueCell.textContent.trim();
        break;
      case 'modes':
        config.modes = [...valueCell.querySelectorAll('p')]
          .map((p) => p.textContent.trim())
          .filter(Boolean);
        break;
      case 'squares':
        config.squarePictures = [...valueCell.querySelectorAll('picture')];
        break;
      case 'square colors':
        config.squareColors = valueCell.textContent.split(',').map((c) => c.trim());
        break;
      default:
        break;
    }
  });
  return config;
}

/**
 * loads and decorates the hero-v2 block
 *
 * Row 1 (required) is the main content row and flows naturally, exactly
 * like the default hero block: a heading (italicize a word/phrase to
 * highlight it in gold), lead paragraph(s), and button links, authored
 * with the site's normal convention — wrap a link in **bold** for a
 * primary (red) button, *italic* for an outline button, or ***bold
 * italic*** for a high-impact (dark) button. Row 1's second cell, if
 * present, holds the section's background image.
 *
 * Rows 2+ are optional [Label] / [Value] settings rows — see README.
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const [contentRow, ...settingsRows] = [...block.children];
  const config = readSettings(settingsRows);

  const [contentCell, imageCell] = contentRow ? [...contentRow.children] : [];
  const backgroundPicture = imageCell ? imageCell.querySelector('picture') : null;

  const inner = document.createElement('div');
  inner.className = 'hero-v2-inner';

  const copy = document.createElement('div');
  copy.className = 'hero-v2-copy';

  if (config.badge) {
    const badge = document.createElement('span');
    badge.className = 'hero-v2-badge';
    badge.textContent = config.badge;
    copy.append(badge);
  }

  if (contentCell) {
    while (contentCell.firstElementChild) copy.append(contentCell.firstElementChild);
  }

  // Style top-level paragraphs that aren't CTA buttons as lead copy.
  [...copy.children]
    .filter((el) => el.tagName === 'P' && !el.classList.contains('button-wrapper'))
    .forEach((p) => p.classList.add('hero-v2-lead'));

  // Group the CTA button paragraphs (converted by the site-wide
  // decorateButtons pass) into one flex row.
  const buttonWrappers = [...copy.children].filter((el) => el.classList.contains('button-wrapper'));
  if (buttonWrappers.length) {
    const ctaWrap = document.createElement('div');
    ctaWrap.className = 'hero-v2-ctas';
    buttonWrappers[0].before(ctaWrap);
    buttonWrappers.forEach((p) => ctaWrap.append(p));
  }

  if (config.modes && config.modes.length) {
    const modesWrap = document.createElement('div');
    modesWrap.className = 'hero-v2-modes';
    config.modes.forEach((text) => {
      const pill = document.createElement('div');
      pill.className = 'hero-v2-mode';
      pill.textContent = text;
      modesWrap.append(pill);
    });
    copy.append(modesWrap);
  }

  const visual = document.createElement('div');
  visual.className = 'hero-v2-visual';
  const grid = document.createElement('div');
  grid.className = 'hero-v2-grid';
  const squarePictures = config.squarePictures || [];
  const squareColors = config.squareColors || [];
  for (let i = 0; i < 4; i += 1) {
    const square = document.createElement('div');
    square.className = 'hero-v2-square';
    if (squareColors[i]) square.style.setProperty('--square-color', squareColors[i]);
    if (squarePictures[i]) square.append(optimize(squarePictures[i], '400'));
    grid.append(square);
  }
  visual.append(grid);

  if (config.tag) {
    const tag = document.createElement('span');
    tag.className = 'hero-v2-tag';
    tag.textContent = config.tag;
    visual.append(tag);
  }

  inner.append(copy, visual);
  block.replaceChildren(inner);

  if (backgroundPicture) {
    const bg = optimize(backgroundPicture, '1600');
    bg.classList.add('hero-v2-bg-image');
    block.prepend(bg);
  }
  if (config['background color']) {
    block.style.setProperty('--hero-v2-background-color', config['background color']);
  }
  if (config['text color']) {
    block.style.setProperty('--hero-v2-text-color', config['text color']);
  }
}
