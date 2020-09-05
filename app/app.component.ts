import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, AfterViewChecked} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit , AfterViewChecked  {
  public tabs = [ 1, 2 ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
      this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  public dec() {
    this.tabs = this.tabs.slice(0, -1);
  }

  public inc() {
    this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
  }
}
