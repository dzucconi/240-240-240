import parameters from 'queryparams';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
};

const SRCS = [
  'https://atlas-production.s3.amazonaws.com/10329/4976f520a78ad08a6c23d5855639b6842e8b496f01c7d1402d4120d148aa5af1.jpg',
  'https://atlas-production.s3.amazonaws.com/10353/2c22bd812af91623008d92529b12010240b449d35009a1c02d24c20656da7f6c.jpg',
  'https://atlas-production.s3.amazonaws.com/10070/e6a518cfb5db121ef5eb357956297d0a856afefb3416e6fb6e7b760c753c957d.jpg',
];

const generateLayer = ({ src, mask, rotation }) => `
  <div class='Layer' style="-webkit-mask: url(${mask}--50.svg)">
    <img
      src='${src}'
      class='Layer Hue--${rotation}'
    />
  </div>
`;

export default () => {
  DOM.app.innerHTML = `
    ${generateLayer({
      src: SRCS[1],
      mask: 'ad',
      rotation: 360,
    })}

    ${generateLayer({
      src: SRCS[0],
      mask: 'bc',
      rotation: 270,
    })}
  `;
};
