import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dbPath = '/tasks';
  
  tasksRef: AngularFirestoreCollection<Task>;
  
  constructor(private db: AngularFirestore) {
    this.tasksRef = db.collection(this.dbPath); //database collection's path is saved in the tasksRef(reference variable) 
   }

   getAll(): AngularFirestoreCollection<Task> {
    return this.tasksRef;
   }

   create(task: Task): any {
    return this.tasksRef.add({...task});
   }

   update(id: string, data:any): Promise<void> {
    return this.tasksRef.doc(id).update(data);
   }

   delete(id: string): Promise<void> {
    return this.tasksRef.doc(id).delete();
   }
}
