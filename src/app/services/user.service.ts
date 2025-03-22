import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  id?: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getAllUsers;
  }

  // ✅ Get User by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // ✅ Get All Users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // ✅ Create User
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(catchError(this.handleError));
  }

  // ✅ Update User
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(catchError(this.handleError));
  }

  // ✅ Delete User
deleteUser(id: number): Observable<any> {
  console.log("in delete");
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}

  

  // ✅ Handle API Errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred! '+ error.status;
    if (error.status === 404) {
      errorMessage = 'User not found!';
    } else if (error.status === 400) {
      errorMessage = 'Invalid request!';
    }
    return throwError(() => new Error(errorMessage));
  }
}
