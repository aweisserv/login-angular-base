import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from '../../../assets/js/sweetalert2.all.min.js' 


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() { 

    this.usuario = new UsuarioModel();

  }

  onSubmit( form: NgForm ){

    if( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      timerProgressBar: true,
      text: 'Espere, por favor...',
    });
    Swal.showLoading();


    this.auth.nuevoUsuario( this.usuario )
      .subscribe( resp => {

        console.log( resp );
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
