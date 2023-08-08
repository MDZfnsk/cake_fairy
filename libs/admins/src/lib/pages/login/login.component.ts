import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../admin-auth.service';
import { AdminLocalstorageService } from '../../admin-localstorage.service';


@Component({
  selector: 'admins-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  

  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password is wrong !!!';

  constructor(
    private formBuilder: FormBuilder,
    private adminAuthService: AdminAuthService,    
    private adminLocalStorageService: AdminLocalstorageService,
    private router: Router
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
      this.adminAuthService.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(admin => {              
        this.authError = false;
        this.adminLocalStorageService.setToken(admin.token);                
        this.router.navigate(['/']);   
            

      },(error: HttpErrorResponse) => {        
        this.authError = true;
        if(error.status !== 400){
          this.authMessage = "Invalid Credentials";
        }
        console.log(error);
      })

    }
  }



  get loginForm() {
    return this.loginFormGroup.controls;
  }




}
