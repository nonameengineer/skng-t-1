import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css'],
})
export class TabTitleComponent {
  @HostBinding('class') class = 'tabs__title';
}
