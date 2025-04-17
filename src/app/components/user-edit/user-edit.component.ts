// src/app/components/user-edit/user-edit.component.ts
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService }            from '../../services/user.service';
import { decryptId }              from '../../utils/id-crypto';
import { User }                   from '../../models/user';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userId!: string;
  username = '';
  password = '';   // will hold the password string from the backend

  constructor(
    private route:       ActivatedRoute,
    private userService: UserService,
    private router:      Router
  ) {}

  ngOnInit(): void {
    // 1. Read the encrypted ID from the URL
    const enc = this.route.snapshot.paramMap.get('id')!;
    // 2. Decrypt to get the real string ID
    this.userId = decryptId(enc);

    // 3. Fetch the user (expects { id, username, password })
    this.userService.getUserById(this.userId).subscribe({
      next: (u: User) => {
        this.username = u.username;
        this.password = u.password;          // populate the password field
      },
      error: () => {
        alert('User not found');
        this.router.navigate(['/users']);
      }
    });
  }

  updateUser(): void {
    if (!this.username || !this.password) {
      return alert('Both fields are required');
    }

    // 4. Send the decrypted ID + updated data
    this.userService
      .updateUser(this.userId, {
        username: this.username,
        password: this.password
      })
      .subscribe({
        next: () => this.router.navigate(['/users']),
        error: err => alert('Update failed: ' + err.message)
      });
  }
}
