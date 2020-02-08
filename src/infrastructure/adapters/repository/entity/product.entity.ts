import { Document } from 'mongoose';

export interface ProductEntity extends Document {
  name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly price: number;
  readonly createAt: string;
}
