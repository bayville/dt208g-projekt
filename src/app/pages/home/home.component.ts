import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { InfoBarComponent } from '../../components/info-bar/info-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, InfoBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
