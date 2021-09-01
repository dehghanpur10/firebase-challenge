import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, mergeMap, tap,first} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AddRecordService {

  constructor(private store: AngularFirestore) {
  }

  getCompany() {
    return this.store.collection('company').valueChanges({idField: "id"})
  }

  getProject(companyId: string) {
    const companyRef = this.store.doc('company/' + companyId).ref
    return this.store.collection('project', ref => ref.where('company', '==', companyRef)).valueChanges({idField: "id"})
  }

  getTask(projectId: string) {
    const projectRef = this.store.doc('project/' + projectId).ref
    return this.store.collection('task', ref => ref.where('project', '==', projectRef)).valueChanges({idField: "id"})
  }

  saveRecord(companyId: string, projectId: string, task: string, hours: number) {

    return this.store.collection('task', ref => ref.where('name', '==', task)).valueChanges({idField: 'id'}).pipe(
      first(),
      tap(async tasks => {
        let taskId: string;
        if (tasks.length > 0) {
          taskId = tasks[0].id
        } else {
          taskId = await this.createTask(task, projectId)
        }
        await this.createRecord(companyId, projectId, taskId, hours)
      })
    )
  }

  private createRecord(companyId: string, projectId: string, taskId: string, hours: number) {
    const companyRef = this.store.doc('/company/' + companyId).ref;
    const projectRef = this.store.doc('/project/' + projectId).ref;
    const taskRef = this.store.doc('/task/' + taskId).ref;
    const id = this.store.createId()
    return this.store.collection('record').doc(id).set({
      company: companyRef,
      project: projectRef,
      task: taskRef,
      hours: hours
    }).then(() => {
      return id
    })
  }

  private createTask(name: string, projectId: string) {
    const id = this.store.createId()
    const ref = this.store.doc('/project/' + projectId).ref
    return this.store.collection('task').doc(id).set({
      name: name,
      description: 'this is a new task',
      project: ref,
    }).then(() => {
      return id
    })

  }

}
