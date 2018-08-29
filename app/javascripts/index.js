import config from './config';
import rand from './lib/rand';
import generateLayer from './lib/generateLayer';

const SIZES = config.SIZES;

const DOM = {
  app: document.getElementById('app'),
};

// - Shuffle rotations
// - Adjust mask sizes
// - Image loading
// - Different modalities (same image)
export default () => {
  const render = () => {
    const size = SIZES[rand(2, SIZES.length)];

    DOM.app.innerHTML = [
      generateLayer({ src: `images/${rand(1, 25)}.jpg`, mask: 'a', size, rotation: 90 }),
      generateLayer({ src: `images/${rand(1, 25)}.jpg`, mask: 'b', size, rotation: 180 }),
      generateLayer({ src: `images/${rand(1, 25)}.jpg`, mask: 'c', size, rotation: 270 }),
      generateLayer({ src: `images/${rand(1, 25)}.jpg`, mask: 'd', size, rotation: 360 }),
    ].join('');
  };

  render();

  document.body.addEventListener('click', render);
};
