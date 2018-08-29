import getPrefix from './getPrefix';

const PREFIX = getPrefix().css;

export default ({ src, mask, size, rotation }) => {
  const styles = {
    filter: `hue-rotate(${rotation}deg)`,
    mask: `url(svgs/${mask}--${size}.svg)`,
  };

  const style = Object.keys(styles).map(key =>
    `${PREFIX}${key}:${styles[key]};${key}:${styles[key]}`).join(';');

  return `
    <div class='Layer' style='${style}'>
      <div class='Layer__image' style='background-image: url(${src})'></div>
    </div>
  `;
};
