import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './tabs.component';
import {TabComponent} from './components/tab/tab.component';
import {TabTitleComponent} from './components/tab-title/tab-title.component';
import {TabContentComponent} from './components/tab-content/tab-content.component';


@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabContentComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabContentComponent,
  ],
})
export class TabsModule {}
