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
import { IdTextDto } from 'src/app/Models/IdTextDto';

import { IpropertyBase } from 'src/app/Models/IpropertyBase';
import { HousingService } from 'src/app/services/housing.service';
import { AlertyfyService } from 'src/app/services/Alertyfy.service';
import { CountyDto } from 'src/app/Models/CountryDto';
import { CityDto } from 'src/app/Models/CityDto';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('FormTabs') formTabs: TabsetComponent;
  @ViewChild('Form') AddPropertyForm: NgForm;
  myControl = new FormControl('');

  AddProperty_ReactiveForm: FormGroup;
  NextButtonclicked: boolean;

  Citys: CityDto[];

  property = new Property();

  PropertyType: any[];
  FurnishinType: any[];

  PropertyView: IpropertyBase = {
    id: null,
    name: '',
    furnishingType: '',
    city: '',
    propertyType: '',
    bhk: null,
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
    if (!localStorage.getItem('Token')) {
      alert('you need to login for add a property');
      this.router.navigate(['/user/login']);
    }
    this.CreateAddPropertyForm();
    this.HousingService.GetCitys().subscribe((data) => {
      this.Citys = data;
    });
    this.HousingService.GetPropertyTypes().subscribe((data) => {
      this.PropertyType = data;
    });
    this.HousingService.GetPropertyFurnishTypes().subscribe((data) => {
      this.FurnishinType = data;
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
        Maintance: [0],
      }),
      AddressInfo: this.FB.group({
        FlorNo: [null],
        TotalFloor: [null],
        Address: [null],
        Address2: [null],
        LandMark: [null],
      }),
      OtherInfo: this.FB.group({
        RTM: [null],
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
    this.property.bhk = +this.GetBHK.value;
    this.property.furnishingTypeId = this.GetPType.value;
    this.property.propertyTypeId = this.GetFType.value;
    this.property.name = this.GetName.value;
    this.property.CityId = +this.GetCity.value;
    this.property.price = +this.GetPrice.value;
    this.property.sequrity = +this.GetSequrity.value;
    this.property.maintenance = +this.GetMaintance.value;
    this.property.builtAria = +this.GetBuiltAria.value;
    this.property.carpetAria = +this.GetCarpetArea.value;
    this.property.floorNo = +this.GetFlorNo.value;
    this.property.totalFloors = +this.GetTotalFloor.value;
    this.property.address = this.GetAddress.value;
    this.property.LandMark = this.GetLandMark.value;
    this.property.address2 = this.GetAddress2.value;
    this.property.readyToMove = this.PropertyView.readyToMove;
    this.property.mainEntrance = this.GetRTMDirection.value;

    this.property.gated = this.PropertyView.gated;
    this.property.maintenance = this.GetMaintance.value;
    this.property.estPossessionOn = this.GetPossionOn.value;
    this.property.description = this.GetDescription.value;
    this.property.postedBy = this.GetPostedBy.value;

    this.property.PostedOn = new Date().toString();
  }

  submitForm() {
    console.log(this.AddProperty_ReactiveForm);
    this.NextButtonclicked = true;
    if (this.ValidateAllTabs()) {
      this.mapProperty();
      this.HousingService.AddProperty(this.property).subscribe(() => {
        this.AlertyfyService.success('Property Added sucessfully');
      });
      if (this.GetSellRent.value === 2) {
        this.router.navigate(['/property-rent']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.AlertyfyService.error('property adding faild');
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
