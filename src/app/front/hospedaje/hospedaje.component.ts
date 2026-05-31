import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hospedaje',
  standalone: true,
  imports: [],
  templateUrl: './hospedaje.component.html',
  styleUrl: './hospedaje.component.css'
})
export class HospedajeComponent {
  slides = [
    {
      src: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&w=1200&q=80',
      alt: 'Vista Interior'
    },
    {
      src: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
      alt: 'Terraza Exterior'
    },
    {
      src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      alt: 'Jacuzzi Privado'
    }
  ];

  // Signal que mantiene la posición actual
  currentIndex = signal<number>(0);

  // Signal calculada que genera el string CSS exacto para el atributo transform
  sliderTransform = computed(() => `translateX(-${this.currentIndex() * 100}%)`);

  nextSlide(): void {
    this.currentIndex.update(index => {
      return (index < this.slides.length - 1) ? index + 1 : 0;
    });
  }

  prevSlide(): void {
    this.currentIndex.update(index => {
      return (index > 0) ? index - 1 : this.slides.length - 1;
    });
  }
}
