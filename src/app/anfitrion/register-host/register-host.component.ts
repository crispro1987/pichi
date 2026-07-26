import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HostsModel } from '../../shared/models/host';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidadoresService } from '../../shared/services/validadores.service';

@Component({
  selector: 'app-register-host',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-host.component.html',
  styleUrl: './register-host.component.css'
})
export class RegisterHostComponent implements OnInit{

  public regForm!: FormGroup;
  public host: HostsModel = new HostsModel();
  public password1 = '';
  public password2 = '';

  constructor( private apiSer: ApiService,
               private fb: FormBuilder,
               private validadores: ValidadoresService,
               private router: Router ){}

  ngOnInit(): void {
    this.crateForm();
  }

  get password2NoValido(){
    if( this.regForm.controls['password2'].touched ){
      this.password1 = this.regForm.get('password')?.value;
      this.password2 = this.regForm.get('password2')?.value;
    }
    return( this.password1 === this.password2 ) ? false : true;
  }

  get password2Required(){
    if( this.regForm.controls['password2'].errors && this.regForm.controls['password2'].touched ){
      if( this.regForm.controls['password2'].errors['required'] ){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  crateForm(){
    this.regForm = this.fb.group({
      type: [''],
      name: [''],
      dni: [''],
      email: [''],
      password: ['', Validators.required],
      password2: [''],
      fantasy: [''],
      phone: [''],
      address: [''],
      bank: [''],
      typeAccount: [''],
      numberAccount: [''],
    },{
      validators: this.validadores.idem('password','password2')
    })

  }

  registerHost(){
    if(this.regForm.invalid){
      return Object.values(this.regForm.controls).forEach(control => {
        control.markAsTouched();
      })
    }

    Swal.fire({
      allowOutsideClick: false,
      text: "Se enviará un correo de verificación al anfitrión",
    });
    Swal.showLoading();
  
    this.host.type_host = this.regForm.value.type;
    this.host.name_host = this.regForm.value.name;
    this.host.dni_host = this.regForm.value.dni;
    this.host.email_host = this.regForm.value.email;
    this.host.password_host = this.regForm.value.password;
    this.host.fantasy_host = this.regForm.value.fantasy;
    this.host.phone_host = this.regForm.value.phone;
    this.host.address_host = this.regForm.value.address;
    this.host.bank_host = [{
      nameBank: this.regForm.value.bank,
      typeAccount: this.regForm.value.typeAccount,
      numberAccount: this.regForm.value.numberAccount
    }]

    this.apiSer.createHost(this.host).subscribe(resp => {
      Swal.close();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Se ha registrado correctamente al anfitrión`,
        showConfirmButton: false,
        timer: 1500,
      })
      this.router.navigateByUrl('/anfitrion/login');
    },(error) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Error al registrar al anfitrión`,
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

}
