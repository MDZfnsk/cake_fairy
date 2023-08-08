import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';

import { LocalstorageService } from '../../services/localstorage.service';

import { Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';


@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,    
    private router: Router,
    private localstorageService: LocalstorageService,
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
      
  }


  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



  onSubmit() {
    this.isSubmitted = true;

    if(this.loginFormGroup.invalid){
      return;
    }else {
      this.authService.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(user => {
        console.log(user);
        
        this.authError = false;        
        this.localstorageService.setToken(user.token);       
        // this.router.navigate(['/']);
        this.router.navigate(['/']).then(() => {
          // Wait for the navigation to complete
          this.router.events
            .pipe(
              filter(event => event instanceof NavigationEnd),
              take(1)
            )
            .subscribe(() => {
              // Refresh the window after navigation
              window.location.reload();
            });
        });      
              
        
      },(error: HttpErrorResponse) => {        
        this.authError = true;
        this.authMessage = error.error;      
        console.log(error);
      })
    }
  }



  get loginForm() {
    return this.loginFormGroup.controls;
  }



}
