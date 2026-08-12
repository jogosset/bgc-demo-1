/**
 * loads and decorates the announcement-bar block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const p = block.querySelector('p') || block;
  p.classList.add('announcement-bar-text');
}
