import axios from 'axios'
import { AsyncStorage } from 'react-native'

let client = axios.create({ baseURL: 'https://radiant-springs-36432.herokuapp.com/'});

AsyncStorage.getItem('authToken', (err, result) => {
  client.defaults.headers.common['Authorization'] = result;
});

export let httpClient = client;
