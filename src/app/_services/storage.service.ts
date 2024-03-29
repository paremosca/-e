import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getRefreshToken():any{
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user){
      return JSON.parse(user)['refreshToken'];
    }

    return {};
  }

  public getToken(): any{
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user){
      if(JSON.parse(user)['firebaseToken']){
        return JSON.parse(user)['firebaseToken'];
      }else{
        if(JSON.parse(user)['access_token'])
          return JSON.parse(user)['access_token'];
      }

    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}