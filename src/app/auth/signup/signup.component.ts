import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';

import { AuthService } from "../auth.service";
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false
  private authStatusSub: Subscription

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(
        authStatus => {
          this.isLoading = authStatus
        }
      )
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return
    }

    this.isLoading = true

    this.authService.createUser(
      form.value.email,
      form.value.password
    )
  }
}
