import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/Models/Property';
import { HousingService } from 'src/app/services/housing.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { AlertyfyService } from 'src/app/services/Alertyfy.service';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public MainPhotoUrl: string = null;

  property = new Property();
  public PropertyId: number;
  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private service: HousingService,
    private AlertyfyService: AlertyfyService
  ) {}

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '460px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
    ];

    //using resolver to get property-details

    this.PropertyId = this.activeroute.snapshot.params['Id'];
    this.activeroute.data.subscribe((data: Property) => {
      this.property = data['prp'];
    });
    this.property.age = this.service.GetPropertyAge(
      this.property.estPossessionOn
    );

    this.galleryImages = this.GetPropertyImages();

    // this.PropertyId = +this.activeroute.snapshot.params['Id'];
    // this.activeroute.params.subscribe((param) => {
    //   this.PropertyId = +param['Id'];
    //   console.log(this.PropertyId);
    // });
    // this.service.GetProperty(this.PropertyId).subscribe((Prop_data) => {
    //   this.property = Prop_data;
    // });
  }

  GetPropertyImages(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];
    for (let photo of this.property.photos) {
      if (photo.isPrimary) {
        this.MainPhotoUrl = photo.imageUrl;
      } else {
        photoUrls.push({
          small: photo.imageUrl,
          medium: photo.imageUrl,
          big: photo.imageUrl,
        });
      }
    }
    return photoUrls;
  }

    SetprimaryPhoto(newItem: string) {
    this.MainPhotoUrl=newItem;
  }

  IncrimentPropertyId() {
    this.PropertyId++;
  }
}
