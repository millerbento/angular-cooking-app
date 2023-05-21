import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs';
import { firebaseApiKey } from './firebaseApiKey';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firebaseApiKey = firebaseApiKey;
  private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseApiKey}`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${this.firebaseApiKey}`;

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorRes => {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return new Observable<AuthResponseData>(observer => {
              observer.error(errorMessage);
            });
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
        }
        return new Observable<AuthResponseData>(observer => {
          observer.error(errorMessage);
        });
    }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    // Generate a custom token using Firebase Admin SDK or another method

    // Once you have the custom token, you can make the signInWithCustomToken request
    // Replace 'CUSTOM_TOKEN' with the actual custom token you've generated
    return this.http.post<AuthResponseData>(this.signInUrl, {
      token: 'CUSTOM_TOKEN',
      returnSecureToken: true
    });
  }
}