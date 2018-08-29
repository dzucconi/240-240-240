import config from './config';
import getPrefix from './lib/getPrefix';

const SIZES = config.SIZES;
const PREFIX = getPrefix().css;

const DOM = {
  app: document.getElementById('app'),
};

const rand = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const generateLayer = ({ src, mask, size, rotation }) => {
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

export default () => {
  const render = () => {
    const size = SIZES[rand(2, SIZES.length)];

    DOM.app.innerHTML = [
      generateLayer({ src: `images/${rand(1, 25)}.jpg`, mask: 'a', size, rotation: 0 }),
      generateLayer({ src: `images/${rand(1, 25)}.jpg`, mask: 'b', size, rotation: 90 }),
      generateLayer({ src: `images/${rand(1, 25)}.jpg`, mask: 'c', size, rotation: 180 }),
      generateLayer({ src: `images/${rand(1, 25)}.jpg`, mask: 'd', size, rotation: 270 }),
    ].join('');
  };

  render();

  document.body.addEventListener('click', render);
};
