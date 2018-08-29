import imagesLoaded from 'imagesloaded';

import config from './config';
import rand from './lib/rand';
import generate from './lib/generate';

const SIZES = config.SIZES;

const DOM = {
  app: document.getElementById('app'),
};

// - Shuffle rotations
// - Adjust mask sizes
// - Different modalities (same image)
export default () => {
  const render = () => {
    const size = SIZES[rand(2, SIZES.length)];
    const layers = [
      generate.layer({ mask: 'a', size, rotation: 0 }),
      generate.layer({ mask: 'b', size, rotation: 90 }),
      generate.layer({ mask: 'c', size, rotation: 180 }),
      generate.layer({ mask: 'd', size, rotation: 270 }),
    ];

    const images = [
      generate.image({ src: `images/${rand(1, 25)}.jpg` }),
      generate.image({ src: `images/${rand(1, 25)}.jpg` }),
      generate.image({ src: `images/${rand(1, 25)}.jpg` }),
      generate.image({ src: `images/${rand(1, 25)}.jpg` }),
    ];

    DOM.app.innerHTML = images.join('');

    const imageLoader = imagesLoaded('.Layer__image', { background: true });

    imageLoader.on('done', () => {
      console.log('image:done')
    });
  };

  render();

  document.body.addEventListener('click', render);
};
