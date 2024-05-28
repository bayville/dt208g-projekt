import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-testimonial-cta',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './testimonial-cta.component.html',
  styleUrl: './testimonial-cta.component.scss'
})
export class TestimonialCtaComponent {

}
