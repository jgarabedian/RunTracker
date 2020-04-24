import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { User } from '../../model/user';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { STATES } from '../../../constants/constants';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  edit = false;
  submitted = false;
  editForm: FormGroup;
  User:any = {};
  userData: User[];
  State:any = STATES;

  // Icons
  faEdit = faEdit;
  faTimes = faTimes;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getUser(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(16)]]
    })
  }

  // choose state from dropdown
  updateState(e) {
    this.editForm.get('state').setValue(e, {
      onlySelf: true
    });
  }

  updateEdit() {
      this.edit = !this.edit
  }

  get myForm() {
    return this.editForm.controls;
  }

  getUser(id) {
    this.apiService.getUser(id).subscribe((data) => {
      this.User = data;
      this.editForm.setValue({
        name: data['name'],
        email: data['email'],
        city: data['city'],
        state: data['state'],
        age: data['age']
      })
    })
  }

  updateUser() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(16)]]
    })
  }
  onSubmit() {
    this.submitted = true;
    if(!this.editForm.valid) {
      return false;
    } else {
      if(window.confirm('Confirm Changes.')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateUser(id, this.editForm.value).subscribe((res) => {
          this.router.navigateByUrl('/users-list');
          console.log('Updated Employees')
        }, (error) => {
          console.log(error)
        })
      }
    }
  }
}
