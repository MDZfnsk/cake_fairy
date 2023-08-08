import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'users-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {

  
  endSubs$: Subject<any> = new Subject();
  user: User = null;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit(): void {
    this._getLoggedUserData();
  }

  private _getLoggedUserData() {
    this.usersService
      .observeCurrentUSer()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  updateUser(userId) {
    this.router.navigateByUrl(`user/form/${userId}`);
  }

  deleteUser(userId) {
    this.confirmationService.confirm({
      message: 'Do you want ot delete this User ?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService
          .deleteUser(userId)
          .pipe(takeUntil(this.endSubs$))
          .subscribe(
            (response) => {
              if (response) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'User Deleted Successfully..',
                });
                this.localStorageService.removeToken();
                timer(1500)
                  .toPromise()
                  .then(() => {
                    this.router.navigateByUrl(``);
                  });
              }
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'User NOT Deleted !!!',
              });
            }
          );
      },
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(2);
  }
}
