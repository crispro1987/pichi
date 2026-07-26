import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-anfitrion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './anfitrion.component.html',
  styleUrl: './anfitrion.component.css'
})
export class AnfitrionComponent {

}
