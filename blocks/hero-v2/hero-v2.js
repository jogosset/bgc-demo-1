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
 * Reads the block's config rows into a settings object and a 4-item
 * squares array. Every row is a [Label] / [Value] pair; unrecognized
 * labels are ignored so the table can grow without breaking older pages.
 * @param {Element} block The block element
 */
function readConfig(block) {
  const config = {};
  const squares = [{}, {}, {}, {}];

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;
    const label = cells[0].textContent.trim().toLowerCase();
    const valueCell = cells[1];

    const squareMatch = label.match(/^square (\d)$/);
    if (squareMatch) {
      const idx = parseInt(squareMatch[1], 10) - 1;
      if (idx < 0 || idx > 3) return;
      const picture = valueCell.querySelector('picture');
      const colorPara = [...valueCell.querySelectorAll('p')]
        .find((p) => !p.querySelector('picture, img'));
      squares[idx] = {
        color: colorPara ? colorPara.textContent.trim() : '',
        picture: picture || null,
      };
      return;
    }

    switch (label) {
      case 'badge':
      case 'lead':
      case 'tag':
      case 'background color':
      case 'text color':
      case 'mode 1':
      case 'mode 2':
      case 'mode 3':
        config[label] = valueCell.textContent.trim();
        break;
      case 'heading':
        config.headingHTML = valueCell.innerHTML;
        break;
      case 'primary cta':
      case 'secondary cta':
      case 'tertiary cta':
        config[label] = valueCell.querySelector('a');
        break;
      case 'background image':
        config.backgroundPicture = valueCell.querySelector('picture');
        break;
      default:
        break;
    }
  });

  return { config, squares };
}

/**
 * loads and decorates the hero-v2 block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const { config, squares } = readConfig(block);

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

  if (config.headingHTML) {
    const h1 = document.createElement('h1');
    h1.innerHTML = config.headingHTML;
    copy.append(h1);
  }

  if (config.lead) {
    const lead = document.createElement('p');
    lead.className = 'hero-v2-lead';
    lead.textContent = config.lead;
    copy.append(lead);
  }

  const ctaLinks = [config['primary cta'], config['secondary cta'], config['tertiary cta']]
    .filter(Boolean);
  if (ctaLinks.length) {
    const ctaWrap = document.createElement('div');
    ctaWrap.className = 'hero-v2-ctas';
    const styles = ['primary', 'secondary', 'tertiary'];
    ctaLinks.forEach((a, i) => {
      a.className = `hero-v2-btn hero-v2-btn-${styles[i]}`;
      ctaWrap.append(a);
    });
    copy.append(ctaWrap);
  }

  const modes = [config['mode 1'], config['mode 2'], config['mode 3']].filter(Boolean);
  if (modes.length) {
    const modesWrap = document.createElement('div');
    modesWrap.className = 'hero-v2-modes';
    modes.forEach((text) => {
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
  squares.forEach((sq) => {
    const square = document.createElement('div');
    square.className = 'hero-v2-square';
    if (sq.color) square.style.setProperty('--square-color', sq.color);
    if (sq.picture) square.append(optimize(sq.picture, '400'));
    grid.append(square);
  });
  visual.append(grid);

  if (config.tag) {
    const tag = document.createElement('span');
    tag.className = 'hero-v2-tag';
    tag.textContent = config.tag;
    visual.append(tag);
  }

  inner.append(copy, visual);
  block.replaceChildren(inner);

  if (config.backgroundPicture) {
    const bg = optimize(config.backgroundPicture, '1600');
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
