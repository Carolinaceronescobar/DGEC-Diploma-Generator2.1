import { loadingButtonClasses } from '@mui/lab';
import axios from 'axios';

let url = 'http://127.0.0.1:8000/api/formulario/';

export async function get_form() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export function save_form(obj) {
  let objeto_1 = JSON.stringify(obj);
  const body = get_object(obj);
  let objeto_2 = JSON.stringify(body);

  console.log('*********objeto_1**********');
  console.log(objeto_1);
  console.log('*********objeto_2**********');
  console.log(objeto_2);
  console.log('*******************');

  const objetoDesdeSesion = sessionStorage.getItem('formulario');
  let post = true;
  if (objetoDesdeSesion !== null) {
    post = false;
  }

  if (post) {
    axios
      .post(url, body)
      .then((response) => {
        console.log('ok');
        write_form(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    url = `${url}${body.id}`;
    axios
      .put(url, body)
      .then((response) => {
        write_form(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function get_object(newobj) {
  const objetoDesdeSesion = sessionStorage.getItem('formulario');
  if (objetoDesdeSesion !== null) {
    let formularioObject = JSON.parse(sessionStorage.getItem('formulario'));
    return { ...formularioObject, ...newobj };
  }
  return newobj;
}

function write_form(objeto) {
  sessionStorage.setItem('formulario', JSON.stringify(objeto));
}
