import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoryComponent, ProductComponent, AddProductComponent],
  imports: [
    CommonModule//,FormsModule, Validators, FormControl,ReactiveFormsModule
  ]
})
export class ProductsModule { }
