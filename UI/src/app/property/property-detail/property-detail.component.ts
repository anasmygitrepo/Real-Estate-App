import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/Models/Property';
import { HousingService } from 'src/app/services/housing.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  property = new Property();
  public PropertyId: number;
  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private service: HousingService
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

    this.galleryImages = [
      {
        small: 'assets/images/gallery/interior-3.jpg',
        medium: 'assets/images/gallery/interior-3.jpg',
        big: 'assets/images/gallery/interior-3.jpg',
      },
      {
        small: 'assets/images/gallery/interior-1.jpg',
        medium: 'assets/images/gallery/interior-1.jpg',
        big: 'assets/images/gallery/interior-1.jpg',
      },
      {
        small: 'assets/images/gallery/interior-2.jpg',
        medium: 'assets/images/gallery/interior-2.jpg',
        big: 'assets/images/gallery/interior-2.jpg',
      },
      {
        small: 'assets/images/gallery/interior-4.jpg',
        medium: 'assets/images/gallery/interior-4.jpg',
        big: 'assets/images/gallery/interior-4.jpg',
      },
      {
        small: 'assets/images/gallery/interior-5.jpg',
        medium: 'assets/images/gallery/interior-5.jpg',
        big: 'assets/images/gallery/interior-5.jpg',
      },
    ];

    //using resolver to get property-details

    this.PropertyId = this.activeroute.snapshot.params['Id'];
    this.activeroute.data.subscribe((data: Property) => {
      this.property = data['prp'];
    });

    // this.PropertyId = +this.activeroute.snapshot.params['Id'];
    // this.activeroute.params.subscribe((param) => {
    //   this.PropertyId = +param['Id'];
    //   console.log(this.PropertyId);
    // });
    // this.service.GetProperty(this.PropertyId).subscribe((Prop_data) => {
    //   this.property = Prop_data;
    // });
  }

  IncrimentPropertyId() {
    this.PropertyId++;
  }
}
