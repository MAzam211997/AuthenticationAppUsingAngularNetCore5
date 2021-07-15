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
  categories:any[]=new Array();
  products:product[];
  obj:string;
  constructor(private http:HttpClient,private toastr: ToastrService)
  {
    this.genericService=new GenericCRUDService<category>(this.http, 'Products');
     this.genericService.fetchEntities('/GetCategories').subscribe((data) => {
      this.categories=data;
     }, (error) => {
       console.log(error);
     });
     this.getAllProducts();
  }

  ngOnInit()
  {
    this.productForm = new FormGroup
    ({
      name: new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.required]),
      salePrice: new FormControl('', [Validators.required]),
      unitPrice: new FormControl('',[Validators.required]),
      creationDate: new FormControl('',[Validators.required]),
      categoryId: new FormControl('',[Validators.required]),
    });
  }

  getAllProducts()
  {
    this.genericService=new GenericCRUDService<product>(this.http, 'Products');
     this.genericService.fetchEntities('/GetProducts').subscribe((data) => {
      this.products=data as product[];
     }, (error) => {
       console.log(error);
     });
  }
  createProduct(product:product)
  {
    debugger
    this.genericService.createEntity(product,'').subscribe((creationStatus) => {
      this.getAllProducts();
      this.toastr.success('Product has been created successfully.', 'Success !');
     }, (error) => {
       alert(error);
     });;
  }

  get name(){
    return this.productForm.get('name') as FormControl;
 }
 get categoryId(){
  return this.productForm.get('categoryId') as FormControl;
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
//  get categoryId(){
//     return this.productForm.get('categoryId') as FormControl;
//  }
}
