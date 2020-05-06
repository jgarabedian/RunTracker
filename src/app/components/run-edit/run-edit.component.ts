import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Run } from '../../model/run'

@Component({
  selector: 'app-run-edit',
  templateUrl: './run-edit.component.html',
  styleUrls: ['./run-edit.component.css']
})
export class RunEditComponent implements OnInit {

  submitted = false;
  Run = {};
  User = ''
  editForm: FormGroup;

  // TimeOfDay:any = ['Morning', 'Afternoon', 'Evening']
  Distance:any = ['Short', 'Medium', 'Long']
  
  runData: Run[];

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.User = this.actRoute.snapshot.paramMap.get('user')
    this.getRun(id);
    this.editForm = this.fb.group({
      date: ['', [Validators.required]],
      miles: ['', [Validators.required, , Validators.min(1)]],
      distance: ['', [Validators.required]],
      // time: ['', [Validators.required]]
    })

  }

  getRun(id) {
    this.apiService.getRun(id).subscribe((data) => {
      this.Run = data;
      this.editForm = this.fb.group({
        date: data['date'],
        miles: data['miles'],
        distance: data['distance'],
        // time: data['time_of_day']
      })
    })
  }

  updateDistance(e) {
    this.editForm.get('distance').setValue(e, {
      onlySelf: false
    })
  }

  get editRunForm() {
    return this.editForm.controls;
  }

  goBack() {
    this.ngZone.run(() => this.router.navigateByUrl(`user-details/${this.User}`))
  }

  onSubmit() {
    this.submitted = true;
    if(!this.editForm.valid) {
      console.warn('Form is not valid');
      return false
    } else if (this.editForm.controls.miles.value <= 0) {
      // this.editRunForm.miles.errors = 'Less than 0'
      return false;
    } else {
      let id = this.actRoute.snapshot.paramMap.get('id');
      let user = this.actRoute.snapshot.paramMap.get('user')
      this.apiService.updateRun(id, this.editForm.value).subscribe((res) => {
        console.log('Updated Run');
        this.ngZone.run(() => this.router.navigateByUrl(`user-details/${user}`))
      }, (error) => {
        console.warn(error)
      })
    }
    
  }
}
