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

  readAll(table:string){
    return this.http.get(`${this.url}/${table}/all`, {
      withCredentials: true
    }).pipe(
      map((resp:any) => {
        if(!resp) return;
        return resp;
      } 
    ));
  }

  readAllByHost(table:string){
    return this.http.get(`${this.url}/${table}/mine`, {
      withCredentials: true
    }).pipe(
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

  createAccommodation(accommodation: any){
    const payload = {
      title_accommodation: accommodation.title_accommodation,
      price_accommodation: accommodation.price_accommodation,
      description_accommodation: accommodation.description_accommodation,
      guests_accommodation: accommodation.guests_accommodation,
      beds_accommodation: accommodation.beds_accommodation,
      bathrooms_accommodation: accommodation.bathrooms_accommodation,
      squareMeters_accommodation: accommodation.squareMeters_accommodation,
      amenities: accommodation.amenities
    };

    return this.http.post(`${this.url}/accommodations/create-accommodation`, payload, {
      withCredentials: true
    })
    .pipe(
      map((resp:any) => {
        if(!resp) return;
        return resp;
      })
    );
  }

  

}