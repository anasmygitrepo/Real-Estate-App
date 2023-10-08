import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Property } from 'src/app/Models/Property';
import { IpropertyBase } from 'src/app/Models/IpropertyBase';
import { HousingService } from 'src/app/services/housing.service';
import { AlertyfyService } from 'src/app/services/Alertyfy.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('FormTabs') formTabs: TabsetComponent;
  @ViewChild('Form') AddPropertyForm: NgForm;

  AddProperty_ReactiveForm: FormGroup;
  NextButtonclicked: boolean;

  Citys: any[];

  property = new Property();

  PropertyType: Array<string> = ['House', 'Apartment', 'Duplex'];
  FurnishinType: Array<string> = ['Fully', 'Semi', 'Unfurinshed'];

  PropertyView: IpropertyBase = {
    id: null,
    name: '',
    furnishingType: '',
    city: '',
    propertyType: '',
    bhk: '',
    sellRent: null,
    price: null,
    builtAria: null,
    country: '',
    readyToMove: null,
  };
  constructor(
    private AlertyfyService: AlertyfyService,
    private router: Router,
    private FB: FormBuilder,
    private HousingService: HousingService
  ) {}

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.HousingService.GetCitys().subscribe((data) => {
      this.Citys = data;
      console.log(this.Citys);
    });
  }

  CreateAddPropertyForm() {
    this.AddProperty_ReactiveForm = this.FB.group({
      BasicInfo: this.FB.group({
        SellRent: ['1', Validators.required],
        Bhk: [null, Validators.required],
        Ftype: [null, Validators.required],
        Ptype: [null, Validators.required],
        Name: [null, [Validators.required, Validators.minLength(5)]],
        City: [null, [Validators.required]],
      }),
      PriceInfo: this.FB.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null, Validators.required],
        Sequrity: [null],
        Maintance: [null],
      }),
      AddressInfo: this.FB.group({
        FlorNo: [null],
        TotalFloor: [null],
        Address: [null],
        Address2: [null],
        LandMark: [null],
      }),
      OtherInfo: this.FB.group({
        RTM: [null, Validators.required],
        RTMDirection: [null],
        PossionOn: [null],
        AOP: [null],
        Gated: [null],
        Description: [null],
        PostedOn: [null],
        PostedBy: [null],
      }),
    });
  }

  //#region // accessingGrups...............................................................

  get BasicInfo() {
    return this.AddProperty_ReactiveForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
    return this.AddProperty_ReactiveForm.controls['PriceInfo'] as FormGroup;
  }
  get AddressInfo() {
    return this.AddProperty_ReactiveForm.controls['AddressInfo'] as FormGroup;
  }
  get OtherInfo() {
    return this.AddProperty_ReactiveForm.controls['OtherInfo'] as FormGroup;
  }

  // accessincontrol...from....groups........................................................

  // BasicInfoGroup.....controlls....................................
  get GetName() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }
  get GetCity() {
    return this.BasicInfo.controls['City'] as FormControl;
  }
  get GetSellRent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }
  get GetPType() {
    return this.BasicInfo.controls['Ptype'] as FormControl;
  }
  get GetFType() {
    return this.BasicInfo.controls['Ftype'] as FormControl;
  }
  get GetBHK() {
    return this.BasicInfo.controls['Bhk'] as FormControl;
  }
  get GetSellrent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  //PriceInfo..group..controlls................................................................
  get GetPrice() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }
  get GetBuiltAria() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }
  get GetCarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }
  get GetSequrity() {
    return this.PriceInfo.controls['Sequrity'] as FormControl;
  }
  get GetMaintance() {
    return this.PriceInfo.controls['Maintance'] as FormControl;
  }
  //AddressInfo..group..controlls.........................................................

  get GetFlorNo() {
    return this.AddressInfo.controls['FlorNo'] as FormControl;
  }
  get GetTotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }
  get GetAddress() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }
  get GetAddress2() {
    return this.AddressInfo.controls['Address2'] as FormControl;
  }
  get GetLandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }
  //OtherInfo..Group..controls...............................................................
  get GetPossionOn() {
    return this.OtherInfo.controls['PossionOn'] as FormControl;
  }
  get GetAOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }
  get GetGated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }
  get GetRTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }
  get GetRTMDirection() {
    return this.OtherInfo.controls['RTMDirection'] as FormControl;
  }

  get GetPostedBy() {
    return this.OtherInfo.controls['PostedBy'] as FormControl;
  }
  get GetDescription() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }

  mapProperty(): void {
    this.property.id = this.HousingService.PropIdGeneratore();
    this.property.sellRent = +this.GetSellRent.value;
    this.property.bhk = this.GetBHK.value;
    this.property.furnishingType = this.GetPType.value;
    this.property.propertyType = this.GetFType.value;
    this.property.name = this.GetName.value;
    this.property.city = this.GetCity.value;
    this.property.price = this.GetPrice.value;
    this.property.Sequirity = this.GetSequrity.value;
    this.property.Maintenance = this.GetMaintance.value;
    this.property.builtAria = this.GetBuiltAria.value;
    this.property.CarpetAria = this.GetCarpetArea.value;
    this.property.FlorNo = this.GetFlorNo.value;
    this.property.TotalFloor = this.GetTotalFloor.value;
    this.property.Address = this.GetAddress.value;
    this.property.LandMark = this.GetLandMark.value;
    this.property.Address2 = this.GetAddress2.value;
    this.property.readyToMove = this.GetRTM.value;
    this.property.RTMDirection = this.GetRTMDirection.value;
    this.property.AOP = this.GetAOP.value;
    this.property.Gated = this.GetGated.value;
    this.property.Maintenance = this.GetMaintance.value;
    this.property.PossionOn = this.GetPossionOn.value;
    this.property.Description = this.GetDescription.value;
    this.property.postedBy = this.GetPostedBy.value;

    this.property.PostedOn = new Date().toString();
  }

  submitForm() {
    this.mapProperty();
    this.NextButtonclicked = true;
    if (this.ValidateAllTabs()) {
      this.HousingService.AddProperty(this.property);
      this.AlertyfyService.success('Property Added sucessfully');
    } else {
      this.AlertyfyService.error(
        'please riew the form and provide allvalid entries'
      );
    }
    if (this.GetSellRent.value == 2) {
      this.router.navigate(['/property-rent']);
    } else {
      this.router.navigate(['/']);
    }
    console.log(this.property);
  }

  ValidateAllTabs(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  selectTab(tabId: number, CurrentTabValid: boolean) {
    this.NextButtonclicked = true;
    if (CurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
  BackTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }
}
