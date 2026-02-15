import { 
  IsString, 
  IsOptional, 
  IsEnum, 
  IsNumber, 
  Min, 
  IsArray,
  IsObject,
  MaxLength,
} from 'class-validator';
import { ProductUnit, ProductStatus } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @MaxLength(50)
  sku: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsEnum(ProductUnit)
  unit: ProductUnit;

  @IsNumber()
  @Min(0)
  costPrice: number;

  @IsNumber()
  @Min(0)
  sellingPrice: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  reorderLevel?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  reorderQuantity?: number;

  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  supplierId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrls?: string[];

  @IsObject()
  @IsOptional()
  specifications?: Record<string, any>;
}