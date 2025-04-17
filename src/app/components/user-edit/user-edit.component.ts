import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService }            from '../../services/user.service';
import { User }                   from '../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  standalone: false,
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userId!: number;
  username = '';
  password = '';

  constructor(
    private route:       ActivatedRoute,
    private userService: UserService,
    private router:      Router
  ) {}

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    const usr = this.userService.getUserById(this.userId);
    if (!usr) {
      alert('User not found');
      this.router.navigate(['/users']);
      return;
    }
    this.username = usr.username;
    this.password = usr.password;
  }

  updateUser() {
    if (!this.username || !this.password) {
      return alert('Both fields are required');
    }
    this.userService.updateUser(this.userId, this.username, this.password);
    this.router.navigate(['/users']);
  }
}
