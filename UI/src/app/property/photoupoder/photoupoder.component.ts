import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/app/Models/Property';

@Component({
  selector: 'app-photoupoder',
  templateUrl: './photoupoder.component.html',
  styleUrls: ['./photoupoder.component.css'],
})
export class PhotoupoderComponent implements OnInit {
  @Input() Property: Property;

  constructor() {}

  ngOnInit() {}
}
