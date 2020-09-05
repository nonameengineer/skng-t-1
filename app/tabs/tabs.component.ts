import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import {TabComponent} from './components/tab/tab.component';
import {BehaviorSubject} from 'rxjs';
import {ContentContainerDirective} from './directives/content-container/content-container.directive';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit, AfterViewInit {
  activeIndex$ = new BehaviorSubject<number>(0);

  @Input() tabs: number[];

  @HostBinding('class') class = 'tabs__titles';

  @ContentChildren(TabComponent) tabComponents: QueryList<TabComponent>;
  @ContentChild(ContentContainerDirective, {static: true}) contentContainer: ContentContainerDirective;
  @ContentChild('templateRef', { read: TemplateRef, static: false }) templateRef: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.setFirstTabActive();

    // Set initial tabs indexes and handlers.
    this.setTabsIndex();
    this.setTabClickHandlers();

    // When tab is created or removed, update tabs indexes and handlers.
    this.tabComponents.changes.subscribe((tabs: QueryList<TabComponent>) => {
      if (tabs.length > 0) {
        this.setTabsIndex();
        this.setTabClickHandlers();

        // If removed active tab, create content view of first tab.
        if (!this.tabs[this.activeIndex$.getValue()] || this.tabs.length === 1) {
          this.setFirstTabActive();
          setTimeout(() => {
            this.loadComponent(0);
            this.activeIndex$.next(0);
          });
        }
      } else {
        this.activeIndex$.next(0);
      }
    });

    // When active tab index is updated, activate corresponding tab.
    this.activeIndex$.subscribe((index: number) => {
      if (this.tabComponents.length > 0) {
        this.activateTab(index);
        this.loadComponent(index);
      } else {
        this.contentContainer.viewContainerRef.clear();
      }
    });
  }

  private loadComponent(index: number): void {
    const viewContainerRef = this.contentContainer.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createEmbeddedView(this.templateRef, {tab: this.tabs[index]});
  }

  private setFirstTabActive(): void {
    this.tabComponents.first.active$.next(true);
  }

  private activateTab(index: number): void {
    this.tabComponents.toArray()[index].active$.next(true);
  }

  private disablePreviousTab(): void {
    this.tabComponents.toArray()[this.activeIndex$.getValue()].active$.next(false);
  }

  /**
   * Manually subscribe to component event `selected` of each tab component.
   * @see `TabComponent` in components/tab/tab.component.ts
   * @example ```
   *
   *   ...
   *
   *   @Output() selected = new EventEmitter<number>();
   *
   *   @HostListener('click') onClick(): void {
   *     this.selected.emit(this.index);
   *   }
   *
   *   ...
   *
   * ```
   */
  private setTabClickHandlers(): void {
    this.tabComponents.map((tab: TabComponent) => {
      tab.selected.subscribe((index: number) => {
        this.disablePreviousTab();
        this.activeIndex$.next(index);
      });
    });
  }

  /**
   * Initialize each tab own index property,
   */
  private setTabsIndex(): void {
    this.tabComponents.map((tab: TabComponent, index: number) => {
      tab.index = index;
    });
  }
}
