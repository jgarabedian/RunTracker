import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { User } from '../../model/user';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { CreateRunComponent } from '../create-run/create-run.component';

import { faEdit, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { STATES } from '../../../constants/constants';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  edit = false;
  addRunForm = false;
  success = false;
  submitted = false;
  editForm: FormGroup;
  User:any = {};
  userData: User[];
  State:any = STATES;
  user:any = ''

  // Icons
  faEdit = faEdit;
  faTimes = faTimes;
  faPlus = faPlus;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.user = this.actRoute.snapshot.paramMap.get('id');
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

  addRun() {
    this.ngZone.run(() => this.router.navigateByUrl(`create-run`))
  }

  updateEdit() {
      this.edit = !this.edit;
      if(this.edit) {
        this.addRunForm = false;
      }
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
  @ViewChild('alert', { static: true }) alert: ElementRef;
  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }
  onSubmit() {
    this.submitted = true;
    if(!this.editForm.valid) {
      return false;
    } else {
      if(window.confirm('Confirm Changes.')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateUser(id, this.editForm.value).subscribe((res) => {
          // this.router.navigateByUrl('/users-list');
          this.success = true;
          this.edit = false;
          this.alert.nativeElement.classList.add('show');
          console.log('Updated User')
        }, (error) => {
          console.log(error)
        })
      }
    }
  }
}
