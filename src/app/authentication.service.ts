import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   
 
  constructor(private http: HttpClient) { }
  login(firstName: string, lastName: string, contactInfo: string, password: string) {
    const signInData = { firstName, lastName,contactInfo,password };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'  // Treat the response as plain text
    };

    return this.http.post<string>(`https://localhost:7194/api/Authorize
    `, signInData, httpOptions)
      .pipe(
        tap(jwtToken => {
          localStorage.setItem('jwtToken', jwtToken);
        })
      );
  }

  Adminlogin(username: string, password: string) {
    const adminsignInData = { username,password };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'  
    };

    return this.http.post<string>(`https://localhost:7194/api/Authorize/Admin`, adminsignInData, httpOptions)
      .pipe(
        tap(jwtToken => {
          localStorage.setItem('adminjwtToken', jwtToken);
        })
      );
  }
  getToken()
  {
    return localStorage.getItem('jwtToken');
  }
// getLoggedInFirstName(): string {
//   const token = this.getToken();

//   if (token) {
//     const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//     return tokenPayload.firstName;
//   } else {
//     return '';
//   }
// }
}






