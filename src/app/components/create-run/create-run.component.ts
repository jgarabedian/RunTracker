import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-run',
  templateUrl: './create-run.component.html',
  styleUrls: ['./create-run.component.css']
})
export class CreateRunComponent implements OnInit {

  submitted = false;
  runForm: FormGroup;
  Distance:any = ['Short', 'Medium', 'Long']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
   }

  ngOnInit(): void {
  }

  mainForm() {
    this.runForm = this.fb.group({
      date: ['', [Validators.required]],
      miles: ['', [Validators.required, , Validators.min(1)]],
      distance: ['Short', [Validators.required]],
      // time: ['', [Validators.required]]
    })
  }

  goBack() {
    let user = this.actRoute.snapshot.paramMap.get('id')
    this.ngZone.run(() => this.router.navigateByUrl(`user-details/${user}`))
  }

  updateDistance(e) {
    this.runForm.get('distance').setValue(e, {
      onlySelf: false
    })
  }

  get myRunForm() {
    return this.runForm.controls;
  }

  get distance() {
    return this.runForm.get('distance')
  }

  onSubmit() {
    this.submitted = true;
    if (!this.runForm.valid) {
      return false;
    } else {
      let id = this.actRoute.snapshot.paramMap.get('id');
      if (!id) {
        console.warn('We dont know the user')
        return false;
      }
      this.runForm.value['user_id'] = id;
      this.apiService.createRun(this.runForm.value).subscribe(
        (res) => {
          console.log('Added a run!')
          this.ngZone.run(() => this.router.navigateByUrl(`/user-details/${this.runForm.value['user_id']}`))
        }, (error) => {
          console.log(error)
        }
      )
    }
  }

}
