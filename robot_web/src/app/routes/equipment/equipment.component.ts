import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  currentType: string = 'avg';
  guidRouter: string = 'avg';
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      let type = this.activatedRoute.snapshot.params['type'];
      this.currentType = type;
    });
  }

  ngOnInit() {
  }

  routerTo() {
    this.router.navigate([`equipment/${this.currentType}`]);
  }

}
