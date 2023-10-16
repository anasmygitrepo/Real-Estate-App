import { Component, Input, OnInit } from '@angular/core';
import { IpropertyBase } from 'src/app/Models/IpropertyBase';

@Component({
  selector: 'app-property-card',
  templateUrl: `property-card-component.html`,
  styleUrls: [`property-card-component.css`],
})
export class propertyCardComponent implements OnInit {
  @Input() property: IpropertyBase;
  @Input() HideIcons: boolean;
  public MainPhotoUrl: string = null;
  ngOnInit(): void {
    for (let photo of this.property.photos) {
      if (photo.isPrimary) {
        this.MainPhotoUrl = photo.imageUrl;
      }
    }
  }
}
