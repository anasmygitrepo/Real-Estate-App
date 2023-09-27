import { Component, Input } from '@angular/core';
import { IpropertyBase } from 'src/app/Models/IpropertyBase';

@Component({
  selector: 'app-property-card',
  templateUrl: `property-card-component.html`,
  styleUrls: [`property-card-component.css`],
})
export class propertyCardComponent {
  @Input() property: IpropertyBase;
  @Input() HideIcons: boolean;
}
