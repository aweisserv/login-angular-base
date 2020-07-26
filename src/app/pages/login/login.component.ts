import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from '../../../assets/js/sweetalert2.all.min.js' 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login( form: NgForm ){

    if( form.invalid ) { return; }
      //Sweet alert ingresado aquí (Más ejemplos: https://sweetalert2.github.io/#examples )
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        timerProgressBar: true,
        text: 'Espere, por favor...',
      });
      Swal.showLoading();
    

      this.auth.login( this.usuario )
        .subscribe( resp => {

          console.log(resp);
          Swal.close();

          if ( this.recordarme ) {
            localStorage.setItem('email', this.usuario.email );
          }

          this.router.navigateByUrl('/home');

        }, ( err ) => {

          console.log( err.error.error.message );
          Swal.fire({
            title: 'Error al autenticar',
            icon: 'error',
            timerProgressBar: true,
            text: err.error.error.message
          });

        });
  }

}
