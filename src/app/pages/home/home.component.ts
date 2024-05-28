import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';
import { TestimonialCtaComponent } from '../../components/testimonial-cta/testimonial-cta.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, InfoBarComponent, TestimonialCtaComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'


  
})
export class HomeComponent {

}
