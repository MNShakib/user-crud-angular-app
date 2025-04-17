// src/app/components/user-create/user-create.component.ts
import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  standalone  : false,
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  username = '';
  password = '';

  constructor(
    private userService: UserService,
    private router:      Router
  ) {}

  createUser() {
    if (!this.username || !this.password) {
      return alert('Both fields are required');
    }
    this.userService.createUser({ username: this.username, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/users']),
        error: err => alert('Create failed: ' + err.message)
      });
  }
}
