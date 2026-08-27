import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-anfitrion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './anfitrion.component.html',
  styleUrl: './anfitrion.component.css'
})
export class AnfitrionComponent implements OnInit {

  public accommodations: any[] = [];

  constructor( private apiSer: ApiService ) { }

  ngOnInit(): void {
    this.readAccommodations();
  }

  readAccommodations(){
    this.apiSer.readAllByHost('accommodations').subscribe( (resp:any) => {
      this.accommodations = resp;
      console.log(resp)
    })
  }

}
