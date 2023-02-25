import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageService} from "./image.service";
import {tap} from "rxjs";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Output() newImageEvent = new EventEmitter<string>();

  selectedFile!: ImageSnippet;
  constructor(private imageService: ImageService) {
  }
  processFile(imageInput : any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log('Ajout image dans module')
      this.newImageEvent.emit(this.selectedFile.src);
      // this.imageService.uploadImage(this.selectedFile.src).pipe(
      //   tap(
      //     (imgName => {
      //       this.newImageEvent.emit(imgName);
      //       console.log(imgName);
      //     })
      //   )
      // ).subscribe();
    });
    reader.readAsDataURL(file);
  }

}
