import { ChangeDetectorRef, Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: User[] = [];
  userId: number = 0;
  newUser: User = { username: '', email: '' };
  selectedUser: User | null = null;
  errorMessage: string = '';

  constructor(private userService: UserService, 
    private cdRef: ChangeDetectorRef
  ) {}

  // ✅ Get User by ID
  getUser() {
    this.errorMessage = '';
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => (this.selectedUser = data),
      error: () => (this.errorMessage = 'User not found!')
    });
  }

  // ✅ Get All Users
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: () => (this.errorMessage = 'Failed to fetch users!')
    });
  }

  // ✅ Create User
  createUser() {
    this.userService.createUser(this.newUser).subscribe({
      next: (data) => {
        this.users.push(data);
        this.newUser = { username: '', email: '' }; // Reset form
      },
      error: () => (this.errorMessage = 'Failed to create user!')
    });
  }

  // ✅ Update User
  updateUser() {
    if (!this.selectedUser) return;
    this.userService.updateUser(this.selectedUser).subscribe({
      next: () => {
        this.selectedUser = null;
        this.getAllUsers(); // Refresh list
      },
      error: () => (this.errorMessage = 'Failed to update user!')
    });
  }

  // ✅ Delete User
deleteUser(id: number | undefined) {
  if (id !== undefined && id !== null) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        // Handle successful deletion
        console.log('User successfully deleted');
        console.log(response.message); // For Option 2

        // Remove the user from the list immediately
        this.users = this.users.filter(user => user.id !== id);
        console.log('Users after deletion:', this.users);
      },
      error: (err) => {
        // Handle any errors that might occur
        console.error('Error deleting user', err);
      }
    });
  }
  console.log("out delete");
}

  
}
