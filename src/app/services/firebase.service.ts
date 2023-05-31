import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Task } from '../models/task.class';
import { User } from '../models/user.class';
import { deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  users: object = [];
  tasks: object = [];

  constructor(private firestore: Firestore) { }

  /**
   * Creates a task in Firestore collection "tasks".
   * @param task as Task
   */
  createTask(task: Task) {
    const collectionInstance = collection(this.firestore, 'tasks');
    const docRef = doc(collectionInstance);
    task.id = docRef.id;

    setDoc(docRef, task.toJSON()).then(() => {
      console.log('Task created successfully! Task ID: ', task.id);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  /**
   * Gets all tasks from Firestore collection "tasks".
   */
  getAllTasks() {
    const collectionInstance = collection(this.firestore, 'tasks');
    collectionData(collectionInstance).subscribe((tasks) => {
      return tasks;
    })
  }

  /**
   * Returns a specific task from Firestore collection "tasks" according to the id.
   * @param id as string
   */
  getSpecificTask(id: string) {
    const collectionInstance = collection(this.firestore, 'tasks');
    collectionData(collectionInstance, { idField: 'id' }).subscribe((tasks) => {
      tasks.forEach((task) => {
        if (task['id'] === id) {
          return task;
        } else {
          return null;
        }
      });
    });
  }

  /**
   * Updates a task in Firestore collection "tasks" according to the id.
   * @param task as Task
   */
  setTask(task: Task) {
    const documentInstance = doc(this.firestore, 'tasks', task.id);
    updateDoc(documentInstance, task.toJSON()).then(() => {
      console.log('Task updated successfully!');
    }
    ).catch((error: any) => {
      console.log(error);
    }
    );
  }

  /**
   * Deletes a task in Firestore collection "tasks" according to the id.
   * @param task as Task
   */
  deleteTask(task: Task) {
    const documentInstance = doc(this.firestore, 'tasks', task.id);
    deleteDoc(documentInstance).then(() => {
      console.log('Task deleted successfully!');
    }
    ).catch((error: any) => {
      console.log(error);
    }
    );
  }

  /**
   * Creates a user in Firestore collection "users".
   */
  createUser(user: User) {
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, user.toJSON()).then(() => {
      console.log('User created successfully!');
    }).catch((error: any) => {
      console.log(error);
    });
  }

  /**
   * Gets all users from Firestore collection "users".
   */
  getAllUsers() {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance).subscribe((users) => {
      return users;
    });
  }

  /**
   * Returns a specific user from Firestore collection "users" according to the id.
   * @param id as string
   */
  getSpecificUser(id: string) {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'userId' }).subscribe((users) => {
      users.forEach((user) => {
        if (user['userId'] === id) {
          return user;
        } else {
          return null;
        }
      });
    });
  }
}
