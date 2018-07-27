import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  gallery: IPhoto[];
  popup: IPhoto =<IPhoto> {};
  currentIndex: number;

  constructor(private dataService: DataService) {
    console.log('Constructor ran');
   }

  ngOnInit() {
    this.dataService.getPhotos().subscribe((photos) => {
    this.gallery=photos.splice(0,10);
    });
  }

  searchArray(array, valuetofind) {
    let i: number;
    for(i=0;i<array.length;i++) {
        if(array[i].id == valuetofind) {
            return i;
        }
    }
    return -1;
  }

  createImage(titleInput,urlInput){
   if (titleInput && urlInput){
    let newImage: IPhoto = <IPhoto>{} ;
    newImage.title=titleInput;
    newImage.url=urlInput;
    newImage.albumId=1;
    newImage.id=this.gallery.length+1;
    newImage.thumbnailUrl=urlInput;
    
    this.gallery.unshift(newImage);
   }
   
   let a=document.getElementsByTagName('input');
   for(let b=0;b<a.length;b++){
     a[b].value ="";
   }
   return false;
  }

  showSingleView(image,index){
    this.popup=image;    
    this.currentIndex = this.searchArray(this.gallery,index);
  }
  deleteImage(){
    function confirmed(){
      return window.confirm('Do you want to delete this photo from Gallery?');
    }
    if(confirmed()){
      this.gallery.splice(this.currentIndex,1);
    }
    return;
  }

  editText(text){
    if (text){
      this.gallery[this.currentIndex].title = text;
    }  
  } 
 }

interface IPhoto{
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}