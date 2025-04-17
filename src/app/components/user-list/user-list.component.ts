// src/app/components/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { UserService }       from '../../services/user.service';
import { User }              from '../../models/user';
import { encryptId }         from '../../utils/id-crypto';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router:      Router
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: list => this.users = list,
      error: err => alert('Error fetching users: ' + err.message)
    });
  }

  editUser(id: string) {
    // Navigate using the encrypted ID
    this.router.navigate(['/users/edit', encryptId(id)]);
  }

  deleteUser(id: string) {
    if (!confirm('Delete this user?')) return;
    this.userService.deleteUser(id).subscribe({
      next: () => this.users = this.users.filter(u => u.id !== id),
      error: err => alert('Delete failed: ' + err.message)
    });
  }
}
