import { category } from './category.model';
export class product
{
  productId: number=0;
  name: string="";
  description: string="";
  categoryId: number=0;
  salePrice: DoubleRange;
  unitPrice: DoubleRange;
  createdOn: Date=new Date();
  categories: category;
}
