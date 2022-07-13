import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-prescription-upload',
  templateUrl: './prescription-upload.component.html',
  styleUrls: ['./prescription-upload.component.css']
})
export class PrescriptionUploadComponent {
  title: string;
  prescription: File;
  // picture
  picture: string

  constructor(private http: HttpClient) {}

  onTitleChanged(event: any) {
    this.title = event.target.value;
  }

  onImageChanged(event: any) {
    this.prescription = event.target.files[0];
  }

  newPrescription() {
    console.log('click');
    
    const uploadData = new FormData();
    uploadData.append('picture' , this.picture)
    uploadData.append('buyer', this.title);
    uploadData.append('medicine', this.prescription, this.prescription.name);
    this.http.post('https://medistore-apis.herokuapp.com/api/prescription/', uploadData).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}
