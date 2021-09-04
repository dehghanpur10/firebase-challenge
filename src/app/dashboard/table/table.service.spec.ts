import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TestBed} from "@angular/core/testing";
import {AddRecordService} from "../add-record/add-record.service";
import {TableService} from "./table.service";
import {of} from "rxjs";

describe('TableService', () => {
  let service: TableService
  let angularFireStore: jasmine.SpyObj<AngularFirestore>;


  beforeEach(() => {
    const fireStoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);

    TestBed.configureTestingModule({
      providers: [
        AddRecordService,
        {provide: AngularFirestore, useValue: fireStoreSpy},
      ]
    });
    angularFireStore = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    service = TestBed.inject(TableService)
  })
  it('should be get data', (done: DoneFn) => {
    const records = [
      {id: '1', name: 'record 1'},
      {id: '2', name: 'record 2'}
    ];
    // @ts-ignore
    angularFireStore.collection=(name,callback)=> {
      callback({
        // @ts-ignore
        orderBy:(arg)=>{}
      })
      return{
        valueChanges: () => {
          return of(records);
        }
      }
    }

    service.getCompleteRecord = (record: any) => {
      return of(record)
    }

    service.fetchData().subscribe(r => {
      //@ts-ignore
      expect(r).toEqual(records)
      done()
    })
  })
  it('should be complete record', (done: DoneFn) => {
    // @ts-ignore
    angularFireStore.doc.and.returnValue({
      valueChanges: () => {
        return of({id: 'a'})
      }
    })

    service.getCompleteRecord({hours: 1, id: '2', company: {}, project: {}, task: {}}).subscribe(r => {
      expect(r).toEqual({company: {id: 'a'}, project: {id: 'a'}, task: {id: 'a'}, id: '2', hours: 1})
      done()
    })
  })


  it('should be delete record', (done: DoneFn) => {
    // @ts-ignore
    angularFireStore.doc.and.returnValue({
      delete: () => {
        return Promise.resolve()
      }
    })

    service.deleteRecord('').then(() => {
      expect(true).toBeTruthy();
      done()
    })
  })
})
