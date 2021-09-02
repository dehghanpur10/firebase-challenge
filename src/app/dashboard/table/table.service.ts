import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, switchMap} from 'rxjs/operators';
import {combineLatest} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private store: AngularFirestore) {
  }

  fetchData() {
    return this.store.collection('record', ref => ref.orderBy('hours')).valueChanges({idField: 'id'}).pipe(
      switchMap(records => {
        return combineLatest(
          records.map(r => {
            // @ts-ignore
            return this.getCompleteRecord(r)
          })
        )
      }),
    )
  }

  getCompleteRecord(record: any) {
    return combineLatest([
      this.store.doc('company/' + record.company.id).valueChanges(),
      this.store.doc('project/' + record.project.id).valueChanges(),
      this.store.doc('task/' + record.task.id).valueChanges()
    ]).pipe(
      map(([company, project, task]) => {
        const hours = record.hours;
        const id = record.id;
        return {company, project, task, hours, id}
      })
    )
  }

  deleteRecord(id: string) {
    return this.store.doc('record/' + id).delete()
  }


}
