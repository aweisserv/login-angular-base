import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyATImknlgH7blfZs5HA-b3rFegaVjT8aj8';
  userToken: string;


  constructor( private http: HttpClient ) {
    this.leerToken();
  }


  logout() { 

   }


  login( usuario : UsuarioModel ) {

    const authData = {
      // ...usuario,  <-forma secundaria de requerir los campos dados a continuación
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };


    return this.http.post(
       `${this.url}signInWithPassword?key=${this.apiKey}`, authData
    ).pipe(
      //  catchError <- manejo de errores
      map( resp => {

        this.guardarToken( resp['idToken'] );
        return resp;
      } )
    );
  }


  nuevoUsuario( usuario: UsuarioModel) {

    const authData = {
      // ...usuario,  <-forma secundaria de requerir los campos dados a continuación
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };


    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`, authData
    ).pipe(
    //  catchError <- manejo de errores
      map( resp => {
        console.log('Entró en el map del rxjs')
        this.guardarToken( resp['idToken'] );
        return resp;
      } )
    );
  }

  private guardarToken ( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  leerToken(){

    if ( localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }
}
