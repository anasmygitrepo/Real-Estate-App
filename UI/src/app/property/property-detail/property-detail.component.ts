import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  public PropertyId: number;
  constructor(private activeroute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.PropertyId = +this.activeroute.snapshot.params['Id'];
    this.activeroute.params.subscribe((param) => {
      this.PropertyId = +param['Id'];
    });
  }

  IncrimentPropertyId() {
    this.PropertyId++;
  }
}
