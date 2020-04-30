import renderNode from "./renderNode";

const el = renderNode('<div class="Indicator"></div>');

export default {
  el,
  show: () => document.body.appendChild(el),
  hide: () => document.body.removeChild(el),
};
