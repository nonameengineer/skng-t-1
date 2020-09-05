import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TabTitleComponent} from '../tab-title/tab-title.component';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements AfterViewInit {
  index: number;
  active$ = new BehaviorSubject<boolean>(false);

  @Output() selected = new EventEmitter<number>();

  @ContentChild(TabTitleComponent, { read: ElementRef }) title: ElementRef;

  @HostListener('click') onClick(): void {
    this.selected.emit(this.index);
  }

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    const ACTIVE_CLASS = 'tabs__title--active';
    this.active$.subscribe(active => active ?
      this.renderer.addClass(this.title.nativeElement, ACTIVE_CLASS) :
      this.renderer.removeClass(this.title.nativeElement, ACTIVE_CLASS)
    );
    this.cdr.detectChanges();
  }
}
