import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TestBed} from "@angular/core/testing";
import {AddRecordService} from "./add-record.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {of} from "rxjs";

describe('AddRecordService', () => {

  let service: AddRecordService;
  let angularFireStore: jasmine.SpyObj<AngularFirestore>;


  beforeEach(() => {
    const fireStoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc', 'createId']);

    TestBed.configureTestingModule({
      providers: [
        AddRecordService,
        {provide: AngularFirestore, useValue: fireStoreSpy},
      ]
    });
    angularFireStore = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    service = TestBed.inject(AddRecordService)

  })
  it('should be return companies data', (done: DoneFn) => {
    const companies = [
      {id: '1', name: 'company 1'},
      {id: '2', name: 'company 2'}
    ];
    // @ts-ignore
    angularFireStore.collection.and.returnValue({
      valueChanges: () => {
        return of(companies);
      }
    })

    service.getCompany().subscribe(c => {
      expect(c).toEqual(companies);
      done();
    })
  });

  it('should be return project data', (done: DoneFn) => {
    const projects = [
      {id: '1', name: 'project 1'},
      {id: '2', name: 'project 2'}
    ];
    // @ts-ignore
    angularFireStore.doc.and.returnValue({ref: ''})
    // @ts-ignore
    angularFireStore.collection=(name,callback)=> {
      callback({
        // @ts-ignore
        where:(arg1,arg2,arg3)=>{}
      })
      return{
        valueChanges: () => {
          return of(projects);
        }
      }
    }

    service.getProject('1').subscribe(p => {
      expect(p).toEqual(projects);
      done();
    })
  })

  it('should be return task data', (done: DoneFn) => {
    const tasks = [
      {id: '1', name: 'task 1'},
      {id: '2', name: 'task 2'}
    ];
    // @ts-ignore
    angularFireStore.doc.and.returnValue({ref: ''})
    // @ts-ignore
    angularFireStore.collection=(name,callback)=> {
      callback({
        // @ts-ignore
        where:(arg1,arg2,arg3)=>{}
      })
      return{
        valueChanges: () => {
          return of(tasks);
        }
      }
    }

    service.getTask('1').subscribe(t => {
      expect(t).toEqual(tasks);
      done();
    })
  })

  it('should be create record without new Task', (done: DoneFn) => {
    // @ts-ignore
    angularFireStore.collection.and.returnValue({
      valueChanges: () => {
        return of([{id: '1'}]);
      }
    })

    service.createRecord = (companyId: string, projectId: string, taskId: string, hours: number) => {
      return Promise.resolve('1')
    };

    service.saveRecord('', '', '', 0).subscribe((record) => {
      record.then(r => {
        expect(r.isNewTask).toBeFalsy()
        expect(r.recordId).toEqual('1')
      }).then(() => {
        done()
      })
    })

  })
  it('should be create record with new Task', (done: DoneFn) => {
    // @ts-ignore
    angularFireStore.collection=(name,callback)=> {
      callback({
        // @ts-ignore
        where:(arg1,arg2,arg3)=>{}
      })
      return{
        valueChanges: () => {
          return of([]);
        }
      }
    }
    service.createTask = (name: string, projectId: string) => {
      return Promise.resolve('1')
    }
    service.createRecord = (companyId: string, projectId: string, taskId: string, hours: number) => {
      return Promise.resolve('1')
    };

    service.saveRecord('', '', '', 0).subscribe((record) => {
      record.then(r => {
        expect(r.isNewTask).toBeTruthy()
        expect(r.recordId).toEqual('1')
      }).then(() => {
        done()
      })
    })

  })

  it('should be create task', (done: DoneFn) => {
    angularFireStore.createId.and.returnValue('1')
    // @ts-ignore
    angularFireStore.doc.and.returnValue({ref: ''})
    // @ts-ignore
    angularFireStore.collection.and.returnValue({
      // @ts-ignore
      doc: (id: any) => {
        return {
          set: () => {
            return Promise.resolve()
          }
        };
      }
    })

    service.createTask('','').then(taskId=>{
      expect(taskId).toEqual('1')
      done()
    })
  })

  it('should be create record', (done: DoneFn) => {
    angularFireStore.createId.and.returnValue('1')
    // @ts-ignore
    angularFireStore.doc.and.returnValue({ref: ''})
    // @ts-ignore
    angularFireStore.collection.and.returnValue({
      // @ts-ignore
      doc: (id: any) => {
        return {
          set: () => {
            return Promise.resolve()
          }
        };
      }
    })

    service.createRecord('','','',0).then(taskId=>{
      expect(taskId).toEqual('1')
      done()
    })
  })

})
