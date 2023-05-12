import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConfig } from 'src/configs/apiConfig';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiConfig: any = APIConfig;

  constructor(private http: HttpClient) { }

  userLogin(data: any) {
    let loginUrl = this.apiConfig.baseAPI + this.apiConfig.API.userLogin;

    let payload = {
      id: "api.user.login",
      ts: this.generateTimestamp(),
      params: {
        msgid: uuid.v4()
      },
      request: data
    }

    console.log(loginUrl, payload);


    return this.http.post<any>(loginUrl, payload, {})
  }

  generateTimestamp() {
    return Math.round(new Date().getDate());
  }
}


