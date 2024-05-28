import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-box',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './link-box.component.html',
  styleUrl: './link-box.component.scss'
})
export class LinkBoxComponent {
  @Input() text: string = 'Default Title';
  @Input() linkBoxClass: string = 'linkBox__light-blue';
  @Input() link: string = 'Default Button Text';
}
