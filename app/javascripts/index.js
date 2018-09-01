import imagesLoaded from 'imagesloaded';

import config from './config';
import rand from './lib/rand';
import sample from './lib/sample';
import generate from './lib/generate';
import renderNode from './lib/renderNode';
import loadingIndicator from './lib/loadingIndicator';

const SIZES = config.SIZES;

export default () => {
  const DOM = {
    app: document.getElementById('app'),
    notifications: document.getElementById('notifications'),
  };

  const STATE = {
    srcs: [
      `images/${rand(1, 25)}.jpg`,
      `images/${rand(1, 25)}.jpg`,
      `images/${rand(1, 25)}.jpg`,
      `images/${rand(1, 25)}.jpg`,
    ],
  };

  const load = (src) =>
    new Promise(resolve => {
      const img = renderNode(generate.image({ src }));

      DOM.app.appendChild(img);

      const loader = imagesLoaded(img, { background: true });

      loader.on('done', () => {
        DOM.app.removeChild(img);
        resolve();
      });
    });

  const step = () => {
    STATE.srcs = [
      `images/${rand(1, 25)}.jpg`,
      `images/${rand(1, 25)}.jpg`,
      `images/${rand(1, 25)}.jpg`,
      `images/${rand(1, 25)}.jpg`,
    ];
  };

  const MODES = [
    (size) =>
      ['a', 'b', 'c', 'd'].map((mask, i) =>
        generate.layer({
          src: STATE.srcs[i],
          mask,
          size,
          rotation: i * 90,
        })
      ),

    (size) =>
      ['a', 'b', 'c', 'd'].map((mask, i) =>
        generate.layer({
          src: STATE.srcs[i],
          mask,
          size,
          rotation: sample([0, 90, 180, 270]),
        })
      ),

    (size) =>
      ['ad', 'bc'].map((mask, i) =>
        generate.layer({
          src: STATE.srcs[i],
          mask,
          size,
          rotation: sample([0, 90, 180, 270]),
        })
      ),

    (size) =>
      ['a', 'b', 'c', 'd'].map((mask, i) =>
        generate.layer({
          src: STATE.srcs[0],
          mask,
          size,
          rotation: i * 90
        })
      ),
  ];

  const render = () => {
    step();

    const layers = sample(MODES)(sample(SIZES.slice(0, 10)));

    loadingIndicator.show();

    Promise.all(STATE.srcs.map(load))
      .then(() => {
        DOM.app.innerHTML = layers.join('');

        loadingIndicator.hide();

        setTimeout(render, 5000);
      });
  };

  render();
};
