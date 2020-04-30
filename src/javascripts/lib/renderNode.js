export default (html) =>
  new DOMParser().parseFromString(html, "text/html").body.firstChild;
