import {Component, Input} from '@angular/core';
import {ImageService} from "./image.service";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Input() imgTitle! : string;
  selectedFile!: ImageSnippet;
  constructor(private imageService: ImageService) {
  }
  processFile(imageInput : any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log('Ajout image dans module')
      console.log(this.imgTitle)
      // this.imageService.uploadImage(this.selectedFile.src, this.imgTitle).subscribe();
    });

    reader.readAsDataURL(file);

  }

}
