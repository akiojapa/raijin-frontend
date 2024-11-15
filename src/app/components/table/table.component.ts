import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, FormsModule, MatPaginatorModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;
  @Input() traduction: string = ''
  @Input() tableCols: string[] = []
  @Input() tableData!: any[];
  @Input() sortDefault?: string;
  @Input() hasSearch: string = '';
  @Input() hasActions: boolean = false;
  @Input() actionEdit: boolean = true;
  @Input() actionDelete: boolean = true;
  @Input() actionView: boolean = true;
  @Input() searchableCols: string[] = [];
  @Input() sizePaginator: number = 10;
  @Input() lengthPaginator: Promise<number> = Promise.resolve(0);
  @Input() hasPaginator: boolean = false;
  @Input() hasFilter: boolean = false;
  @Input() title: string = '';

  tableDataSrc: any;
  displayedColumns: string[] = [];

  pageSize: number = 10;
  length: number = 0;


  searchInput: string = '';
  selectedColumn: string = 'none';

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      this.initializeTable();
    }

    if (changes['tableData']) {
      this.applyFilter(this.hasSearch);
    }
  }

  ngAfterViewInit(): void {
    this.initializeTable();

    if (this.paginator) {

      this.tableDataSrc.paginator = this.paginator;
    }

    this.cdr.detectChanges();
  }


  async initializeTable(): Promise<void> {
    this.tableDataSrc = new MatTableDataSource(this.tableData);

    if (this.hasSearch) {
      this.applyFilter(this.hasSearch);
    }

    if (this.sort) {
      const [active, direction] = this.sortDefault?.split(':') ?? [this.tableCols[0], 'asc'];
      this.sort.active = active;
      this.sort.direction = (direction === 'asc' || direction === 'desc') ? direction as SortDirection : 'asc';
      this.tableDataSrc.sort = this.sort;
    }

    const paginator = await this.lengthPaginator;
    this.pageSize = this.sizePaginator;

    if (paginator > 0) {
      this.length = await this.lengthPaginator ?? this.tableData.length;

    }
    else {
      this.tableDataSrc.paginator = this.paginator;
    }

    this.displayedColumns = [...this.tableCols];
    if (this.hasActions) {
      this.displayedColumns.push('actions');
    }
  }

  applyFilter(filterValue: string) {
    const searchTarget = filterValue.trim().toLowerCase();
    this.tableDataSrc.filterPredicate = (data: any, filter: string) => {
      if (this.selectedColumn && this.selectedColumn !== 'none') {
        return data[this.selectedColumn]?.toString().toLowerCase().includes(filter);
      } else {
        return Object.keys(data).some(key => {
          return data[key]?.toString().toLowerCase().includes(filter);
        });
      }
    };
    this.tableDataSrc.filter = searchTarget;
  }

  convertToTitleCase(snakeCase: string): string {
    return snakeCase
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }


  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  onSearchInput(hasSearch: string) {
    this.applyFilter(hasSearch);
  }

  onSearchInputChange(value: string) {
    this.searchInput = value;
    this.applyFilter(value)
  }

  onSelectChange(value: string) {
    this.selectedColumn = value;
    this.applyFilter(this.searchInput);
  }
}
