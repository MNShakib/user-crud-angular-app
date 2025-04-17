import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  standalone: false,
  // imports: [FormsModule],        // whatever you need
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
    this.userService.createUser(this.username, this.password);
    this.router.navigate(['/users']);
  }
}
