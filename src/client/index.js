import axios from 'axios';
import { createButton, createInput } from './create'
;
//FIXME: port should come from webpack config (!!!)
import SERVER_PORT from './constants';

document.querySelector('#head').innerHTML = 'Here will be endpoint checks';

let requestButton = createButton('get request from graph ql');
let logmail = createInput('sss@gmail.com');
let logpass = createInput('aaaaa');
let getFromForm = createButton('try to login');
let logout = createButton('logout');

axios.defaults.withCredentials = true;

requestButton.addEventListener('click', () =>
  axios.get(`http://localhost:${SERVER_PORT}/graph/?query={authors{id}}`).
    then(resp => console.log(resp.data.data)));

logout.addEventListener('click', function (event) {
  axios.get(`http://localhost:${SERVER_PORT}/api/auth/logout`).
    then(resp => {console.log(resp.data);});
});

getFromForm.addEventListener('click', function (event) {
  axios.post(`http://localhost:${SERVER_PORT}/api/auth`, {
    logemail: logmail.value,
    logpassword: logpass.value
  }).then(function (resp) {
    console.log(resp);
  });
});
