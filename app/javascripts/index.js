import parameters from 'queryparams';
import getPrefix from './lib/getPrefix';

window.parameters = parameters;

const PREFIX = getPrefix().css;

const DOM = {
  app: document.getElementById('app'),
};

const SRCS = [
  'https://atlas-production.s3.amazonaws.com/10329/4976f520a78ad08a6c23d5855639b6842e8b496f01c7d1402d4120d148aa5af1.jpg',
  'https://atlas-production.s3.amazonaws.com/10353/2c22bd812af91623008d92529b12010240b449d35009a1c02d24c20656da7f6c.jpg',
  'https://atlas-production.s3.amazonaws.com/10070/e6a518cfb5db121ef5eb357956297d0a856afefb3416e6fb6e7b760c753c957d.jpg',
];

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
  `
};

export default () => {
  DOM.app.innerHTML = `
    ${generateLayer({
      src: SRCS[1],
      mask: 'ad',
      size: 50,
      rotation: 360,
    })}

    ${generateLayer({
      src: SRCS[0],
      mask: 'bc',
      size: 50,
      rotation: 270,
    })}
  `;
};
