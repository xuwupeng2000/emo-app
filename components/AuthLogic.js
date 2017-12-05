import { AsyncStorage } from 'react-native'

class AuthLogic {
  constructor() {
    this.setupAuthTokenFromStorage;
  }

  setupAuthTokenFromStorage() {
    AsyncStorage.getItem('authToken', (value) => {
      this.token = value;
    });
  }

  saveAuthTokenFromHttp(token) {
    AsyncStorage.setItem('authToken', token, () => {
      this.token = token;
    });
  }

  logOut() {
    // Todo log out on Server
    AsyncStorage.removeItem('authToken');
  }

  isAuthenticated() {
    return this.token;
  }

  getAuthToken() {
    return this.token;
  }

};

export default new AuthLogic();
