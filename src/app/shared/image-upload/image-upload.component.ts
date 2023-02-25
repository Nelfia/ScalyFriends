import {Component} from '@angular/core';
import {ImageService} from "./image.service";
import {take} from "rxjs";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  selectedFile!: ImageSnippet;
  constructor(private imageService: ImageService) {
  }
  processFile(imageInput : any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.uploadImage(this.selectedFile.src).subscribe();
      debugger;
    });

    reader.readAsDataURL(file);

  }

}
