import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') AddPropertyForm: NgForm;
  constructor(private router: Router) {}

  ngOnInit() {}

  submitForm(Form: NgForm) {
    // console.log(Form.form);
    console.log(this.AddPropertyForm);
  }
}