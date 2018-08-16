import parameters from 'queryparams';

window.parameters = parameters;

const DOM = {
  app: document.getElementById('app'),
};

export default () => {
  const { message } = parameters({ message: 'Hello' });

  DOM.app.innerHTML = message;
};
