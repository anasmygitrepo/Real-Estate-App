import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Property } from 'src/app/Models/Property';
import { HousingService } from 'src/app/services/housing.service';
import { AlertyfyService } from 'src/app/services/Alertyfy.service';
import { PhotoDto } from 'src/app/Models/photoDto';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-photoupoder',
  templateUrl: './photoupoder.component.html',
  styleUrls: ['./photoupoder.component.css'],
})
export class PhotoupoderComponent implements OnInit {
  @Input() Property: Property;
  @Output() ChangePrimaryPhotoEvent = new EventEmitter<string>();

  uploader: FileUploader;
  BaseUrl = environment.BaseUrl;
  AllowedFileSize = 10 * 1024 * 1024;

  constructor(
    private http: HttpClient,
    private service: HousingService,
    private AlertyfyService: AlertyfyService
  ) {}

  ngOnInit() {
    this.InitializeFileUploader();
  }

  InitializeFileUploader() {
    this.uploader = new FileUploader({
      url: this.BaseUrl + '/Property/add/photo/' + this.Property.id,
      authToken: 'Bearer ' + localStorage.getItem('Token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: this.AllowedFileSize,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.Property.photos.push(photo);
      }
    };
  }

  SetPrimary(Photo: PhotoDto) {
    this.service
      .SetPrimaryPhoto(this.Property.id, Photo.publicId)
      .subscribe(() => {
        this.ChangePrimaryPhotoEvent.emit(Photo.imageUrl);
        this.Property.photos.forEach((P) => {
          if (P.isPrimary) {
            P.isPrimary = false;
          }
          if (P.publicId == Photo.publicId) {
            P.isPrimary = true;
          }
        });
      });
  }
  DeletePhoto(Photo: PhotoDto) {
    this.service.DeletePhoto(this.Property.id, Photo.publicId).subscribe(() => {
      this.Property.photos = this.Property.photos.filter((x) => {
        x.publicId !== Photo.publicId;
      });
    });
  }

  // UploadPhoto(event: any) {
  //   const file: File = event.target.files[0];
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);
  //   this.service.UploadImage(this.Property.id, formData).subscribe(() => {});
  // }
}
