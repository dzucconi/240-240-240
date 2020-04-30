import parameters from "queryparams";
import imagesLoaded from "imagesloaded";

import { SIZES } from "./config";
import rand from "./lib/rand";
import sample from "./lib/sample";
import generate from "./lib/generate";
import renderNode from "./lib/renderNode";
import loadingIndicator from "./lib/loadingIndicator";
import player from "./lib/player";

window.parameters = parameters;

const init = () => {
  if ("ontouchstart" in document.documentElement) {
    document.body.dataset.touch = true;
  } else {
    document.body.dataset.touch = false;
  }

  const { period: PERIOD } = parameters({
    period: 7500,
  });

  const DOM = {
    app: document.getElementById("app"),
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
    new Promise((resolve) => {
      const img = renderNode(generate.image({ src }));

      DOM.app.appendChild(img);

      const loader = imagesLoaded(img, { background: true });

      loader.on("done", () => {
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

  const modes = [
    (size) =>
      ["a", "b", "c", "d"].map((mask, i) =>
        generate.layer({
          src: STATE.srcs[i],
          mask,
          size,
          rotation: i * 90,
        })
      ),

    (size) =>
      ["a", "b", "c", "d"].map((mask, i) =>
        generate.layer({
          src: STATE.srcs[i],
          mask,
          size,
          rotation: sample([0, 90, 180, 270]),
        })
      ),

    (size) =>
      ["ad", "bc"].map((mask, i) =>
        generate.layer({
          src: STATE.srcs[i],
          mask,
          size,
          rotation: sample([0, 90, 180, 270]),
        })
      ),

    (size) =>
      ["a", "b", "c", "d"].map((mask, i) =>
        generate.layer({
          src: STATE.srcs[0],
          mask,
          size,
          rotation: i * 90,
        })
      ),
  ];

  const render = () => {
    step();

    const layers = sample(modes)(sample(SIZES.slice(0, 10)));

    loadingIndicator.show();

    Promise.all(STATE.srcs.map(load)).then(() => {
      DOM.app.innerHTML = layers.join("");

      loadingIndicator.hide();

      setTimeout(render, PERIOD);
    });
  };

  render();
  player();
};

init();
