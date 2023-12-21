import { loadingButtonClasses } from '@mui/lab';
import axios from 'axios';

const url = 'http://127.0.0.1:8000/api/formu  lario/';

const getToken = function () {
  return '';
};
axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

export async function get_form() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export function save_form(obj: any) {
  const body = get_object(obj);

  // const objetoDesdeSesion = localStorage.getItem('formulario');
  const objetoDesdeSesion = get_object_localstore();
  let post = true;
  if (objetoDesdeSesion !== null) {
    post = false;
  }

  if (post) {
    axios
      .post(url, body)
      .then((response) => {
        console.log('ok');
        set_object_localstore(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const _url = `${url}${body.id}`;
    axios
      .put(_url, body)
      .then((response) => {
        set_object_localstore(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export async function find_form(id: string): Promise<any> {
  const _url = `${url}${id}`;
  return axios
    .get(_url)
    .then((response) => {
      set_object_localstore(response.data);
      console.log(`devolvio ${response.data.id}`);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}

function get_object(newobj: any) {
  const formularioObject = get_object_localstore();
  if (formularioObject !== null) {
    return { ...formularioObject, ...newobj };
  }
  return newobj;
}

export function get_object_localstore(): any {
  const objeto_local = localStorage.getItem('formulario');
  if (objeto_local) {
    return JSON.parse(objeto_local);
  }
  return null;
}

function set_object_localstore(objeto: any) {
  localStorage.setItem('formulario', JSON.stringify(objeto));
}
