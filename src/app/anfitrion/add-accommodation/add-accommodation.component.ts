import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccommodationsModel } from '../../shared/models/accommodations';

@Component({
  selector: 'app-add-accommodation',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-accommodation.component.html',
  styleUrl: './add-accommodation.component.css'
})
export class AddAccommodationComponent implements OnInit {

  public accommForm!: FormGroup;
  public accomm: AccommodationsModel = new AccommodationsModel();

  constructor( private apiSer: ApiService,
               private fb: FormBuilder,
               private router: Router ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.accommForm = this.fb.group({
      title_accommodation: [''],
      price_accommodation: [''],
      description_accommodation: [''],
      guests_accommodation: [''],
      beds_accommodation: [''],
      bathrooms_accommodation: [''],
      squareMeters_accommodation: [''],
      amenities: ['']
    })
  }

  createAccommodation(){
    if( this.accommForm.invalid ){
      return Object.values( this.accommForm.controls ).forEach( control => {
        control.markAsTouched();
      })
    }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Creando alojamiento'
    });
    Swal.showLoading();

    this.accomm.title_accommodation = this.accommForm.value.title_accommodation;
    this.accomm.price_accommodation = this.accommForm.value.price_accommodation;
    this.accomm.description_accommodation = this.accommForm.value.description_accommodation;
    this.accomm.guests_accommodation = this.accommForm.value.guests_accommodation;
    this.accomm.beds_accommodation = this.accommForm.value.beds_accommodation;
    this.accomm.bathrooms_accommodation = this.accommForm.value.bathrooms_accommodation;
    this.accomm.squareMeters_accommodation = this.accommForm.value.squareMeters_accommodation;
    this.accomm.amenities = [];

    this.apiSer.createAccommodation( this.accomm ).subscribe( resp => {
      Swal.close();
      Swal.fire({
        title: 'Alojamiento creado',
        text: 'El alojamiento ha sido creado correctamente',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigateByUrl('/anfitrion');
      });
    
    },(error) => {
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al crear el alojamiento',
        icon: 'error',
        showConfirmButton: true,
      });
    })


  }

}
