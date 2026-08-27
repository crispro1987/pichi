import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-front',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './front.component.html',
  styleUrl: './front.component.css'
})
export class FrontComponent implements OnInit {

  public accommodations: any[] = [];

  constructor( public apiSer: ApiService ) { }

  ngOnInit(): void {
    this.readAccommodations();
  }

  readAccommodations(){
    this.apiSer.readAll('accommodations').subscribe( (resp:any) => {
      this.accommodations = resp;
      console.log(resp)
    })
  }

}
