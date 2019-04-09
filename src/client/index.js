import axios from 'axios'

document.querySelector('#head').innerHTML = 'Here will be enpoint checks'
const body = document.querySelector('body')

function createButton () {
  const btn = document.createElement('button')
  const txt = document.createTextNode('click')
  btn.appendChild(txt)
  body.appendChild(btn)
  btn.addEventListener('click', showData)
}
createButton()
const port = 3890
const path = 'http://localhost:3890/?query={authors{id}}'
function showData () {
  axios.get(path, {
    method: 'HEAD',
    mode: 'no-cors'
  }).then(resp => console.log(resp.data.data))
}

