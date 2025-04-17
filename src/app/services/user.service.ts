import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private users$ = new BehaviorSubject<User[]>(this.users);
  private nextId = 1;

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  createUser(username: string, password: string): void {
    this.users.push({ id: this.nextId++, username, password });
    this.users$.next(this.users);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  updateUser(id: number, username: string, password: string): void {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx > -1) {
      this.users[idx] = { id, username, password };
      this.users$.next(this.users);
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
    this.users$.next(this.users);
  }
}
