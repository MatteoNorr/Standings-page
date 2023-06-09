//query selector
export const qS = (el) => document.querySelector(el);
export const qSA = (el) => document.querySelectorAll(el);

//create element
export const cE = (el, cl, txt) => {
  const element = document.createElement(el);
  element.classList.add(cl);
  element.textContent = txt;

  return element;
};

//random number generator
export const randNumGen = () => Math.floor(Math.random() * 10 + 1);
