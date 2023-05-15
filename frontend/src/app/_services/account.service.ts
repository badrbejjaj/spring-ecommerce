import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { TokenResponse, User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    // tslint:disable-next-line:variable-name
    private readonly _userSubject = new ReplaySubject<User>(1);
    // tslint:disable-next-line:variable-name
    private _user: User;
    // tslint:disable-next-line: variable-name
    private _userSubscription: Subscription;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    // get currentUser$(): Observable<User> {
    //     this.retrieveUser();

    //     return this._userSubject.asObservable();
    // }
    get currentUser$(): Observable<any> {
        this.retrieveUser();
        return this._userSubject.asObservable();
    }
    // public get isAdmin(): boolean {
    //     return this.userSubject.value.role === 'ADMIN';
    // }

    setToken(token): void {
        localStorage.setItem('token', JSON.stringify(token));
    }

    getToken(): string {
        const token = localStorage.getItem('token');
        return token ? JSON.parse(token as any) : null;
    }

    login(username, password): any {
        return this.fetchAccessToken({ username, password})
        .pipe(tap(() => this.retrieveUser()));
    }

    public fetchAccessToken(credentials: any): Observable<string> {
        return this.http.post(`${environment.apiUrl}/api/users/login`, credentials)
                .pipe(tap((data: any) => this.setToken(data.token)));
    }

    logout(): void {
        // remove user from local storage and set current user to null
        localStorage.removeItem('token');
        this._user = null;
        this.redirectToLogin();
    }

    register(user: User): Observable<User>  {
        return this.http.post<User>(`${environment.apiUrl}/api/users/register`, user);
    }

    getAll(): Observable<User[]>  {
        return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
    }

    getById(id: string): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/users/${id}`);
    }

    // update(id, params): Observable<User> {
    //     return this.http.put<User>(`${environment.apiUrl}/api/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id === this.userValue.id) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('token', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }


    public isLogged(): boolean {
        return !!this.getToken();
    }
    public redirectToLogin(): void {
        this.router.navigate(['/login']);
    }

    retrieveUser(): void {
        if (!this.isLogged()) {
            this.redirectToLogin();
            return;
        }

        if (this._user) {
            return;
        }

        this._userSubscription = this.getCurrentUser()
        .subscribe(
            (user: User) => {
                this._userSubscription.unsubscribe();
                this._userSubscription = undefined;

                this._user = user;
                this._userSubject.next(this._user);
            },
            () => this.logout()
        );
    }

    // delete(id: string): any {
    //     return this.http.delete(`${environment.apiUrl}/api/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id === this.userValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/users/current`);
    }

    public isAuthenticated(): Observable<boolean> {
        return combineLatest([
          of(this.isLogged()),
          this.currentUser$.pipe(map((u: User) => u !== undefined ))
        ])
          .pipe(map((result: [boolean, boolean]) => result[0] && result[1]));
      }

    public isAdmin(): Observable<boolean> {
        return combineLatest([
          of(this.isLogged()),
          this.currentUser$.pipe(map((u: User) => u !== undefined && u.role !== undefined ))
        ])
          .pipe(map((result: [boolean, boolean]) => result[0] && result[1]));
      }

}
