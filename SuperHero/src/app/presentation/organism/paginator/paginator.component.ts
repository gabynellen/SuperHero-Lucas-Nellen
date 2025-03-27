import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() length: number = 0;
  pageSize = 5;
  pageIndex = 0;
  @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter();

  PageEvent(e: PageEvent) {
    this.pageEvent.emit(e);
  }
}
