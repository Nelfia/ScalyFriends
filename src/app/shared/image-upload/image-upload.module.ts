import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {ImageService} from "./image.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ImageService
  ],
  exports: [
    ImageUploadComponent
  ],
  declarations: [
    ImageUploadComponent
  ]
})
export class ImageUploadModule {}
