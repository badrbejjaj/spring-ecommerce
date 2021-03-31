import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute(): any {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate(): any {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) { return error('Username or password is incorrect'); }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            });
        }

        function register(): any {
            const user = body;

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken');
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers(): any {
            if (!isLoggedIn()) { return unauthorized(); }
            return ok(users);
        }

        function getUserById(): any {
            if (!isLoggedIn()) { return unauthorized(); }

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function updateUser(): any {
            if (!isLoggedIn()) { return unauthorized(); }

            const params = body;
            const user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function deleteUser(): any {
            if (!isLoggedIn()) { return unauthorized(); }

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?): Observable<HttpResponse<any>> {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message): any {
            return throwError({ error: { message } });
        }

        function unauthorized(): any {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn(): any {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl(): any {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1], 2);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};