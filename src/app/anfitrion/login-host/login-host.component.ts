import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HostsModel } from '../../shared/models/host';
import { ApiService } from '../../shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-host',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './login-host.component.html',
  styleUrl: './login-host.component.css'
})
export class LoginHostComponent implements OnInit{

  public logForm!: FormGroup;
  public host: HostsModel = new HostsModel();
  
  constructor( private apiSer: ApiService,
               private router: Router,
               private fb: FormBuilder ){}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.logForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  loginHost(){

    if(this.logForm.invalid){
      return Object.values(this.logForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    this.host.email_host = this.logForm.controls['email'].value;
    this.host.password_host = this.logForm.controls['password'].value;

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.apiSer.loginHost(this.host).subscribe({
      next: () => {

        this.apiSer.getMe().subscribe(() =>{
          Swal.close();

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Bienvenid@',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {

            this.router.navigate(['anfitrion']);

          });

        })
      },

      error: () => {
        Swal.fire({
          title: 'Correo y/o contraseña incorrectos.',
          icon: 'error',
          text: 'Intente nuevamente o restablezca la contraseña.'
        });
      }
    });

  }

}
