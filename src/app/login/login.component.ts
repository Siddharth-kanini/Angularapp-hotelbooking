import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router:Router) { }

  ngOnInit() {
    
  }

  login(firstName: string, lastName: string, contactInfo: string, password: string)
        
     {

      sessionStorage.setItem('firstName', firstName);
      return this.authService.login(firstName, lastName, contactInfo, password).
      subscribe(
        
        (Response)=>{
        alert("logged in");
        this.router.navigate(['/home']);

      },
        (error)=>{
          alert("error");}
      )
            
     }
  }

