import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit {
  currentType: string = 'avg';
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      let type = this.activatedRoute.snapshot.params['type'];
      this.currentType = type;
    });
  }

  ngOnInit() {
  }

  routerTo() {
    this.router.navigate([`backend/${this.currentType}`]);
  }

}
