import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  private userSubject = new BehaviorSubject<User[]>(this.users);

  constructor() {
    this.loadLocalStorage();
  }

  getUsers(): Observable<User[]> {
    return this.userSubject.asObservable();

  }

  createUser(user: User): void {
    console.log("createUser");
    user.id = this.users.length + 1;
    this.users.push(user);
    this.userSubject.next(this.users);
    this.updateLocalStorage();
  }
  
  updateUser(user: User): void {
    console.log("updateUser");
    const index = this.users.findIndex((item) => item.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.userSubject.next(this.users);
      this.updateLocalStorage();
    }
  }
  
  deleteUser(id: number): void {
    console.log("DeleteUser");
    this.users = this.users.filter((item) => item.id !== id);
    this.userSubject.next(this.users);
    this.updateLocalStorage();
  }
  
  private loadLocalStorage(): void {
    console.log("loaded LS");
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.userSubject.next(this.users);
    }
  }
  
  private updateLocalStorage(): void {
    console.log("updated LS");
    localStorage.setItem('users', JSON.stringify(this.users));
    this.loadLocalStorage()
  }
}
