import axios from 'axios'
import { AsyncStorage } from 'react-native'

let client = axios.create({ baseURL: 'http://192.168.1.6:3000'});

AsyncStorage.getItem('authToken', (err, result) => {
  client.defaults.headers.common['Authorization'] = result;
});

export let httpClient = client;
