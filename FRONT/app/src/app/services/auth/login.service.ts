import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { LocalStorageHelper } from '../../helpers/local-storage.helper';
import { ChangePassData } from '../../modelos/changePassData';
import { ConfirmEmailData } from '../../modelos/confirmEmailData';
import { ConfirmRecoverPassData } from '../../modelos/confirmRecoverPassData';
import { UserData } from '../../modelos/userData';
import { LoginRequest } from './loginRequest';

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  currUserData = new BehaviorSubject<UserData>({});
  currUserLoggedIn = new BehaviorSubject<boolean>(false);

  get userData() {
    return this.currUserData.asObservable();
  }

  get userLoggedIn() {
    return this.currUserLoggedIn.asObservable();
  }

  constructor(private client: HttpClient) {
    this.isUserLoggedIn().subscribe();
    this.currUserData.next(LocalStorageHelper.get('user-data') ?? {});
  }

  registro(userData: UserData): Observable<void> {
    return this.client.post<void>('http://localhost:8080/api/registro', userData).pipe(
      tap({ next: res => console.log(res) }),
      catchError(this.handleError),
    );
  }

  confirmEmail(confirmEmailData: ConfirmEmailData): Observable<void> {
    return this.client.post<void>('http://localhost:8080/api/confirmar-email', confirmEmailData).pipe(
      tap({ next: res => console.log(res) }),
      catchError(this.handleError),
    );
  }

  login(credentials: LoginRequest): Observable<UserData> {
    return this.client.post<UserData>('http://localhost:8080/api/login', credentials).pipe(
      tap({
        next: (userData: UserData) => {
          LocalStorageHelper.save('user-data', userData);
          this.currUserData.next({ email: userData.email, name: userData.name });
          this.currUserLoggedIn.next(true);
        }
      }),
      catchError(this.handleError),
    );
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.client.get<boolean>('http://localhost:8080/api/usuario-logeado').pipe(
      tap({ next: isLoggedIn => this.currUserLoggedIn.next(isLoggedIn) }),
      catchError(this.handleError),
    )
  }

  logout(): Observable<void> {
    return this.client.get<void>('http://localhost:8080/api/logout').pipe(
      tap({
        next: () => {
          this.currUserData.next({});
          this.currUserLoggedIn.next(false);
        }
      }),
      catchError(this.handleError),
    );
  }

  changePassword(changePasswordData: ChangePassData): Observable<void> {
    return this.client.post<void>('http://localhost:8080/api/change-password?', changePasswordData).pipe(
      tap(),
      catchError(this.handleError),
    )
  }

  recoverPassword(email: string): Observable<void> {
    return this.client.get<void>(`http://localhost:8080/api/recover-password?email=${email}`).pipe(
      tap(),
      catchError(this.handleError),
    )
  }

  confirmRecoverPassword(confirmRecoverPassData: ConfirmRecoverPassData): Observable<void> {
    return this.client.post<void>('http://localhost:8080/api/confirm-recover-password', confirmRecoverPassData).pipe(
      tap(),
      catchError(this.handleError),
    )
  }

  private handleError(err: HttpErrorResponse) {
    err.status === 0
      ? console.error('Se ha producido un error', err.error)
      : console.error('Backend retornó el código de estado ', err.status, err.error);
    return throwError(() => new Error(err.error));
  }
}
