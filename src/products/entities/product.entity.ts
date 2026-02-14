import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum ProductStatus {
  ACTIVE = 'active',
  DISCONTINUED = 'discontinued',
  OUT_OF_STOCK = 'out_of_stock',
}

export enum ProductUnit {
  PIECE = 'piece',
  BOX = 'box',
  KILOGRAM = 'kg',
  GRAM = 'g',
  LITER = 'l',
  METER = 'm',
  SQUARE_METER = 'sqm',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  sku: string; // Stock Keeping Unit

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  barcode: string;

  @Column({
    type: 'enum',
    enum: ProductUnit,
    default: ProductUnit.PIECE,
  })
  unit: ProductUnit;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  costPrice: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  sellingPrice: number;

  @Column({ default: 0 })
  reorderLevel: number; // Minimum stock before reorder

  @Column({ default: 0 })
  reorderQuantity: number; // How much to reorder

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  @Column({ nullable: true })
  categoryId: string;

  @Column({ nullable: true })
  supplierId: string;

  @Column('simple-array', { nullable: true })
  imageUrls: string[];

  @Column('jsonb', { nullable: true })
  specifications: Record<string, any>; // Custom specs like dimensions, weight, etc.

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
