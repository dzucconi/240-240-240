import parameters from 'queryparams';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
};

const SRCS = [
  'https://atlas-production.s3.amazonaws.com/10329/4976f520a78ad08a6c23d5855639b6842e8b496f01c7d1402d4120d148aa5af1.jpg',
  'https://atlas-production.s3.amazonaws.com/10353/2c22bd812af91623008d92529b12010240b449d35009a1c02d24c20656da7f6c.jpg',
];

export default () => {
  const img = new Image;
  img.src = SRCS[0];
  img.classList.add('mask--a');
  img.classList.add('hue--90');

  const img2 = new Image;
  img2.src = SRCS[1];
  img2.classList.add('mask--b');
  img2.classList.add('hue--360');

  DOM.app.appendChild(img);
  DOM.app.appendChild(img2);
};
