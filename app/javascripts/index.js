import parameters from 'queryparams';

import config from './config';
import getPrefix from './lib/getPrefix';

window.parameters = parameters;

const SIZES = config.SIZES;
const PREFIX = getPrefix().css;

const DOM = {
  app: document.getElementById('app'),
};

const generateLayer = ({ src, mask, size, rotation }) => {
  const styles = {
    filter: `hue-rotate(${rotation}deg)`,
    mask: `url(${mask}--${size}.svg)`,
  };

  const style = Object.keys(styles).map(key =>
    `${PREFIX}${key}:${styles[key]};${key}:${styles[key]}`).join(';');

  return `
    <div class='Layer' style='${style}'>
      <img
        src='${src}'
        class='Layer'
      />
    </div>
  `;
};

export default () => {
  const { size } = parameters({
    size: 7,
  });

  DOM.app.innerHTML = [
    generateLayer({
      src: 'images/8.jpg',
      mask: 'a',
      size: SIZES[size],
      rotation: 0,
    }),

    generateLayer({
      src: 'images/8.jpg',
      mask: 'b',
      size: SIZES[size],
      rotation: 90,
    }),

    generateLayer({
      src: 'images/10.jpg',
      mask: 'c',
      size: SIZES[size],
      rotation: 180,
    }),

    generateLayer({
      src: 'images/8.jpg',
      mask: 'd',
      size: SIZES[size],
      rotation: 270,
    }),
  ].join('');
};
