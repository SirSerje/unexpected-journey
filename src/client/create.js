function createButton (name, where = document.querySelector('body')) {
  const btn = document.createElement('button');
  const txt = document.createTextNode(name);
  btn.appendChild(txt);
  where.appendChild(btn);
  return btn;
}

function createInput (value, where = document.querySelector('body')) {
  let element = document.createElement('input');
  element.setAttribute('type', 'text');
  element.setAttribute('value', value);
  where.appendChild(element);
  return element;
}

export {createButton, createInput};