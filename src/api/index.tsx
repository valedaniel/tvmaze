import {API_BASE} from '@env';
import axios from 'axios';

const instance = axios.create({
  baseURL: API_BASE,
});

export default instance;
