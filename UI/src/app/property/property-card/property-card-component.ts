import { Component, Input } from '@angular/core';
import { Iproperty } from '../property-list/Iproperty';

@Component({
  selector: 'app-property-card',
  templateUrl: `property-card-component.html`,
  styleUrls: [`property-card-component.css`],
})
export class propertyCardComponent {
  @Input() property: Iproperty;
}
