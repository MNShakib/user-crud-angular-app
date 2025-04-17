import { Injectable }                   from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError }        from 'rxjs';
import { catchError, map }               from 'rxjs/operators';     // ← import map()
import { User }                          from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient) {}

  /** GET all users, mapping MongoDB’s _id → our id */
  getUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(arr =>
        arr.map(u => ({
          id:       u._id,           // ← take the Mongo `_id`
          username: u.username,
          password: u.password             // ← we don’t return passwords from the API
        }))
      ),
      catchError(this.handleError)
    );
  }

  /** GET one user by decrypted ID, again mapping _id → id */
  getUserById(id: string): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(u => ({
        id:       u._id,
        username: u.username,
        password: u.password                 // ← leave password blank; user must re‑enter to change
      })),
      catchError(this.handleError)
    );
  }

  /** POST create a new user */
  createUser(user: { username: string; password: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
      .pipe(catchError(this.handleError));
  }

  /** PUT update an existing user */
  updateUser(id: string, user: { username: string; password: string }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user)
      .pipe(catchError(this.handleError));
  }

  /** DELETE a user by ID */
  deleteUser(id: string): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /** Centralized error handling */
  private handleError(err: HttpErrorResponse) {
    console.error('UserService error:', err);
    return throwError(() => new Error(err.message || 'Server error'));
  }
}
