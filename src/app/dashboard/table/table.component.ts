import {Component, ViewChild, OnInit, OnDestroy, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

import {TableService} from "./table.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  subscription: any;
  displayedColumns: string[] = ['company', 'project', 'task', 'hours', 'delete'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @Output() loading :Subject<boolean> = new Subject();


  listLength: number = 0

  constructor(private record: TableService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loading.next(true)
    this.subscription = this.record.fetchData().subscribe(records => {
      this.listLength = records.length
      this.initTable(records)
      this.loading.next(false)

    })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async deleteRecord(id: string) {
    this.loading.next(true)

    if (this.listLength == 1) {
      this.initTable([])
    }
    await this.record.deleteRecord(id).then(r => {
      this.loading.next(false)
      this._snackBar.open('record removed', '', {
        duration: 5000
      })
    })
  }

  initTable(records: any[]) {
    this.dataSource = new MatTableDataSource<any>(records);
    this.dataSource.paginator = this.paginator;
  }

}

