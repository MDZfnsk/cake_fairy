import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { UiModule } from '@cakefairy/ui';


import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SignUpComponent } from './pages/sign-up/sign-up.component';



const UX_MODULE = [
  ButtonModule,
  InputTextModule,
  ToastModule,
  CardModule,
  ToolbarModule,
  FieldsetModule,
  InputMaskModule,
  InputSwitchModule,
  BadgeModule,
  ConfirmDialogModule
  
];


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    UX_MODULE,   
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    UiModule
  ],
  declarations: [
    LoginComponent, 
    UserProfileComponent, 
    UserFormComponent, SignUpComponent],
  exports: [
    LoginComponent, 
    UserProfileComponent, 
    UserFormComponent, SignUpComponent],
  providers: [
    MessageService, 
    ConfirmationService, 
    UsersFacade],
})
export class UsersModule {}
