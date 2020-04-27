import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.css']
})
export class RunListComponent implements OnInit {
  data: any = [];
  Runs:any = []
  user_id = '';

  constructor(
    private apiService: ApiService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let user_id = this.actRoute.snapshot.paramMap.get('id');
    this.user_id = user_id;
    this.getRuns(user_id);
  }

  getRuns(user_id) {
    this.apiService.getRuns().subscribe((data) => {
      this.data = data
      for (let i = 0; i < this.data.length; i++) {
        if(this.data[i].user_id === this.user_id) {
          this.Runs.push(data[i])
        }
      }
      console.log(data)
    })
  }

}
