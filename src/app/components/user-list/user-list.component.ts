import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  User:any = [];

  constructor(private apiService: ApiService) {
    this.readUser()
   }

  ngOnInit(): void {
  }

  readUser() {
    this.apiService.getUsers().subscribe((data) => {
      this.User = data;
    });
  }

  deleteUser(user, idx) {
    if(window.confirm('Please Confirm: Action is Permanent.')) {
      this.apiService.deleteUser(user._id).subscribe((data) => {
        this.User.splice(idx, 1)
      })
    }
  }


}
