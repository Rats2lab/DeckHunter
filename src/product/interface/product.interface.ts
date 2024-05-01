import { Author } from '../../author/interface/author.interface';

export interface Product {
  id: string;
  author: Author;
  title: string;
  description: string;
  launchDate: Date;
  votes: number;
  country: string;
}
