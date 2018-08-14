import { API } from 'space-api';

const api = new API('demo', 'http://localhost:8080/');
const db = api.Mongo();

export { api, db };
