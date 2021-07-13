import { category } from './../../shared/models/category.model';
import { GenericCRUDService } from './../../shared/services/generic-crud.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/shared/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
genericService:GenericCRUDService<category>;
objProduct:product;
  productForm: any;
  categories:category[];
  obj:string;
  constructor(private http:HttpClient,private toastr: ToastrService)
  {
    this.genericService=new GenericCRUDService<category>(this.http, 'Products');
    this.genericService.getAll('/GetCategories',this.categories);
  }

  ngOnInit()
  {
    this.productForm = new FormGroup
    ({
      name: new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.required, Validators.email]),
      salePrice: new FormControl('', [Validators.required]),
      unitPrice: new FormControl('',[Validators.required]),
      creationDate: new FormControl('',[Validators.required]),
      categoryId: new FormControl('',[Validators.required]),
    });
  }

  createProduct(formData)
  {
    this.genericService.createEntity(formData,'/Products').subscribe((creationStatus) => {
      this.toastr.success('Product has been created successfully.', 'Success !');
     }, (error) => {
       console.log(error);
     });;
  }

  get name(){
    return this.productForm.get('name') as FormControl;
 }
 get description(){
    return this.productForm.get('description') as FormControl;
 }
 get salePrice(){
    return this.productForm.get('salePrice') as FormControl;
 }
 get unitPrice(){
    return this.productForm.get('unitPrice') as FormControl;
 }
 get creationDate(){
    return this.productForm.get('creationDate') as FormControl;
 }
 get categoryId(){
    return this.productForm.get('categoryId') as FormControl;
 }
}
