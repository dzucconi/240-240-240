import rand from "./rand";

export default (xs) => xs[rand(0, xs.length)];
