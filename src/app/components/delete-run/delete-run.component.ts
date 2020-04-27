import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Run } from '../../model/run';

@Component({
  selector: 'app-delete-run',
  templateUrl: './delete-run.component.html',
  styleUrls: ['./delete-run.component.css']
})
export class DeleteRunComponent implements OnInit {

  Run:any = {};
  runData: Run[];
  id = this.actRoute.snapshot.paramMap.get('id')

  constructor(
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getRunDetails(id)
  }

  getRunDetails(id) {
    this.apiService.getRun(id).subscribe((data) => {
      this.Run = data;
    })
  }

  deleteRun() {
    this.apiService.deleteRun(this.Run._id).subscribe((data) => {
      console.log('Run has been deleted')
      this._location.back();
    })
    
  }

  cancel() {
    this._location.back();
  }

}
