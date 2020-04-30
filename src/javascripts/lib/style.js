import getPrefix from "./getPrefix";

const PREFIX = getPrefix().css;

export default (styles = {}) =>
  Object.keys(styles)
    .map((key) => `${PREFIX}${key}:${styles[key]};${key}:${styles[key]}`)
    .join(";");
