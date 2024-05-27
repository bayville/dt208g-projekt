import { Component } from '@angular/core';
import { LinkBoxComponent } from '../link-box/link-box.component';
import { StatBoxComponent } from '../stat-box/stat-box.component';

@Component({
  selector: 'app-info-bar',
  standalone: true,
  imports: [LinkBoxComponent, StatBoxComponent],
  templateUrl: './info-bar.component.html',
  styleUrl: './info-bar.component.scss'
})
export class InfoBarComponent {

}
