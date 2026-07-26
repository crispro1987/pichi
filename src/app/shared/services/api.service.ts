import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { HostsModel } from '../models/host';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  private url = environment.uriApi;

  constructor( private http: HttpClient ) { }

  getMe(){
    return this.http.get(`${this.url}/auth/me`, {
      withCredentials: true
    }).pipe(
      tap((resp:any) => {

        if(!resp) return;

        const user = resp.user ?? resp;

        this.userSubject.next(user);

      })
    );
  }

  createHost(host: HostsModel){
    const payload = {
      type_host: host.type_host,
      name_host: host.name_host,
      dni_host: host.dni_host,
      email_host: host.email_host,
      password_host: host.password_host,
      fantasy_host: host.fantasy_host,
      phone_host: host.phone_host,
      address_host: host.address_host,
      bank_host: host.bank_host
    };

    return this.http.post(`${this.url}/auth/host/register`, payload, {
      withCredentials: true
    })
    .pipe(
      map((resp:any) => {
        if(!resp) return;
        return resp;
      })
    );
  }


  loginHost( host: HostsModel ){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    }); 

    const payload = {
        email_host: host.email_host,
        password_host: host.password_host
    };

    return this.http.post(`${this.url}/auth/host/login`,payload,{headers:headers, withCredentials:true})
      .pipe(
        tap((resp: any) => {
          
        }),
        map((resp:any) => {
          return resp;
        })
      )
  }

}